import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.mail.yahoo.com",
  auth: {
    user: "alexjy@yahoo.com",
    pass: process.env.MAILER_PASSWORD,
  },
  secure: true,
});
