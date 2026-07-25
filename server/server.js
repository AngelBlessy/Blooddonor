const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3000);

const publicDir = path.join(__dirname, '..', 'public');

app.use(express.json({ limit: '20kb' }));
app.use(express.static(publicDir));

app.post('/api/translate', async (req, res) => {
  const { target, texts } = req.body || {};
  if (!/^[a-z]{2}$/i.test(String(target || '')) || !Array.isArray(texts) || texts.length > 140) return res.status(400).json({ error: 'Invalid translation request' });
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Translation service is not configured' });
  try {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q: texts, target, format: 'text' }) });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload?.error?.message || 'Translation service failed');
    res.json({ translations: payload.data.translations.map((item) => item.translatedText) });
  } catch (error) { res.status(502).json({ error: error.message }); }
});

function requireEnv(name) {
  const value = process.env[name];
  if (!value || value.includes('your_')) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function smtpPassword() {
  return requireEnv('SMTP_PASS').replace(/\s+/g, '');
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: smtpPassword()
    }
  });
}

async function sendEmailOtp(target, otp, body) {
  const transporter = createTransporter();
  const fromName = process.env.SMTP_FROM_NAME || 'Blood Donation Portal';
  const fromEmail = requireEnv('SMTP_USER');
  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: target,
    subject: 'Blood Donation Portal - Email Verification OTP',
    text: body || [
      'Hello,',
      '',
      `Your Blood Donation Portal OTP is ${otp}.`,
      '',
      'This OTP expires in 5 minutes.',
      'Do not share the OTP with anyone.'
    ].join('\n')
  });
}

async function sendSmsOtp(target, otp) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (!sid || !token || (!from && !messagingServiceSid)) {
    throw new Error('SMS provider is not configured. Add Twilio account SID, auth token, and a sending phone number or messaging service SID.');
  }
  const twilio = require('twilio')(sid, token);
  const message = {
    to: target.startsWith('+') ? target : `+91${target}`,
    body: `Your Blood Donation Portal OTP is ${otp}. It expires in 5 minutes. Do not share it with anyone.`
  };
  if (messagingServiceSid) message.messagingServiceSid = messagingServiceSid;
  else message.from = from;
  await twilio.messages.create(message);
}

async function sendEmailAlert(target, subject, body) {
  const transporter = createTransporter();
  const fromName = process.env.SMTP_FROM_NAME || 'Blood Donation Portal';
  const fromEmail = requireEnv('SMTP_USER');
  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: target,
    subject,
    text: body
  });
}

async function sendSmsAlert(target, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (!sid || !token || (!from && !messagingServiceSid)) throw new Error('SMS provider is not configured.');
  const twilio = require('twilio')(sid, token);
  const message = { to: target.startsWith('+') ? target : `+91${target}`, body };
  if (messagingServiceSid) message.messagingServiceSid = messagingServiceSid;
  else message.from = from;
  await twilio.messages.create(message);
}

app.post('/api/send-otp', async (req, res) => {
  try {
    const { channel, target, otp, body } = req.body || {};
    if (!/^\d{6}$/.test(String(otp || ''))) {
      return res.status(400).json({ error: 'Invalid OTP format' });
    }
    if (channel === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(target || ''))) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
      await sendEmailOtp(target, otp, body);
      return res.json({ ok: true });
    }
    if (channel === 'sms') {
      if (!/^\d{10}$/.test(String(target || ''))) {
        return res.status(400).json({ error: 'Enter a valid 10-digit Indian mobile number' });
      }
      await sendSmsOtp(target, otp);
      return res.json({ ok: true });
    }
    return res.status(400).json({ error: 'Unsupported OTP channel' });
  } catch (error) {
    console.error(error.message);
    if (String(error.message || '').includes('535')) {
      return res.status(500).json({
        error: 'Gmail rejected the SMTP login. Use a Gmail App Password in SMTP_PASS, not your normal Gmail password.'
      });
    }
    if (error.code === 21211) return res.status(400).json({ error: 'The mobile number is invalid. Enter a valid 10-digit Indian mobile number.' });
    if (error.code === 21608) return res.status(500).json({ error: 'This Twilio trial account can send SMS only to verified phone numbers. Verify the recipient in Twilio or upgrade the account.' });
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/send-emergency-alerts', async (req, res) => {
  try {
    const { request, recipients } = req.body || {};
    const patient = String(request?.patient || '').trim();
    const bloodGroup = String(request?.bloodGroup || '').trim();
    const units = Number(request?.units);
    const priority = String(request?.priority || '').trim();
    if (!patient || !bloodGroup || !Number.isInteger(units) || units < 1 || !priority || !Array.isArray(recipients) || recipients.length > 100) {
      return res.status(400).json({ error: 'Invalid emergency alert request' });
    }
    const subject = `Urgent blood request: ${bloodGroup} needed`;
    const message = `BloodNet emergency alert\n\nPatient / case: ${patient}\nBlood group needed: ${bloodGroup}\nUnits needed: ${units}\nPriority: ${priority}\n\nPlease respond to the hospital if you are available to donate.`;
    const results = await Promise.all(recipients.map(async (recipient) => {
      const email = String(recipient?.email || '').trim().toLowerCase();
      const phone = String(recipient?.phone || '').replace(/\D/g, '');
      const [emailResult, smsResult] = await Promise.allSettled([
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? sendEmailAlert(email, subject, message) : Promise.reject(new Error('Invalid email')),
        /^\d{10}$/.test(phone) ? sendSmsAlert(phone, message) : Promise.reject(new Error('Invalid phone'))
      ]);
      return { email: emailResult.status === 'fulfilled', sms: smsResult.status === 'fulfilled' };
    }));
    res.json({ ok: true, emailSent: results.filter((result) => result.email).length, smsSent: results.filter((result) => result.sms).length });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`BloodNet running at http://localhost:${port}`);
  console.log('OTP email sender:', process.env.SMTP_USER || 'not configured');
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || (!process.env.TWILIO_FROM_NUMBER && !process.env.TWILIO_MESSAGING_SERVICE_SID)) {
    console.log('SMS provider not configured. Add Twilio values in .env to send mobile OTP.');
  }
});
