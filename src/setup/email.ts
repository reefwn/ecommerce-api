import nodemailer from "nodemailer";

export default nodemailer.createTestAccount()
  .then(account => {
    return nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      debug: true,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  });