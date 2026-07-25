require('dotenv').config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value || value.includes('your_')) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

const env = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',

  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    fromName: process.env.SMTP_FROM_NAME || 'Blood Donation Portal',
  },

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    fromNumber: process.env.TWILIO_FROM_NUMBER || '',
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || '',
  },

  isSmtpConfigured() {
    return Boolean(process.env.SMTP_USER) && !String(process.env.SMTP_USER).includes('your_');
  },

  isTwilioConfigured() {
    return Boolean(
      this.twilio.accountSid &&
        this.twilio.authToken &&
        (this.twilio.fromNumber || this.twilio.messagingServiceSid)
    );
  },
};

module.exports = { env, requireEnv };
