// client/src/pages/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Profile.css';

function Section({ title, delay, children }) {
  return (
    <motion.section
      className="profile-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <h2>{title}</h2>
      {children}
    </motion.section>
  );
}

export default function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { search } = useLocation();
  const user = new URLSearchParams(search).get('user');

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/profile')
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setProfiles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="profile-container"><div className="skeleton">Loading profile…</div></div>;
  }
  if (error) {
    return <div className="profile-container"><p className="profile-error">Error: {error}</p></div>;
  }

  const entry = profiles.find(p => p.owner === user);
  if (!entry) return <Navigate to="/" replace />;

  const {
    personal,
    education,
    experience,
    projects,
    skills,
    certifications,
    awards,
    volunteerExperience,
    openSourceContributions,
    publications,
    references,
    interests
  } = entry.profile;

  return (
    <div className="profile-container">
      <motion.header
        className="profile-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={personal.photoUrl} alt={personal.fullName} className="profile-photo" />
        <div className="profile-meta">
          <h1 className="profile-name">{personal.fullName}</h1>
          <p className="profile-title">{personal.title}</p>
          <p className="profile-location">{personal.location}</p>
          <p className="profile-summary">{personal.summary}</p>
          <div className="profile-contact">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href={`tel:${personal.phone}`}>{personal.phone}</a>
          </div>
          <div className="profile-social">
            {personal.website && <a href={personal.website}>Website</a>}
            {personal.linkedIn && <a href={personal.linkedIn}>LinkedIn</a>}
            {personal.github && <a href={personal.github}>GitHub</a>}
          </div>
        </div>
      </motion.header>

      <Section title="Education" delay={0.4}>
        <ul>
          {education.map((ed,i) => (
            <li key={i}>
              <strong>{ed.institution}</strong> — {ed.degree} ({ed.startDate}–{ed.endDate})
              {ed.fieldOfStudy && `, ${ed.fieldOfStudy}`}<br/>
              {ed.gpa && <em>GPA: {ed.gpa}</em>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Experience" delay={0.6}>
        <ul>
          {experience.map((exp,i) => (
            <li key={i}>
              <strong>{exp.company||exp.project}</strong> — {exp.role} ({exp.startDate}–{exp.endDate})
              <ul className="nested-list">
                {exp.responsibilities.map((r,j) => <li key={j}>{r}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Projects" delay={0.8}>
        <ul>
          {projects.map((p,i) => (
            <li key={i}>
              <strong>
                {p.url 
                  ? <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
                  : p.name}
              </strong> — {p.role}
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills" delay={1.0}>
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat}>
            <h3 className="subheading">{cat}</h3>
            <ul className="inline-list">
              {list.map((s,i) =>
                typeof s === 'string'
                  ? <li key={i}>{s}</li>
                  : <li key={i}>{s.name} ({s.level}%)</li>
              )}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Certifications" delay={1.2}>
        <ul>{certifications.map((c,i) => <li key={i}>{c.name} — {c.issuer} ({c.date})</li>)}</ul>
      </Section>

      <Section title="Awards" delay={1.4}>
        <ul>{awards.map((a,i) => <li key={i}>{a.title} — {a.date}</li>)}</ul>
      </Section>

      <Section title="Volunteer" delay={1.6}>
        <ul>{volunteerExperience.map((v,i) => <li key={i}>{v.organization} — {v.role}</li>)}</ul>
      </Section>

      <Section title="Open Source" delay={1.8}>
        <ul>{openSourceContributions.map((o,i) => <li key={i}>{o.repo} — {o.contributions} PRs</li>)}</ul>
      </Section>

      <Section title="Publications" delay={2.0}>
        <ul>{publications.map((p,i) => <li key={i}>{p.title} — {p.publisher}</li>)}</ul>
      </Section>

      <Section title="References" delay={2.2}>
        <ul>{references.map((r,i) => <li key={i}>{r.name} — {r.relationship}</li>)}</ul>
      </Section>

      <Section title="Interests" delay={2.4}>
        <ul className="inline-list">{interests.map((int,i) => <li key={i}>{int}</li>)}</ul>
      </Section>
    </div>
  );
}
