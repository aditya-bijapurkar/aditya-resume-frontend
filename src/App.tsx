import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Layout from './components/Layout';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import './css/App.css';
import BuildDeploy from './pages/BuildDeploy';
import ChatModal from './components/ChatModal';

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const setTheme = (theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme);
    setIsDark(theme === 'dark');
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => { 
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(!isDark ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )
      }
    </button>
  );
};

const AppContent: React.FC = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const location = useLocation();

  const handleChatModal = () : React.ReactNode => {
    return (
      isChatModalOpen 
      ?  <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
        />
      : <p className="chat-text">AI Chatbot</p>
    )
  }

  const handleChat = () : React.ReactNode => {
    return (
      <div className="chat-button-container">
        <button className="chat-button" onClick={() => setIsChatModalOpen(!isChatModalOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418-4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        {handleChatModal()}
      </div>
    )
  }

  const shouldShowChatButton = location.pathname !== "/";

  return (
    <>
      <div className="App">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="details" element={<BuildDeploy />} />
            <Route path="experience" element={<Experience />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
      {shouldShowChatButton && handleChat()}
    </>
  );
};

function App() {
  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={RECAPTCHA_SITE_KEY || ''}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body'
      }}
    >
      <Router>
        <AppContent />
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;