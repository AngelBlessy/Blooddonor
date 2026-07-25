const nodemailer = require('nodemailer');
const { env, requireEnv } = require('../config/env');

function smtpPassword() {
  return requireEnv('SMTP_PASS').replace(/\s+/g, '');
}

function createTransporter() {
  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: smtpPassword(),
    },
  });
}

async function sendMail({ to, subject, text }) {
  const transporter = createTransporter();
  const fromEmail = requireEnv('SMTP_USER');
  await transporter.sendMail({
    from: `"${env.smtp.fromName}" <${fromEmail}>`,
    to,
    subject,
    text,
  });
}

async function sendOtpEmail(target, otp, body) {
  await sendMail({
    to: target,
    subject: 'Blood Donation Portal - Email Verification OTP',
    text:
      body ||
      [
        'Hello,',
        '',
        `Your Blood Donation Portal OTP is ${otp}.`,
        '',
        'This OTP expires in 5 minutes.',
        'Do not share the OTP with anyone.',
      ].join('\n'),
  });
}

module.exports = { sendMail, sendOtpEmail };
