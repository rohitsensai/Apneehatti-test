import main from "../../../database/conn";
import User from "../../../model/userSchema";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPassword = async (req, res) => {
  try {
    // Connect to the database
    await main();

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "10m",
    });

    // Create a reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL, // Your Gmail email
        pass: process.env.MAIL_SECRET, // Your Gmail app password
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Prepare email data
    const mailOptions = {
      from: "kunalbhosle555@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Password Reset Request</title>
          </head>
          <body>
            <p>Hi ${user.fullname},</p>
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

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Confirmation email sent successfully");

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

export default forgotPassword;
