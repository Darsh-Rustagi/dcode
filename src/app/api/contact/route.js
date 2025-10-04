import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// This function handles POST requests to /api/contact
export async function POST(request) {
  try {
    // Parse the request body
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Configure your email transport using environment variables
    // IMPORTANT: Make sure to set these in your .env.local file
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send confirmation email to the user who submitted the form
    await transporter.sendMail({
      from: '"Mentora" <no-reply@mentora.com>',
      to: email,
      subject: 'We have received your message!',
      html: `
        <h1>Hi ${name},</h1>
        <p>Thank you for contacting us. We've received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p><em>${message}</em></p>
        <br/>
        <p>Best regards,</p>
        <p>The Mentora Team</p>
      `,
    });
    
    // Send a notification email to your admin address
    await transporter.sendMail({
      from: '"Mentora Contact Form" <contact@mentora.com>',
      to: 'your-admin-email@example.com', // CHANGE THIS to your admin email
      subject: `New message from ${name}: ${subject}`,
      html: `<p>You received a new message from <strong>${name}</strong> (${email}).</p><p>${message}</p>`,
    });

    // Return a success response
    return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}