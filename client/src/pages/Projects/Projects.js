// src/pages/Projects/Projects.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterOwner, setFilterOwner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openProj, setOpenProj] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedUser = queryParams.get('user');

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let data = [...projects];
    if (selectedUser) {
      data = data.filter((p) => p.owner === selectedUser);
      setFilterOwner(selectedUser);
    } else if (filterOwner) {
      data = data.filter((p) => p.owner === filterOwner);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter((p) => p.title.toLowerCase().includes(term));
    }
    setFiltered(data);
  }, [projects, selectedUser, filterOwner, searchTerm]);

  const handleOpen = (proj) => setOpenProj(proj);
  const handleClose = () => setOpenProj(null);

  return (
    <Box className="projects-container">
      <Typography variant="h3" align="center" gutterBottom className="projects-title">
        Projects
      </Typography>

      <Box className="projects-filters">
        {['all', 'maria', 'yazan'].map((owner) => (
          <Chip
            key={owner}
            label={owner === 'all' ? 'All' : owner.charAt(0).toUpperCase() + owner.slice(1)}
            clickable
            color={filterOwner === owner || (!filterOwner && owner === 'all') ? 'primary' : 'default'}
            onClick={() => setFilterOwner(owner === 'all' ? null : owner)}
          />
        ))}
        <TextField
          placeholder="Search by title..."
          variant="outlined"
          size="small"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {filtered.length === 0 ? (
        <Typography variant="body1" align="center" className="no-projects">
          No projects found{filterOwner ? ` for ${filterOwner}` : ''}.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filtered.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="project-card" onClick={() => handleOpen(p)}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom className="project-title">
                      {p.title}
                    </Typography>
                    <Typography variant="subtitle2" className="project-owner">
                      {p.owner.charAt(0).toUpperCase() + p.owner.slice(1)}
                    </Typography>
                    <Typography variant="body2" paragraph className="project-desc">
                      {p.description}
                    </Typography>
                    <Button variant="outlined" className="project-button">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Detail Dialog */}
      {openProj && (
        <Dialog open onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {openProj.title}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Role: {openProj.role}
            </Typography>

            <Typography variant="body1" paragraph>
              {openProj.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Technologies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {openProj.technologies.map((tech) => (
                <Chip key={tech} label={tech} variant="outlined" />
              ))}
            </Box>

            <Typography variant="h6">Features</Typography>
            <List dense>
              {openProj.features.map((feat, i) => (
                <ListItem key={i}>
                  <ListItemText primary={feat} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" mt={2}>Responsibilities</Typography>
            <List dense>
              {openProj.responsibilities.map((resp, i) => (
                <ListItem key={i}>
                  <ListItemText primary={resp} />
                </ListItem>
              ))}
            </List>

            {openProj.metrics && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Metrics</Typography>
                <List dense>
                  {Object.entries(openProj.metrics).map(([k, v]) => (
                    <ListItem key={k}>
                      <ListItemText primary={`${k}: ${v}`} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </DialogContent>

          <DialogActions>
            {openProj.liveDemo && (
              <Button href={openProj.liveDemo} target="_blank">Live Demo</Button>
            )}
            {openProj.repoLink && (
              <Button href={openProj.repoLink} target="_blank">Source Code</Button>
            )}
            <Button onClick={handleClose} color="secondary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
