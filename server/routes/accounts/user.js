// default route for user endpoint
const express = require('express');
const router = express.Router();

const models = require('../../models');
const Authorization = require('../../utils/security/isAuthenticated');
const passwordCheck = require('../../utils/security/passwordValidation').isPasswordValid;
const isLocal = require('../../utils/security/isLocalTest').isLocal;
const bcrypt = require('bcrypt-nodejs');
const generateJWT = require('../../utils/security/generateJWT');
const usernameCheck = require('../../utils/security/usernameValidation').isUsernameValid;

// all user functionality is encapsulated
const User = require('../../models/classes/user');

// default route
router.route('/').get(async (req, res) => {
    res.status(200).send();
});

const responseErrors = {
  invalidUsername: {
    errCode: -210,
    errMessage: 'Invalid Username'
  }
};

// returns a list of all users for the given establishment
router.use('/establishment/:id', Authorization.hasAuthorisedEstablishment);
router.route('/establishment/:id').get(async (req, res) => {
    // although the establishment id is passed as a parameter, get the authenticated  establishment id from the req
    const establishmentId = req.establishmentId;

    try {
        const allTheseUsers = await User.User.fetch(establishmentId);

        return res.status(200).json({
            users: allTheseUsers
        });
    } catch (err) {
        console.error('user::establishment - failed', err);
        return res.status(503).send(`Failed to get users for establishment having id: ${establishmentId}`);
    }
});


const getUser = async (req, res) => {
    let userId;

    if(req.params.userId){
        userId = req.params.userId;
    } else {
        userId = req.username;
    }

    const establishmentId = req.establishmentId;
    const showHistory = req.query.history === 'full' || req.query.history === 'property' || req.query.history === 'timeline' ? true : false;
    const showHistoryTime = req.query.history === 'timeline' ? true : false;
    const showPropertyHistoryOnly = req.query.history === 'property' ? true : false;

    // validating user id - must be a V4 UUID or it's a username
    const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/;
    let byUUID = null, byUsername = null;
    if (uuidRegex.test(userId.toUpperCase())) {
        byUUID = userId;
    } else {
        byUsername = escape(userId.toLowerCase());
    }

    const thisUser = new User.User(establishmentId);

    try {
        if (await thisUser.restore(byUUID, byUsername, showHistory && req.query.history !== 'property')) {
            let userData = thisUser.toJSON(showHistory, showPropertyHistoryOnly, showHistoryTime, false);
            if(!(userData.username && req.username && userData.username == req.username)){
                delete userData.securityQuestionAnswer;
                delete userData.securityQuestion;
            } 
            return res.status(200).json(userData);
        } else {
            // not found worker
            return res.status(404).send('Not Found');
        }
    } catch (err) {
        const thisError = new User.UserExceptions.UserRestoreException(
            null,
            thisUser.uid,
            null,
            err,
            null,
            `Failed to retrieve user with uid: ${userId}`);

        console.error('user::GET/:userId - failed', thisError.message);
        return res.status(503).send(thisError.safe);
    }
}


router.use('/me', Authorization.isAuthorised);
router.route('/me').get(async (req, res) => {
    getUser(req, res);
});

// gets requested user id or username - using the establishment id extracted for authorised token
// optional parameter - "history" must equal 1
router.use('/establishment/:id/:userId', Authorization.hasAuthorisedEstablishment);
router.route('/establishment/:id/:userId').get(async (req, res) => {
    getUser(req, res);
});

// updates a user with given uid or username
router.use('/establishment/:id/:userId', Authorization.hasAuthorisedEstablishment);
router.route('/establishment/:id/:userId').put(async (req, res) => {
    const userId = req.params.userId;
    const establishmentId = req.establishmentId;
    const expiresTTLms = isLocal(req) && req.body.ttl ? parseInt(req.body.ttl)*1000 : 3*60*60*24*1000; // 3 days

    // validating user id - must be a V4 UUID or it's a username
    const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/;
    let byUUID = null, byUsername = null;
    if (uuidRegex.test(userId.toUpperCase())) {
        byUUID = userId;
    } else {
        byUsername = escape(userId.toLowerCase());
    }
    
    const thisUser = new User.User(establishmentId);
    
    try {
        // before updating a Worker, we need to be sure the Worker is
        //  available to the given establishment. The best way of doing that
        //  is to restore from given UID
        if (await thisUser.restore(byUUID, byUsername, null)) {
            // TODO: JSON validation

            // force lowercase on email when updating
            req.body.email = req.body.email ? req.body.email.toLowerCase() : req.body.email;

            // by loading after the restore, only those properties defined in the
            //  PUT body will be updated (peristed)
            const isValidUser = await thisUser.load(req.body);

            // this is an update to an existing User, so no mandatory properties!
            if (isValidUser) {
                await thisUser.save(req.username, expiresTTLms);

                // if local/dev - we're not sending email so return the add user tracking UUID if it exists
                let response = thisUser.toJSON(false, false, false, true);
                if (isLocal(req) && thisUser.trackingId) {
                    response = { ...response, trackingUUID: thisUser.trackingId};
                }
                return res.status(200).json(response);
            } else {
                return res.status(400).send('Unexpected Input.');
            }
            
        } else {
            // not found worker
            return res.status(404).send('Not Found');
        }

    } catch (err) {
        if (err instanceof User.UserExceptions.UserJsonException) {
            console.error("User PUT: ", err.message);
            return res.status(400).send(err.safe);
        } else if (err instanceof User.UserExceptions.UserSaveException) {
            console.error("User PUT: ", err.message);
            return res.status(503).send(err.safe);
        }
    }
});


// resets a user's password - must have Authoization header and must be a valid password reset JWT
router.use('/resetPassword', Authorization.isAuthorisedPasswdReset);
router.route('/resetPassword').post(async (req, res) => {
    const givenPassword = escape(req.body.password);
    
    if (givenPassword === 'undefined') {
        return res.status(400).send('missing password');
    }

    if (!passwordCheck(givenPassword)) {
        return res.status(400).send('password invalid');
    }

    // NOTE - there is no required check that the password is not the same password nor has the password been used before

    try {
        // all checks pass, so find the user using facts from the token (now on the req)
        const loginResponse = await models.login.findOne({
            where: {
                username: {
                    [models.Sequelize.Op.iLike] : req.username
                },
                isActive: true
            },
            include: [
                {
                    model: models.user,
                    attributes: ['id', 'FullNameValue'],
                }
            ]
        });

        if (loginResponse && loginResponse.username === req.username && loginResponse.user.id) {
            await models.sequelize.transaction(async t => {
                // login account found - update the passowrd, reset invalid attempts
                const passwordHash = await bcrypt.hashSync(givenPassword, bcrypt.genSaltSync(10), null);
                loginResponse.update({
                    Hash: passwordHash,
                    invalidAttempt: 0,
                    passwdLastChanged: new Date()
                }, {transaction: t});

                // and crfeate an audit event
                const auditEvent = {
                    userFk: loginResponse.user.id,
                    username: req.username,
                    type: 'passwdReset',
                    property: 'password',
                    event: {}
                };
                await models.userAudit.create(auditEvent, {transaction: t});

                // mark the given reset as completed
                await models.passwordTracking.update(
                    {
                        completed: new Date()
                    },
                    {
                        where: {
                                uuid: req.resetUuid
                        },
                        transaction: t
                    }
                );
            });
            
        } else {
            throw new Error(`Failed to find user: ${req.username}`);
        }

        // gets here on success
        res.status(200).send(`Reset password for ${req.fullname}`);

    } catch (err) {
        // TODO - improve logging/error reporting
        console.error('User /resetPassword failed', err);
        return res.status(503).send();
      }
});

// changes a user's password - must have Authoization header and must be a valid login JWT; authenticates the current password before setting new password
router.use('/changePassword', Authorization.isAuthorised);
router.route('/changePassword').post(async (req, res) => {
    const currentPassword = escape(req.body.currentPassword);
    const newPassword = escape(req.body.newPassword);
    
    if (currentPassword === 'undefined' || newPassword === 'undefined') {
        return res.status(400).send('missing password');
    }

    // do not validate current password; in case the password complexity rules change (the current password will be authenticated)
    if (!passwordCheck(newPassword)) {
        return res.status(400).send('password invalid');
    }

    // NOTE - there is no required check that the password is not the same password nor has the password been used before

    try {

        // all checks pass, so find the user using facts from the token (now on the req)
        const login = await models.login.findOne({
            where: {
                username: {
                    [models.Sequelize.Op.iLike] : req.username
                },
                isActive: true
            },
            include: [
                {
                    model: models.user,
                    attributes: ['id', 'FullNameValue'],
                }
            ]
        });

        if (login && login.username === req.username && login.user.id) {
            // now authenticate the given current password
            login.comparePassword(currentPassword, null, false, async (err, isMatch, rehashTribal) => {
                if (isMatch && !err) {
                    await models.sequelize.transaction(async t => {
                        // login account found - update the passowrd, reset invalid attempts
                        const passwordHash = await bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);
                        login.update({
                            Hash: passwordHash,
                            invalidAttempt: 0,
                            passwdLastChanged: new Date()
                        },
                        {transaction: t});
        
                        // and crfeate an audit event
                        const auditEvent = {
                            userFk: login.user.id,
                            username: req.username,
                            type: 'passwdReset',
                            property: 'password',
                            event: {}
                        };
                        await models.userAudit.create(auditEvent, {transaction: t});
                    });

                    return res.status(200).send(`Changed password for ${login.user.FullNameValue}`);

                } else {
                    console.error("User /changePassword failed authentication on current password");

                    // failed authentication
                    await models.sequelize.transaction(async t => {
                        const maxNumberOfFailedAttempts = 10;
          
                        // increment the number of failed attempts by one
                        const loginUpdate = {
                          invalidAttempt: login.invalidAttempt + 1
                        };
                        login.update(loginUpdate, {transaction: t});
          
                        // TODO - could implement both https://www.npmjs.com/package/request-ip & https://www.npmjs.com/package/iplocation 
                        //        to resolve the client's IP address on login failure, thus being able to audit the source of where the failed
                        //        login came from
          
                        // add an audit record
                        const auditEvent = {
                          userFk: login.user.id,
                          username: req.username,
                          type: login.invalidAttempt >= (maxNumberOfFailedAttempts+1) ? 'loginWhileLocked' : 'loginFailed',
                          property: 'password',
                          event: {}
                        };
                        await models.userAudit.create(auditEvent, {transaction: t});
                      });
          
                      return res.status(403).send();
                }

            }); // end comparePassword.promise.then
            
        } else {
            throw new Error(`Failed to find user: ${req.username}`);
        }

    } catch (err) {
        // TODO - improve logging/error reporting
        console.error('User /changePassword failed', err);
        return res.status(503).send();
      }
});

// registers (part add) a new user
router.use('/add/establishment/:id', Authorization.hasAuthorisedEstablishment);
router.route('/add/establishment/:id').post(async (req, res) => {
    // although the establishment id is passed as a parameter, get the authenticated  establishment id from the req
    const establishmentId = req.establishmentId;
    const expiresTTLms = isLocal(req) && req.body.ttl ? parseInt(req.body.ttl)*1000 : 3*60*60*24*1000; // 3 days

    // ensure only a user having the role of Edit can register a new user
    if (!(req.role && req.role === 'Edit')) {
        console.error('/add/establishment/:id - given user does not have sufficient permission')
        return res.status(403).send();
    }

    if(!req.body.role || !(req.body.role == 'Edit' || req.body.role == 'Read')){
        console.error('/add/establishment/:id - Invalid request')
        return res.status(403).send();
    }

    let limits = {'Edit': User.User.MAX_EDIT_SINGLE_USERS, 'Read' : User.User.MAX_READ_SINGLE_USERS};

    if(req.isParent){
        limits = {'Edit': User.User.MAX_EDIT_PARENT_USERS, 'Read' : User.User.MAX_READ_PARENT_USERS};
    }

    const currentTypeLimits = await User.User.fetchUserTypeCounts(establishmentId);

    if(currentTypeLimits[req.body.role]+1 > limits[req.body.role]){
        console.error('/add/establishment/:id - Invalid request')
        return res.status(400).send(`Cannot create new account as ${req.body.role} account type limit reached`);
    }

    // use the User properties to load (includes validation)
    const thisUser = new User.User(establishmentId);
    
    try {
        // TODO: JSON validation

        // force email to be lowercase
        req.body.email = req.body.email ? req.body.email.toLowerCase() : req.body.email;


        // only those properties defined in the POST body will be updated (peristed)
        const isValidUser = await thisUser.load(req.body);

        // this is a new User, so check mandatory properties!
        if (isValidUser) {
            // this is a part user (register user) - so no audit
            // Also, because this is a part user (register user) - must send a registration email which means adding
            //  user tracking
            await thisUser.save(req.username, expiresTTLms);

            // if local/dev - we're not sending email so return the add user tracking UUID
            let response = thisUser.toJSON(false, false, false, true);
            if (isLocal(req)) {
                response = { ...response, trackingUUID: thisUser.trackingId};
            }
            return res.status(200).json(response);
        } else {
            return res.status(400).send('Unexpected Input.');
        }

    } catch (err) {
        if (err instanceof User.UserExceptions.UserJsonException) {
            console.error("/add/establishment/:id POST: ", err.message);
            return res.status(400).send(err.safe);
        } else if (err instanceof User.UserExceptions.UserSaveException && err.message === 'Missing Mandatory properties') {
            console.error("/add/establishment/:id POST: ", err.message);
            return res.status(400).send(err.safe);
        } else if (err instanceof User.UserExceptions.UserSaveException) {
            console.error("/add/establishment/:id POST: ", err.message);
            return res.status(503).send(err.safe);
        }

        console.error("Unexpected exception: ", err)
    }
});

// validates (part add) a new user - not authentication middleware
router.route('/validateAddUser').post(async (req, res) => {
    if (!req.body.uuid) {
        console.error('No UUID');
        return res.status(400).send();
    }
    // parse input - escaped to prevent SQL injection
    const givenUuid = escape(req.body.uuid);
    const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

    if (!uuidV4Regex.test(givenUuid)) {
        console.error('Invalid UUID');
        return res.status(400).send();
    }
    
    try {
        // username is on Login table, but email is on User table. Could join, but it's just as east to fetch each individual
        const passTokenResults = await models.addUserTracking.findOne({
            where: {
                uuid: givenUuid
            },
            include: [
                {
                    model: models.user,
                    attributes: ['id', 'uid', 'FullNameValue', 'EmailValue', 'JobTitleValue', 'PhoneValue'],
                }
            ]
        });
  
        if (passTokenResults && passTokenResults.id) {
            // now check if the token has expired or already been consumed
            const now = new Date().getTime();

            if (passTokenResults.expires.getTime() < now) {
                console.error(`/add/validateAddUser - reset token (${givenUuid}) expired`);
                return res.status(403).send();
            }
    
            if (passTokenResults.completed) {
                console.error(`/add/validateAddUser - reset token (${givenUuid}) has already been used`);
                return res.status(403).send();
            }
    
            // gets this far if the token is valid. Generate a JWT, which requires knowing the associated User UUID.
            if (passTokenResults.user && passTokenResults.user.id) {
                // generate JWT and attach it to the header (Authorization) - JWT username is the name of the User who registered the user (for audit purposes)
                const JWTexpiryInMinutes = 30;
                const token = generateJWT.addUserJWT(JWTexpiryInMinutes, passTokenResults.user.uid, passTokenResults.user.FullNameValue , givenUuid);
        
                res.set({
                    'Authorization': 'Bearer ' + token
                });
        
                return res.status(200).json({
                    fullname: passTokenResults.user.FullNameValue,
                    jobTitle: passTokenResults.user.JobTitleValue,
                    email: passTokenResults.user.EmailValue,
                    phone: passTokenResults.user.PhoneValue,
                });
    
            } else {
                throw new Error(`Failed to find user matching reset token (${givenUuid})`);
            }

        } else {
            // token not found
            console.error(`/add/validateAddUser - reset token (${givenUuid}) not found`);
            return res.status(404).send();
        }
    } catch (err) {
        console.error('/add/validateAddUser - failed: ', err);
        return res.status(503).send();
    }
});

// registers (full add) a new user - authentication middleware is specific to add user token
router.use('/add', Authorization.isAuthorisedAddUser);
router.route('/add').post(async (req, res) => {
    // although the establishment id is passed as a parameter, get the authenticated  establishment id from the req
    const addUserUUID = req.addUserUUID;
   
    try {
        // TODO: JSON validation
        if (req.body[0] && req.body[0].user && req.body[0].user.username) {
          if (!usernameCheck(req.body[0].user.username)) {
            return res.status(400).json(responseErrors.invalidUsername);
          }
        }

        // The required User role will obtained from the original user record at the time of registration via the
        //  add user tracking UUID, along with the establishment ID
        const trackingResponse = await models.addUserTracking.findOne({
            where: {
                uuid: addUserUUID
            },
            include: [
                {
                    model: models.user,
                    attributes: ['id', 'uid', 'UserRoleValue', 'establishmentId'],
                }
            ]
        });

        if (trackingResponse && trackingResponse.uuid && trackingResponse.user.uid) {
            // use the User properties to load (includes validation)
            const thisUser = new User.User(trackingResponse.user.establishmentId, addUserUUID);

            // only those properties defined in the POST body will be updated (peristed) along with
            //   the additional role property - ovverwrites against that could be passed in the body
            const newUserProperties = {
                ...req.body,
                role: trackingResponse.user.UserRoleValue
            };

            // force the username and email to be lowercase
            newUserProperties.username = newUserProperties.username ? newUserProperties.username.toLowerCase() : newUserProperties.username;
            newUserProperties.email = newUserProperties.email ? newUserProperties.email.toLowerCase() : newUserProperties.email;

            const isValidUser = await thisUser.load(newUserProperties);
            // this is a new User, so check mandatory properties and additional the additional default properties required to add a user!
            if (isValidUser && thisUser.hasDefaultNewUserProperties) {
                // this is a part user (register user) - so no audit
                // Also, because this is a part user (register user) - must send a registration email which means adding
                //  user tracking
                await thisUser.save(trackingResponse.by);

                return res.status(200).json(thisUser.toJSON(false, false, false, true));
            } else {
                return res.status(400).send('Unexpected Input.');
            }

        } else {
            // not found the given add user tracking reference
            console.error("api/user/add error - failed to match add user tracking and user record");
            return res.status(404).send();
        }

    } catch (err) {
        if (err instanceof User.UserExceptions.UserJsonException) {
            console.error("/add/establishment/:id POST: ", err.message);
            return res.status(400).send(err.safe);
        } else if (err instanceof User.UserExceptions.UserSaveException && err.message === 'Duplicate Username') {
            console.error("/add/establishment/:id POST: ", err.message);
            return res.status(400).send(err.message);
        } else if (err instanceof User.UserExceptions.UserSaveException) {
            console.error("/add/establishment/:id POST: ", err.message);
            return res.status(503).send(err.safe);
        }

        console.error("Unexpected exception: ", err)
    }
});

// returns the set of establishments associated with this (as given by JWT) user
// their primary establishment always exists and is awlays returned.
// If, this user has Edit authority and their primary establishment is a parent, then this aslo returns all the subs.
router.use('/my/establishments', Authorization.isAuthorised);
router.route('/my/establishments').get(async (req, res) => {
    // although the establishment id is passed as a parameter, get the authenticated  establishment id from the req
    const theLoggedInUser = req.username;
    const primaryEstablishmentId = req.establishment.id;
    const isParent = req.isParent;

    try {
        const thisUser = new User.User(primaryEstablishmentId);;
        await thisUser.restore(null, theLoggedInUser, false);

        const myEstablishments = await thisUser.myEstablishments(isParent, null);
        return res.status(200).send(myEstablishments);

    } catch (err) {
        console.error("/user/my/establishments: ERR: ", err.message);
        return res.status(503).send({});        // intentionally an empty JSON response
    }
});

module.exports = router;