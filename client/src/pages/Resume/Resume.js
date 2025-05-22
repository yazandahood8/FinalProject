import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import './Resume.css';

function Section({ title, children, delay }) {
  return (
    <motion.section
      className="resume-section"
      data-title={title}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <Typography variant="h5" className="section-title">
        {title}
      </Typography>
      {children}
    </motion.section>
  );
}

export default function Resume() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const user = new URLSearchParams(search).get('user');

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/resume')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box className="resume-page">
        <Typography variant="h5" align="center" className="loading-text">
          Loading resume…
        </Typography>
      </Box>
    );
  }

  const entry = data.find(item => item.owner === user);
  if (!entry) return <Navigate to="/" replace />;

  const { summary, downloadUrl, education, experience, skills, certifications, awards, volunteerExperience, publications, references, interests } = entry.resume;

  return (
    <Box className="resume-page">
      <motion.div
        className="resume-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" className="resume-title">
          {entry.owner.charAt(0).toUpperCase() + entry.owner.slice(1)}'s Resume
        </Typography>
        <Typography variant="body1" className="resume-summary">
          {summary}
        </Typography>
        {downloadUrl && (
          <Button variant="contained" className="download-btn" href={downloadUrl} target="_blank">
            Download PDF
          </Button>
        )}
      </motion.div>

      <Divider className="resume-divider" />

      <Section title="Education" delay={0.4}>
        <List>
          {education.map((ed, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText
                primary={`${ed.degree}, ${ed.institution}`}
                secondary={`${ed.startDate} – ${ed.endDate}${ed.fieldOfStudy ? ` • ${ed.fieldOfStudy}` : ''}`}
              />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Experience" delay={0.6}>
        <List className="experience-list">
          {experience.map((exp, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText
                primary={`${exp.role} at ${exp.company || exp.project}`}
                secondary={`${exp.startDate} – ${exp.endDate}`}
              />
              <Box className="exp-details">
                {exp.responsibilities.map((r, j) => (
                  <Typography key={j} variant="body2" className="detail-item">
                    • {r}
                  </Typography>
                ))}
              </Box>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Skills" delay={0.8}>
        <List className="inline-list">
          {skills.map((skill, i) => (
            <ListItem key={i} className="skill-tag">
              <Typography variant="body2">{skill}</Typography>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Certifications" delay={1.0}>
        <List>
          {certifications.map((c, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText primary={`${c.name} • ${c.issuer}`} secondary={c.date} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Awards" delay={1.2}>
        <List>
          {awards.map((a, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText primary={a.title} secondary={a.date} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Volunteer Experience" delay={1.4}>
        <List className="volunteer-list">
          {volunteerExperience.map((v, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText primary={`${v.role} at ${v.organization}`} secondary={v.date} />
              <Typography variant="body2" className="detail-item">
                {v.description}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Publications" delay={1.6}>
        <List className="list-item">
          {publications.map((p, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText primary={p.title} secondary={`${p.publisher} • ${p.date}`} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="References" delay={1.8}>
        <List>
          {references.map((r, i) => (
            <ListItem key={i} className="list-item">
              <ListItemText primary={`${r.name} • ${r.relationship}`} secondary={r.contact} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Interests" delay={2.0}>
        <List className="inline-list">
          {interests.map((int, i) => (
            <ListItem key={i} className="skill-tag">
              <Typography variant="body2">{int}</Typography>
            </ListItem>
          ))}
        </List>
      </Section>
    </Box>
  );
}
