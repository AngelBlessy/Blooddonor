const { Router } = require('express');
const { sendOtp } = require('../controllers/otp.controller');

const router = Router();

router.post('/', sendOtp);

module.exports = router;
