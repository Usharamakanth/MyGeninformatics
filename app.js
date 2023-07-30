const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/send_email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server address
    port: 587, // Replace with the desired port number (e.g., 587, 465, 25)
    secure: false, // Set to true if using a TLS/SSL connection (e.g., port 465)
    auth: {
      user: 'usharamakanth21@gmail.com', // Replace with your email address
      pass: 'ealoletncqzbhpoc', // Replace with your email password or an App Password (if using Gmail)
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'info@mygeninformatics.nl', // Replace with the email address where you want to receive the messages
    subject: 'New Contact Form Submission',
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Oops! Something went wrong. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Thank you for your message. We will get back to you soon!');
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


