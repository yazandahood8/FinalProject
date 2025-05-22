import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-area bg-dark text-white pt-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>Maria Elheeb</h5>
            <p>Fullstack Developer | React, Node.js</p>
            <a href="https://github.com/maria" target="_blank" rel="noreferrer">GitHub</a> |
            <a href="mailto:maria@example.com" className="ms-2">Email</a>
          </div>
          <div className="col-md-6 mb-3">
            <h5>Yazan Dawud</h5>
            <p>Software Engineer | JavaScript, Express</p>
            <a href="https://github.com/yazandahood8" target="_blank" rel="noreferrer">GitHub</a> |
            <a href="mailto:yazan@example.com" className="ms-2">Email</a>
          </div>
        </div>
        <p className="mt-3 mb-1 small">&copy; {new Date().getFullYear()} Maria Elheeb & Yazan Dawud. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
