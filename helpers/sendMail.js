import nodemailer from "nodemailer";
import "dotenv/config";

const { SENDER_EMAIL, SENDER_EMAIL_KEY } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_EMAIL_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  return transport.sendMail(email);
};

export default sendMail;
