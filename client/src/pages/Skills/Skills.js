// src/pages/Skills/Skills.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import './Skills.css';

function SkillBar({ name, level, index }) {
  return (
    <Box
      className="skill-bar"
      style={{ '--level': `${level}%`, '--delay': `${index * 0.15}s` }}
    >
      <Typography variant="body1" className="skill-name">
        {name}
      </Typography>
      <Box className="bar-bg">
        <Box className="bar-fill" />
      </Box>
      <Typography variant="body2" className="skill-level">
        {level}%
      </Typography>
    </Box>
  );
}

export default function Skills() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const user = new URLSearchParams(search).get('user');

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/skills')
      .then(res => res.json())
      .then(setSkillsData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box className="skills-page">
        <Typography variant="h5" align="center" className="loading-text">
          Loading skills…
        </Typography>
      </Box>
    );
  }

  const profile = skillsData.find(item => item.owner === user);
  if (!profile) {
    return (
      <Box className="skills-page">
        <Typography variant="h4" align="center" className="error-text">
          No skills found for “{user}”
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="skills-page">
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" align="center" className="skills-title">
          {profile.owner.charAt(0).toUpperCase() + profile.owner.slice(1)}’s Skills
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {profile.skills.map((section, si) => (
          <Grid item xs={12} sm={6} md={4} key={section.category}>
            <motion.section
              className="skills-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + si * 0.2, duration: 0.6 }}
            >
              <Typography variant="h5" className="skills-category">
                {section.category}
              </Typography>
              {section.skills.map((skill, idx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={idx}
                />
              ))}
            </motion.section>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
