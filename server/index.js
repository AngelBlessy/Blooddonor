const { createApp } = require('./app');
const { env } = require('./config/env');

const app = createApp();

app.listen(env.port, () => {
  console.log(`BloodNet server running at http://localhost:${env.port}`);
  console.log('SMTP (email OTP/alerts):', env.isSmtpConfigured() ? 'configured' : 'not configured');
  console.log('Twilio (SMS OTP/alerts):', env.isTwilioConfigured() ? 'configured' : 'not configured');
});
