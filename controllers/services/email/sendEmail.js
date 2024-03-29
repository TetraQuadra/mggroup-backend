const nodemailer = require("nodemailer");

const sendEmail = ({ recipient, body }) => {
  if (!recipient || !body) {
    throw new Error("email content error");
  }
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_SENDER,
      pass: process.env.NODEMAILER_SECRET,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_SENDER,
    to: recipient,
    subject: "Nigerian prince needs your aid",
    html: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("error sending mail: " + error);
    } else {
      console.log("mail sent: " + info.response);
      return true;
    }
  });
};

module.exports = sendEmail;
