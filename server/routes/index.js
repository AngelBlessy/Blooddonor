const { Router } = require('express');
const otpRoutes = require('./otp.routes');
const alertsRoutes = require('./alerts.routes');

const router = Router();

router.use('/send-otp', otpRoutes);
router.use('/send-emergency-alerts', alertsRoutes);

router.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = router;
