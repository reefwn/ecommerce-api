import transporter from '../setup/email';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export const loadTemplate = (templateName: string, context: any) => {
  const templateSource = fs.readFileSync(path.join(import.meta.dir, `../templates/${templateName}`), "utf8")
  const template = Handlebars.compile(templateSource);

  return template(context);
}

export const sendEmail = async (to: string, subject: string, html: string) => {
  let info = await (await transporter).sendMail({
    from: '"Foo 👻" <foo@example.com>',
    to,
    subject,
    html
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}