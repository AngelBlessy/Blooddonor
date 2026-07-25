const { Router } = require('express');
const { sendEmergencyAlerts } = require('../controllers/alerts.controller');

const router = Router();

router.post('/', sendEmergencyAlerts);

module.exports = router;
