import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

// Updated to use Gemini Flash model
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.0-flash:generateMessage';
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! I can answer questions about Maria & Yazan.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [kb, setKb] = useState(null);
  const scrollRef = useRef();

  // Load knowledge base from JSON endpoints
  useEffect(() => {
    async function fetchKb() {
      try {
        const [projects, skills, resume, cases, timeline, profile] = await Promise.all([
          fetch('/api/portfolio/projects').then(r => r.json()),
          fetch('/api/portfolio/skills').then(r => r.json()),
          fetch('/api/portfolio/resume').then(r => r.json()),
          fetch('/api/portfolio/casestudies').then(r => r.json()),
          fetch('/api/portfolio/resume').then(r => r.json()), // reuse resume for timeline
          fetch('/api/portfolio/profile').then(r => r.json())
        ]);
        setKb({ projects, skills, resume, cases, timeline, profile });
      } catch (e) {
        console.error('KB load error', e);
      }
    }
    fetchKb();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const toggleOpen = () => setOpen(o => !o);

  const sendMessage = async () => {
    if (!input.trim() || loading || !kb) return;
    const userMsg = input.trim();
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const systemPrompt = `You are a knowledgeable assistant about Maria & Yazan. Use this data: ${JSON.stringify(
        kb
      )}`;
      const payload = {
        model: 'gemini-2.0-flash',
        prompt: { messages: [
          { author: 'system', content: systemPrompt },
          ...messages.map(m => ({ author: m.from === 'bot' ? 'assistant' : 'user', content: m.text })),
          { author: 'user', content: userMsg }
        ] }
      };
      const res = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const botReply = data?.candidates?.[0]?.content || 'Sorry, I could not respond.';
      setMessages(msgs => [...msgs, { from: 'bot', text: botReply }]);
    } catch (e) {
      console.error(e);
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Error connecting to the API.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="chatbot-container">
      <IconButton className="chatbot-toggle" onClick={toggleOpen}>
        {open ? <CloseIcon /> : <ChatIcon />}
      </IconButton>
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Typography className="chatbot-header">Chat with Maria & Yazan</Typography>
            <Box className="chatbot-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <Box
                  key={i}
                  className={`chatbot-message ${m.from}`}>
                  {m.text}
                </Box>
              ))}
              {loading && <CircularProgress size={20} className="chatbot-loading" />}
            </Box>
            <Box className="chatbot-input-area">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="chatbot-input"
              />
              <Button variant="contained" onClick={sendMessage} disabled={loading || !kb}>
                Send
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
