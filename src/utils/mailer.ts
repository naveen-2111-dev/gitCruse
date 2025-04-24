import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

type MailConfig = {
  template: string;
  email: string;
  subject: string;
};

async function sendEmail({
  template,
  email,
  subject,
}: MailConfig): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "gmail",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "gitcruse@gmail.com",
      pass: "glmm sxgy ekya lxqv",
    },
  });

  await transporter.sendMail({
    from: '"The Cruse" <noreply@gmail.com>',
    to: email,
    subject: subject,
    html: template,
  });
}

export default sendEmail;
