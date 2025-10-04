'use client';

import React, { useState } from 'react';
// Assuming lucide-react is installed in your project
// If not, you can install it with: npm install lucide-react
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

/*
  NOTE FOR THE BACKEND API ROUTE (e.g., /pages/api/contact.js)

  In a real Next.js application, you would create a file at '/pages/api/contact.js'
  to handle the form submission. This file would not be part of your React component.
  It would contain server-side code to process the request and send an email.

  You would need to install a library like 'nodemailer' to send emails.
  `npm install nodemailer` or `yarn add nodemailer`

  Here's an example of what that API route file might look like:

  // File: /pages/api/contact.js
  import nodemailer from 'nodemailer';

  export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;

      // Basic validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Configure your email transport
      // IMPORTANT: Use environment variables for sensitive data like email credentials
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        // Send email to the user
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
        
        // You might also want to send a notification to yourself
        await transporter.sendMail({
          from: '"Mentora Contact Form" <contact@mentora.com>',
          to: 'your-admin-email@example.com',
          subject: `New message from ${name}: ${subject}`,
          html: `<p>You received a new message from <strong>${name}</strong> (${email}).</p><p>${message}</p>`,
        });

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
*/


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: '', type: '' });

    // In a real app, this would be a fetch to '/api/contact'
    try {
      // Simulating API call
      console.log('Submitting form data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Mock response
      // To test error, you can throw an error here:
      // if(formData.email.includes('test-error')) throw new Error("Simulated server error");

      setStatus({ message: `Thank you, ${formData.name}! Your message has been sent.`, type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      setStatus({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-amber-100 min-h-screen text-zinc-900 font-sans pt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-900">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question, feedback, or just want to say hi, feel free to reach out.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-zinc-200/80 rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-12 shadow-lg">
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">Contact Information</h2>
            <p className="text-zinc-700 mb-8">
              Fill up the form and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-200 p-3 rounded-full border border-amber-300/50">
                  <Phone className="text-amber-800" size={20} />
                </div>
                <span className="text-lg text-zinc-800">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-amber-200 p-3 rounded-full border border-amber-300/50">
                  <Mail className="text-amber-800" size={20} />
                </div>
                <span className="text-lg text-zinc-800">help@mentora.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-amber-200 p-3 rounded-full border border-amber-300/50">
                  <MapPin className="text-amber-800" size={20} />
                </div>
                <span className="text-lg text-zinc-800">123 Tech Avenue, Silicon Valley, CA</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-600 mb-2">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full p-3 bg-white border border-zinc-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-600 mb-2">Email Address</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-white border border-zinc-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-600 mb-2">Subject</label>
                <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="w-full p-3 bg-white border border-zinc-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-600 mb-2">Message</label>
                <textarea name="message" id="message" rows="5" required value={formData.message} onChange={handleChange} className="w-full p-3 bg-white border border-zinc-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"></textarea>
              </div>
              <div>
                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg">
                  {isLoading ? <Loader2 className="animate-spin" size={24}/> : <Send size={20} />}
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
              {status.message && (
                <p className={`mt-4 text-center text-sm p-3 rounded-lg ${
                  status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {status.message}
                </p>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
