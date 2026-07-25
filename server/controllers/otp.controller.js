const { sendOtpEmail } = require('../services/mailer.service');
const { sendOtpSms } = require('../services/sms.service');
const { toDeliveryError } = require('../utils/delivery-error');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_PATTERN = /^\d{6}$/;
const PHONE_PATTERN = /^\d{10}$/;

async function sendOtp(req, res) {
  const { channel, target, otp, body } = req.body || {};
  if (!OTP_PATTERN.test(String(otp || ''))) {
    return res.status(400).json({ error: 'Invalid OTP format' });
  }

  try {
    if (channel === 'email') {
      if (!EMAIL_PATTERN.test(String(target || ''))) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
      await sendOtpEmail(target, otp, body);
      return res.json({ ok: true });
    }

    if (channel === 'sms') {
      if (!PHONE_PATTERN.test(String(target || ''))) {
        return res.status(400).json({ error: 'Enter a valid 10-digit Indian mobile number' });
      }
      await sendOtpSms(target, otp);
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: 'Unsupported OTP channel' });
  } catch (error) {
    console.error('OTP delivery failed:', error.message);
    const { status, message } = toDeliveryError(error);
    return res.status(status).json({ error: message });
  }
}

module.exports = { sendOtp };
