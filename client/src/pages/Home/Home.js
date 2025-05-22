// src/pages/Home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">
        Maria Elheeb &amp; Yazan Dawud’s Portfolio
      </h1>
      <p className="home-subtitle">
        Select a profile below to view their work
      </p>

      <div className="profiles">
        <motion.div
          className="profile-card"
          onClick={() => navigate('/profile?user=maria')}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img src="/icon2.png" alt="Maria Elheeb" />
          <h3>Maria Elheeb</h3>
          <p>Fullstack Developer</p>
        </motion.div>

        <motion.div
          className="profile-card"
          onClick={() => navigate('/profile?user=yazan')}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img src="/icon1.png" alt="Yazan Dawud" />
          <h3>Yazan Dawud</h3>
          <p>Software Engineer</p>
        </motion.div>
      </div>
    </div>
  );
}
