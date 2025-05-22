// client/src/pages/About/About.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './About.css';

export default function About() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const user = new URLSearchParams(search).get('user'); // 'maria' or 'yazan'

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/about')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="about-container">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  const profile = aboutData.find(item => item.owner === user);

  if (!profile) {
    return (
      <div className="about-container">
        <p className="error">No “About” info found for “{user}”.</p>
      </div>
    );
  }

  const {
    name,
    role,
    location,
    bio,
    education,
    experience,
    skills,
    social,
    contact
  } = profile.about;

  return (
    <div className="about-container">
      <h1>{name}</h1>
      <p className="role">{role}</p>
      <p className="location">{location}</p>
      <p className="bio">{bio}</p>

      <section>
        <h2>Education</h2>
        <ul>
          {education.map((ed, i) => (
            <li key={i}>
              <strong>{ed.institution}</strong> — {ed.degree} ({ed.years})
              {ed.notes && <p className="notes">{ed.notes}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        <ul>
          {experience.map((exp, i) => (
            <li key={i}>
              <strong>{exp.company || exp.project}</strong> — {exp.role} ({exp.years})
              <p>{exp.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <p>{skills.join(', ')}</p>
      </section>

      <section>
        <h2>Connect</h2>
        <ul className="social-list">
          {social.github && (
            <li>
              <a href={social.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          )}
          {social.linkedin && (
            <li>
              <a href={social.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          )}
          {social.website && (
            <li>
              <a href={social.website} target="_blank" rel="noreferrer">
                Website
              </a>
            </li>
          )}
        </ul>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </section>
    </div>
  );
}
