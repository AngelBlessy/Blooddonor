const { env } = require('../config/env');

function toE164(target) {
  return target.startsWith('+') ? target : `+91${target}`;
}

async function sendSms(target, body) {
  if (!env.isTwilioConfigured()) {
    throw new Error(
      'SMS provider is not configured. Add Twilio account SID, auth token, and a sending phone number or messaging service SID.'
    );
  }
  const twilio = require('twilio')(env.twilio.accountSid, env.twilio.authToken);
  const message = { to: toE164(target), body };
  if (env.twilio.messagingServiceSid) message.messagingServiceSid = env.twilio.messagingServiceSid;
  else message.from = env.twilio.fromNumber;
  await twilio.messages.create(message);
}

async function sendOtpSms(target, otp) {
  await sendSms(
    target,
    `Your Blood Donation Portal OTP is ${otp}. It expires in 5 minutes. Do not share it with anyone.`
  );
}

module.exports = { sendSms, sendOtpSms };
