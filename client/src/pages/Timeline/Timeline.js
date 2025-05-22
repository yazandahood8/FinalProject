import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import './Timeline.css';

export default function Timeline() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const user = new URLSearchParams(search).get('user');

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/resume')
      .then(res => res.json())
      .then(resumes => {
        const entry = resumes.find(r => r.owner === user);
        if (!entry) {
          setEvents([]);
        } else {
          const { education, experience, awards, volunteerExperience, publications } = entry.resume;
          const items = [
            ...education.map(e => ({ type: 'Education', title: `${e.degree} @ ${e.institution}`, date: e.startDate, details: e.fieldOfStudy || '' })),
            ...experience.map(e => ({ type: 'Experience', title: `${e.role} @ ${e.company || e.project}`, date: e.startDate, details: e.responsibilities.join('; ') })),
            ...awards.map(a => ({ type: 'Award', title: a.title, date: a.date, details: a.description })),
            ...volunteerExperience.map(v => ({ type: 'Volunteer', title: `${v.role} @ ${v.organization}`, date: v.date, details: v.description })),
            ...publications.map(p => ({ type: 'Publication', title: p.title, date: p.date, details: p.publisher })),
          ];
          items.sort((a,b) => new Date(a.date) - new Date(b.date));
          setEvents(items);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Box className="timeline-page"><Typography>Loading timeline…</Typography></Box>;
  }
  if (!events.length) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box className="timeline-page">
      <Typography variant="h3" className="timeline-title">
        {user?.charAt(0).toUpperCase() + user?.slice(1)}’s Timeline
      </Typography>
      <Box className="timeline-container">
        {events.map((ev, idx) => (
          <motion.div
            key={idx}
            className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <Typography variant="subtitle2" className="timeline-date">
              {ev.date}
            </Typography>
            <Typography variant="h6" className="timeline-type">
              {ev.type}
            </Typography>
            <Typography variant="subtitle1" className="timeline-title">
              {ev.title}
            </Typography>
            <Typography variant="body2" className="timeline-details">
              {ev.details}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}