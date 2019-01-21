// the property manager holds a collection of Properties (PrototypeProperty instances)
//  as a result of passing a given Document

class PropertyManager {
    constructor() {
        this._properties = {};  // intentionally an object not array
        this._propertyTypes = [];

        
        // this is a collection of audit events
        //  that are accummulated during saving
        //  of all properties
        this._auditEvents = null;
    }

    static get JSON_DOCUMENT() { return 100; }
    static get SEQUELIZE_DOCUMENT() { return 200; }

    // adds the property with given name
    _addProperty(propertyName, property) {
        this._properties[propertyName] = property;
    }

    // returns the property value of given name
    get(propertyTypeName) {
        const thisProperty = this._properties[propertyTypeName];

        if (thisProperty)
            return thisProperty;
        else
            return null;
    }

    // returns the set of audit events - can be null or empty if no audit
    get auditEvents() {
        return this._auditEvents;
    }

    // returns true if all properties are valid, else returns the list
    //  of invalid properties
    get isValid() {
        let isValid = true;   // assume all properties are valid, unless otherwise told
        const invalidProperties = [];
        const allProperties = Object.keys(this._properties);
        allProperties.forEach(thisPropertyType => {
            const thisProperty = this._properties[thisPropertyType];
            if (!thisProperty.valid) {
                isValid = false;
                invalidProperties.push(thisPropertyType);
            }
        });

        if (!isValid) {
            return invalidProperties;
        } else {
            return true;
        }
    }

    // runs through all known (registered) property types
    //  restoring from given document type.
    async restore(document, documentType) {
        // first create any new properties as identified in the given source document
        //  if they don't already exist
        try {
            const initialPropertiesByName = Object.keys(this._properties);
            this._propertyTypes.forEach(async thisType => {
                if (!initialPropertiesByName.includes(thisType.name)) {
                    // clone a new instance of this property and add it to the set of all properties
                    this._addProperty(thisType.name, thisType.clone());
                }
            });


            // now for each of the now known properties, restore from the given document
            const propertyPromises = [];
            const allKnownPropertiesByName = Object.keys(this._properties);
            allKnownPropertiesByName.forEach(async thisPropertyName => {
                const thisProperty = this._properties[thisPropertyName];

                // restoring a property is an async activity
                switch (documentType) {
                    case PropertyManager.JSON_DOCUMENT:
                        propertyPromises.push(thisProperty.restoreFromJson(document));
                        break;

                    case PropertyManager.SEQUELIZE_DOCUMENT:
                        propertyPromises.push(thisProperty.restoreFromSequelize(document));
                        break;

                    default:
                        // do nothing - newProperty remains null
                }
            });

            await Promise.all(propertyPromises);
        } catch (err) {
            console.error("Property::Manager restore: ", err);
        }

    };

    // runs through all known properties, adding them to the given
    //  document to save (using sequelize), only if they have been modified.
    // Returns modified save document.
    save (username, document) {
        // resets all audit events; to build a new set from current properties
        this._auditEvents = [];

        const allProperties = Object.keys(this._properties);
        allProperties.forEach(thisPropertyType => {
            const thisProperty = this._properties[thisPropertyType];

            if (thisProperty.modified) {
                console.log("INFO - PropertyManager::save - property with property type: ", thisPropertyType)
                const { properties:saveProperties, audit: propertyAudit} = thisProperty.save(username);

                console.log("WA DEBUG: property state and events: ", saveProperties, propertyAudit)

                // unlike JSON with allows for rich sub-documents,
                //  sequelize maps onto relational tables which
                //  are flat. So rather than containing a sub-document,
                //  it is necessary to merge properties
                document = { ...document, ...saveProperties};

                // append the given set of property audit events
                this._auditEvents = this._auditEvents.concat(propertyAudit);
            }
        });

        return document;
    }

    // returns a JSON object representation of all known properties
    toJSON(withHistory=false) {
        let thisJsonObject = {};
        const allProperties = Object.keys(this._properties);

        allProperties.forEach(thisProperty => {
            thisJsonObject = {
                ...thisJsonObject,
                ...this._properties[thisProperty].toJSON(withHistory)
            }
        });

        return thisJsonObject;
    }

    // registers a given property type, by referencing
    //  it's "class not object" function only
    registerProperty(propertyType) {
        this._propertyTypes.push(propertyType);
    }

    // returns a list of all Properties by name
    get properties() {
        const myProperties = [];
        const allProperties = Object.keys(this._properties);

        allProperties.forEach(thisProperty => {
            myProperties.push(this._properties[thisProperty].name);
        });
        return myProperties;
    }

    // returns a list of all registered Properties by name
    get types() {
        const myProperties = [];
        this._propertyTypes.forEach(thisPropertyType => {
            myProperties.push(thisPropertyType.name);
        });
        return myProperties;
    }
};

module.exports.PropertyManager = PropertyManager;