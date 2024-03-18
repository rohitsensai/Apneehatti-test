import * as nodemailer from "nodemailer";

export default async function (req, res) {
  const { email, token, user } = await req.body;
  const transporter = nodemailer.createTransport({
    debug: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL, // generated ethereal user
      pass: process.env.MAIL_SECRET, // generated ethereal password
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: "kunalbhosle555@gmail.com",
    to: email,
    subject: `Message From apneehatti`,
    text: " hello | Sent from: apneehatti",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset Request</title>
  </head>
  <body>
    <p>Hi ${user},</p>

    <p>
      You recently requested to reset your password. Please follow the link
      below to reset your password:
    </p>

    <p><a href="${process.env.HOST}/reset-password?token=${token}">Reset Password</a></p>

    <p>
      If you did not request this change, please ignore this message and your
      password will remain unchanged.
    </p>

    <p>Best regards,</p>

    <p>Apneehatti</p>
  </body>
</html>
`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
  res.status(200).json("Confirmation mail send successfully");
}
