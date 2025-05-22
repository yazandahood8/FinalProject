const projects = require('../data/projects.json');
const contact = require('../data/contact.json');
const about = require('../data/about.json');
const skills = require('../data/skills.json');
const profile = require('../data/profile.json');
const resume = require('../data/resume.json');
const casestudies = require('../data/casestudies.json');

exports.getProjects = (req, res) => {
  res.json(projects);
};

exports.getContactInfo = (req, res) => {
  res.json(contact);
};

exports.getAboutMe = (req, res) => {
  res.json(about);
};

exports.getSkills = (req, res) => {
  res.json(skills);
};

exports.getProfile = (req, res) => {
  res.json(profile);
};
exports.getResume = (req, res) => {
  res.json(resume);
};
exports.getCaseStudies = (req, res) => {
  res.json(casestudies);
};


