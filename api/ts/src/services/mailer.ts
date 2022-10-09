import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  port: Number(process.env.MAILER_PORT),
  host: process.env.MAILER_HOST,
  auth: {
    user: process.env.MAILER,
    pass: process.env.MAILER_PASSWORD,
  },
  secure: true,
});
