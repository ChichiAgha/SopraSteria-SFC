// default route and registration of all sub routes
var express = require('express');
var router = express.Router({mergeParams: true});
const models = require('../../models');

// parent route defines the "id" parameter

// gets current employer type for the known establishment
router.route('/').get(async (req, res) => {
  const establishmentId = req.establishmentId;

  // must provide the establishment ID and it must be a number
  if (!req.params.id || isNaN(parseInt(req.params.id))) {
    console.error('establishment::employerType GET - missing establishment id parameter');
    return res.status(400).send(`Unknown Establishment ID: ${req.params.id}`);
  }
  if (establishmentId !== parseInt(req.params.id)) {
    console.error('establishment::employerType GET - given and known establishment id do not match');
    return res.status(403).send(`Not permitted to access Establishment with id: ${req.params.id}`);
  }

  try {
    let results = await models.establishment.findOne({
      where: {
        id: establishmentId
      },
      attributes: ['id', 'name', 'employerType']
    });

    if (results && results.id && (establishmentId === results.id)) {
      res.status(200);
      return res.json(formatEmployerTypeResponse(results));
    } else {
      return res.status(404).send('Not found');
    }

  } catch (err) {
    // TODO - improve logging/error reporting
    console.error('establishment::employerType GET - failed', err);
    res.status(503).send(`Unable to retrive Establishment: ${req.params.id}`);
  }
});

// updates the current employer type for the known establishment
const EXPECTED_EMPLOYER_TYPES = ['Private Sector', 'Voluntary / Charity', 'Other'];
router.route('/').post(async (req, res) => {
  const establishmentId = req.establishmentId;
  const givenEmployerType = req.body.employerType;

  // must provide the establishment ID and it must be a number
  if (!req.params.id || isNaN(parseInt(req.params.id))) {
    console.error('establishment::employerType POST - missing establishment id parameter');
    return res.status(400).send(`Unknown Establishment ID: ${req.params.id}`);
  }
  if (establishmentId !== parseInt(req.params.id)) {
    console.error('establishment::employerType POST - given and known establishment id do not match');
    return res.status(403).send(`Not permitted to access Establishment with id: ${req.params.id}`);
  }

  // must provide employer type and must be one of expected values
  if (!givenEmployerType || !EXPECTED_EMPLOYER_TYPES.includes(givenEmployerType)) {
    console.error('establishment::employerType POST - unexpected employer type: ', givenEmployerType);
    return res.status(400).send(`Unexpected employer type: ${givenEmployerType}`);
  }

  try {
    let results = await models.establishment.findOne({
      where: {
        id: establishmentId
      },
      attributes: ['id', 'name', 'employerType']
    });

    if (results && results.id && (establishmentId === results.id)) {
      // we have found the establishment, update the employer type
      const newResults = await results.update({
        //name: 'Warren Ayling'
        employerType: givenEmployerType
      });
      
      res.status(200);
      return res.json(formatEmployerTypeResponse(results));
    } else {
      console.error('establishment::employerType POST - Not found establishment having id: ${establishmentId}', err);
      return res.status(404).send(`Not found establishment having id: ${establishmentId}`);
    }

  } catch (err) {
    // TODO - improve logging/error reporting
    console.error('establishment::employerType POST - failed', err);
    res.status(503).send(`Unable to update Establishment with employer type: ${req.params.id}/${givenEmployerType}`);
  }
});


const formatEmployerTypeResponse = (establishment) => {
  // WARNING - do not be tempted to copy the database model as the API response; the API may chose to rename/contain
  //           some attributes (viz. locationId below)
  return {
    id: establishment.id,
    name: establishment.name,
    employerType: establishment.employerType
  };
}

module.exports = router;