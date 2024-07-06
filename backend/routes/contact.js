const express = require('express');
const router = express.Router();

module.exports = (nodemailer) => {
  router.post('/', (req, res) => {
    const { name, email, message } = req.body;

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'your-email@gmail.com',
      subject: 'Contact Form Submission',
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.toString());
        return;
      }
      res.send('Email sent: ' + info.response);
    });
  });

  return router;
};
