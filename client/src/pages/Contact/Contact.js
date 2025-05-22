// src/pages/Contact/Contact.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', msg: '' });
    try {
      const res = await fetch('http://localhost:5000/api/portfolio/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setStatus({ type: 'success', msg: 'Message sent successfully!' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to send message. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Typography variant="h3" className="contact-title" gutterBottom>
        Get in Touch
      </Typography>
      <Typography variant="body1" className="contact-subtitle" gutterBottom>
        Have a project or question? Fill out the form below.
      </Typography>

      {status.msg && (
        <Alert severity={status.type} className="contact-alert">
          {status.msg}
        </Alert>
      )}

      <Box
        component="form"
        className="contact-form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          className="contact-input"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
          className="contact-input"
        />
        <TextField
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          fullWidth
          className="contact-input"
        />
        <TextField
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          className="contact-input"
        />
        <Button
          type="submit"
          variant="contained"
          className="contact-button"
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </Button>
      </Box>
    </motion.div>
  );
}
