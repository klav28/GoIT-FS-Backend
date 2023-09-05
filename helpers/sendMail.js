import nodemailer from "nodemailer";
import "dotenv/config";

const { SENDER_EMAIL_HOST, SENDER_EMAIL_PORT, SENDER_EMAIL, SENDER_EMAIL_KEY, SENDER_EMAIL_RECEIVER } = process.env;

const nodemailerConfig = {
  host: SENDER_EMAIL_HOST,
  port: SENDER_EMAIL_PORT,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_EMAIL_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = (data) => {
  const email = { ...data, from: SENDER_EMAIL, to: SENDER_EMAIL_RECEIVER };
  return transport.sendMail(email);
};

export default sendMail;
