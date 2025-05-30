const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'mail.leolilly.org',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'admin@leolilly.org',
    pass: process.env.EMAIL_PASSWORD // Store password in .env file
  }
});

// API endpoint for enrollment
app.post('/api/enroll', async (req, res) => {
  const { name, email, phone, course } = req.body;
  
  if (!name || !email || !phone || !course) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Email to admin
    const adminMailOptions = {
      from: 'admin@leolilly.org',
      to: 'admin@leolilly.org',
      subject: 'New Course Enrollment',
      html: `
        <h2>New Enrollment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course:</strong> ${course}</p>
      `
    };

    // Email to student
    const studentMailOptions = {
      from: 'admin@leolilly.org',
      to: email,
      subject: 'Your LeoLilly Care International Enrollment',
      html: `
        <h2>Thank You for Enrolling!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for enrolling in our <strong>${course}</strong> course. We have received your application and will contact you shortly with more information.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,</p>
        <p>LeoLilly Care International Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(studentMailOptions);

    res.status(200).json({ success: true, message: 'Enrollment submitted successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to process enrollment' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
