import main from "../../../database/conn";
import nodemailer from "nodemailer";

const Contact = async (req, res) => {
  try {
    // Connect to the database
    await main();

    const { email } = req.body;

    console.log(email)

    // Validate email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    console.log("env",process.env.CONTACT)
    // Create a reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL, // Your Gmail email
        pass: process.env.MAIL_SECRET,
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Prepare email data
    const mailOptions = {
      from: process.env.CONTACT, // Your Gmail email
      to: process.env.MAIL,
      // Set the reply-to to the user's email
      subject: "Contact Us Request",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Contact Us Request</title>
          </head>
          <body>
            <p>The recipient ${email} wants to contact you.</p>
          </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Contact request email sent successfully");

    res.status(200).json({ message: "Contact request email sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

export default Contact;
