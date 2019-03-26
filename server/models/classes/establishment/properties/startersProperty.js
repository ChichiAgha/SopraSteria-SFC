// the Starters property is an enum and reflextion table that holds the set of 'Starters' referenced against the reference set of jobs
const ChangePropertyPrototype = require('../../properties/changePrototype').ChangePropertyPrototype;

const JobHelpers = require('./jobHelper');

exports.StartersProperty = class StartersProperty extends ChangePropertyPrototype {
    constructor() {
        super('Starters');
    }

    static clone() {
        return new StartersProperty();
    }

    // concrete implementations
    async restoreFromJson(document) {
        if (document.jobs && document.jobs.starters) {
            const jobDeclaration = ["None", "Don't know"];
            // can be an empty array
            if (Array.isArray(document.jobs.starters)) {
                const validatedJobs = await JobHelpers.validateJobs(document.jobs.starters);

                if (validatedJobs) {
                    this.property = validatedJobs;

                } else {
                    this.property = null;
                }
            } else if (jobDeclaration.includes(document.jobs.starters)) {
                this.property = document.jobs.starters;
            } else {
                // but it must at least be an array, or one of the known enums
                this.property = null;
            }
        }
    }

    restorePropertyFromSequelize(document) {
        if (document.StartersValue && document.StartersValue === 'With Jobs' && document.jobs) {
            // we're only interested in Starter jobs
            const restoredProperty = document.jobs
                .filter(thisJob => thisJob.type === 'Starters')
                .map(thisJob => {
                    return {
                        id:    thisJob.id,
                        jobId: thisJob.reference.id,
                        title: thisJob.reference.title,
                        total: thisJob.total,
                    };
                });
            return restoredProperty;
        } else if (document.StartersValue) {
            return document.StartersValue;
        }
    }

    savePropertyToSequelize() {
        // when saving Starters, there is the "Value" column to update, in addition to the additional Starters reflexion records
        const startersDocument = {
            StartersValue: Array.isArray(this.property) ? 'With Jobs' : this.property
        };

        // note - only the jobId and total are required
        if (this.property && Array.isArray(this.property)) {
            startersDocument.additionalModels = {
                establishmentStarters: this.property.map(thisJob => {
                    return {
                        jobId: thisJob.jobId,
                        type: 'Starters',
                        total: thisJob.total,
                    };
                })
            };
        } else {
            // ensure all existing vacancies are deleted
            startersDocument.additionalModels = {
                establishmentStarters: []
            };
        }

        return startersDocument;
    }

    isEqual(currentValue, newValue) {
        // need to compare arrays
        let arraysEqual = true;

        if (currentValue && newValue &&
            Array.isArray(currentValue) && Array.isArray(newValue) &&
            currentValue.length == newValue.length) {
            // the preconditions are sets are equal in length; compare the array values themselves

            // we haven't got large arrays here; so simply iterate around every
            //  current value, and confirm it is in the the new data set.
            //  Array.every will drop out on the first iteration to return false
            arraysEqual = currentValue.every(thisJob => {
                return newValue.find(thatJob =>
                    thatJob.jobId === thisJob.jobId &&
                    thatJob.total === thisJob.total
                );
            });
        } else {
            // if the arrays are lengths are not equal, then we know they're not equal
            arraysEqual = false;
        }

        return arraysEqual;
    }

    toJSON(withHistory = false, showPropertyHistoryOnly = true) {
        const jsonPresentation = JobHelpers.formatJSON(this.property, 'Starters', 'TotalStarters');

        if (!withHistory) {
            // simple form - includes 
            return {
                Starters: jsonPresentation.Starters,
                TotalStarters: jsonPresentation.TotalStarters
            };
        }

        return {
            Starters: {
                currentValue: jsonPresentation.Starters,
                ... this.changePropsToJSON(showPropertyHistoryOnly)
            }
        };
    }
};