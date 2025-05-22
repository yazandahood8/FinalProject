const express = require('express');
const router = express.Router();
const {
  getProjects,
  getContactInfo,
  getAboutMe,
  getSkills,
  getProfile,
  getResume,
  getCaseStudies
} = require('../controllers/portfolioController');

// Routes
router.get('/projects', getProjects);
router.get('/contact', getContactInfo);
router.get('/about', getAboutMe);
router.get('/skills', getSkills);
router.get('/profile', getProfile);
router.get('/resume', getResume);
router.get('/casestudies', getCaseStudies);

module.exports = router;
