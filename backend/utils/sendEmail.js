const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporter;

  // Use real Gmail if credentials are provided and not the placeholder
  if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your_email@gmail.com') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Fallback to a testing email account (Ethereal) if real credentials are not set
    console.log("Using Ethereal for testing since real Gmail credentials are not provided.");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your_email@gmail.com' 
      ? `GetEasy <${process.env.EMAIL_USER}>` 
      : 'GetEasy Test <test@geteasy.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  // If using Ethereal, log the preview URL so the user can see the OTP!
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
    console.log("Preview OTP Email at: %s", nodemailer.getTestMessageUrl(info));
  }
};

module.exports = sendEmail;
