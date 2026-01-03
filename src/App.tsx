import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Layout from './components/Layout';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Cost from './pages/Cost';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import './css/App.css';
import { resumeService } from './services/resumeService';
import { NotificationInterface } from './components/props/NotificationInterface';
import Notification from './components/Notification';
import ScheduleModal from './components/ScheduleModal';
import ChatModal from './components/ChatModal';
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

interface ThemeToggleProps {
  disabled: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ disabled }) => {
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
    if (disabled) return;
    setTheme(!isDark ? 'dark' : 'light');
  };

  return (
    <div className="action-button-wrapper">
      <button className="action-button" onClick={toggleTheme} aria-label="Toggle theme" disabled={disabled}>
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
      <p className="action-text">Theme</p>
    </div>
  );
};

interface ChatButtonProps {
  onOpenChat: () => void;
  disabled: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onOpenChat, disabled }) => {
  return (
    <div className="action-button-wrapper">
      <button className="action-button" onClick={onOpenChat} disabled={disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418-4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      <p className="action-text">Chat</p>
    </div>
  );
};
interface DownloadResumeProps {
  disabled: boolean;
  onDownloadResume: () => void;
}

const DownloadResume: React.FC<DownloadResumeProps> = ({ onDownloadResume, disabled }) => {
  return (
    <div className="action-button-wrapper">
      <button className="action-button" onClick={onDownloadResume} aria-label="Download Resume" disabled={disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>
      <p className="action-text">Resume</p>
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const [notification, setNotification] = useState<NotificationInterface>({} as NotificationInterface);

  const showNotification = () => {
    return (
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification({...notification, isVisible: false})}  
        duration={notification.duration || 5000}
      />
    )
  }

  const handleOpenSchedule = () => {
    setIsScheduleModalOpen(true);
  };

  const handleCloseSchedule = () => {
    setIsScheduleModalOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
  };

  const getResumeDownloadDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0].replaceAll('-', '_');
  }

  const handleDownloadResume = async () => {
    try {
      const resumeData = await resumeService.getResume();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(resumeData);
      link.download = `Aditya_Bijapurkar_Resume_${getResumeDownloadDate()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      setNotification({message: 'Resume downloaded successfully!', type: 'success', isVisible: true});
    }
    catch (error) {
      setNotification({message: 'Some error occurred while downloading resume. Sorry for the inconvenience!', type: 'error', isVisible: true});
    }
  };

  const shouldShowChatButton = location.pathname !== "/";
  const shouldShowDownloadResumeButton = location.pathname !== "/";

  return (
    <>
      {showNotification()}
      <div className="App">
        <div className={`action-buttons-container ${(isScheduleModalOpen || isChatModalOpen) ? 'modal-open' : ''}`}>
          <ThemeToggle disabled={isScheduleModalOpen || isChatModalOpen} />
          {shouldShowChatButton && <ChatButton onOpenChat={handleOpenChat} disabled={(isScheduleModalOpen || isChatModalOpen)} />}
          {shouldShowDownloadResumeButton && <DownloadResume onDownloadResume={handleDownloadResume} disabled={(isScheduleModalOpen || isChatModalOpen)} />}
        </div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home onOpenSchedule={handleOpenSchedule} onOpenChat={handleOpenChat} onDownloadResume={handleDownloadResume} />} />
            <Route path="details" element={<Overview />} />
            <Route path="cost" element={<Cost />} />
            <Route path="experience" element={<Experience />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
        {isScheduleModalOpen && <ScheduleModal isOpen={isScheduleModalOpen} onClose={handleCloseSchedule} setNotification={setNotification} />}
        {isChatModalOpen && <ChatModal isOpen={isChatModalOpen} onClose={handleCloseChat} setNotification={setNotification} />}
      </div>
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