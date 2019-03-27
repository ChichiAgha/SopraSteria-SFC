// encapsulates all properties of a user, by returning a PropertyManager
const Manager = require('../properties/manager');

// individual properties
const employerTypeProperty = require('./properties/employerTypeProperty').EmployerTypeProperty;
const staffProperty = require('./properties/staffProperty').StaffProperty;
const otherServicesProperty = require("./properties/servicesProperty").ServicesProperty;
const capacityServicesProperty = require("./properties/capacityProperties").CapacityProperty;
const shareProperty = require("./properties/shareWithProperty").ShareWithProperty;
const shareWithLAProperty = require("./properties/shareWithLAProperty").ShareWithLAProperty;
const vacanciesProperty = require("./properties/vacanciesProperty").VacanciesProperty;
const startersProperty = require("./properties/startersProperty").StartersProperty;
const leaversProperty = require("./properties/leaversProperty").LeaversProperty;
const serviceUsersProperty = require("./properties/serviceUsersProperty").ServiceUsersProperty;

class EstablishmentPropertyManager {
    constructor() {
        this._thisManager = new Manager.PropertyManager();

        this._thisManager.registerProperty(employerTypeProperty);
        this._thisManager.registerProperty(staffProperty);
        this._thisManager.registerProperty(otherServicesProperty);
        this._thisManager.registerProperty(serviceUsersProperty);
        this._thisManager.registerProperty(capacityServicesProperty);
        this._thisManager.registerProperty(shareProperty);
        this._thisManager.registerProperty(shareWithLAProperty);
        this._thisManager.registerProperty(vacanciesProperty);
        this._thisManager.registerProperty(startersProperty);
        this._thisManager.registerProperty(leaversProperty);
    }

    get manager() {
        return this._thisManager;
    }
}

exports.EstablishmentPropertyManager = EstablishmentPropertyManager;
exports.SEQUELIZE_DOCUMENT = Manager.PropertyManager.SEQUELIZE_DOCUMENT;
exports.JSON_DOCUMENT = Manager.PropertyManager.JSON_DOCUMENT;