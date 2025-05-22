import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import './CaseStudies.css';

export default function CaseStudies() {
  const [studies, setStudies] = useState([]);
  const [open, setOpen] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio/casestudies')
      .then(res => res.json())
      .then(data => setStudies(data))
      .catch(console.error);
  }, []);

  const steps = ['Goals', 'Process', 'Challenges', 'Results', 'Visuals'];

  const handleOpen = study => {
    setOpen(study);
    setStep(0);
  };
  const handleClose = () => setOpen(null);
  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <Box className="casestudies-page">
      <Typography variant="h3" className="cs-title" align="center">
        Case Studies
      </Typography>
      <Grid container spacing={4}>
        {studies.map(study => (
          <Grid item xs={12} sm={6} md={4} key={study.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="cs-card" onClick={() => handleOpen(study)}>
                {study.coverImage && (
                  <CardMedia
                    component="img"
                    image={study.coverImage}
                    alt={study.title}
                    className="cs-cover"
                  />
                )}
                <CardContent>
                  <Typography variant="h5" className="cs-card-title">
                    {study.title}
                  </Typography>
                  <Typography variant="body2" className="cs-summary">
                    {study.summary}
                  </Typography>
                  <Box className="cs-metrics">
                    {study.metrics &&
                      Object.entries(study.metrics).map(([k, v]) => (
                        <Typography key={k} variant="caption">
                          {k}: {v}
                        </Typography>
                      ))}
                  </Box>
                  <Button variant="outlined" className="cs-button">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {open && (
        <Dialog open fullWidth maxWidth="md" onClose={handleClose} className="cs-dialog">
          <DialogTitle>
            {open.title}
            <IconButton className="cs-close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {/* Stepper Indicators */}
            <Box className="cs-stepper">
              {steps.map((label, idx) => (
                <Box
                  key={label}
                  className={`cs-step ${idx <= step ? 'active' : ''}`}
                />
              ))}
            </Box>

            {/* Content */}
            {step < 4 ? (
              <>
                <Typography variant="h6">{steps[step]}</Typography>
                <Typography variant="body2" paragraph>
                  {open[steps[step].toLowerCase()]}
                </Typography>
              </>
            ) : (
              <>
                <Divider className="cs-divider" />
                <Typography variant="h6" className="cs-subtitle">
                  Visuals
                </Typography>
                <Grid container spacing={2}>
                  {open.visuals.map((url, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <img
                        src={url}
                        alt={`Visual ${i + 1}`}
                        className="cs-visual"
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </DialogContent>

          <DialogActions className="cs-actions">
            <Button disabled={step === 0} onClick={prevStep}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <>
                {open.pdf && (
                  <Button href={open.pdf} target="_blank">
                    Download PDF
                  </Button>
                )}
                <Button color="secondary" onClick={handleClose}>
                  Close
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
