// src/App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Resume from './pages/Resume/Resume';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Timeline from './pages/Timeline/Timeline';
import CaseStudies from './pages/CaseStudies/CaseStudies';
 import Chatbot from './components/Chatbot/Chatbot';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppLayout() {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <>
            {/* Hide header on home page */}
            {!isHome && <Header />}

            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/casestudies" element={<CaseStudies />} />

                </Routes>
            </main>
          <Chatbot />

            {/* Footer always shown */}
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}
