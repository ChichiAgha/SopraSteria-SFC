// default route for reports
const express = require('express');
const router = express.Router();

const WDF = require('./wdf');
const DailySnapshot = require('./dailySnapshot');

router.use('/wdf', WDF);
router.use('/dailySnapshot', DailySnapshot);

router.route('/').get(async (req, res) => {
    return res.status(501).send();
});

module.exports = router;
