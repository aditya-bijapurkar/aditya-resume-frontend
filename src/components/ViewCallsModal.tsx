import React, { useEffect, useState, useRef, useCallback } from "react";
import { scheduleService } from "../services/scheduleService";
import { NotificationInterface } from "./props/NotificationInterface";
import './css/ViewCallsModal.css';

interface ViewCallsModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNotification: (notification: NotificationInterface) => void;
}

const BackButtonIcon = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  );
});
    
const SignUpForm = React.memo(({ setUsername, setEmail, setPassword, isSubmitting, handleSubmit }: { setUsername: (username: string) => void, setEmail: (email: string) => void, setPassword: (password: string) => void, isSubmitting: boolean, handleSubmit: (e: React.FormEvent) => void }) => {
  return (
    <div className="view-calls-auth-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="view-calls-form-group">
          <label htmlFor="auth-username">Username</label>
          <input type="text" id="auth-username" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required disabled={isSubmitting} />
        </div>
        <div className="view-calls-form-group">
          <label htmlFor="auth-email">Email</label>
          <input type="email" id="auth-email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required disabled={isSubmitting} />
        </div>
        <div className="view-calls-form-group">
          <label htmlFor="auth-password">Password</label>
          <input type="password" id="auth-password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required disabled={isSubmitting} minLength={6} />
        </div>
        <div className="view-calls-auth-form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Sign Up'}</button>
        </div>
      </form>
    </div>
  );
});

const LoginForm = React.memo(({ setEmail, setPassword, isSubmitting, handleSubmit }: { setEmail: (email: string) => void, setPassword: (password: string) => void, isSubmitting: boolean, handleSubmit: (e: React.FormEvent) => void }) => {
  return (
    <div className="view-calls-auth-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="view-calls-form-group">
          <label htmlFor="auth-email">Email</label>
          <input type="email" id="auth-email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required disabled={isSubmitting} />
        </div>
        <div className="view-calls-form-group">
          <label htmlFor="auth-password">Password</label>
          <input type="password" id="auth-password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required disabled={isSubmitting} minLength={6} />
        </div>
        <div className="view-calls-auth-form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
});

const ViewCallsModal: React.FC<ViewCallsModalProps> = ({ isOpen, onClose, setNotification }) => {

  const [calls, setCalls] = useState<any[]>([]);
  const [loadingCalls, setLoadingCalls] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState<'signup' | 'login' | null>(null);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasCheckedAuth = useRef(false);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info', duration?: number) => {
    setNotification({ message, type, isVisible: true, duration });
  }, [setNotification]);

  const closeModal = () => {
    setShowAuthForm(null);
    setEmail('');
    setPassword('');
    onClose();
  };

  const resetSubmitForm = () => {
    setShowAuthForm(null);
    setEmail('');
    setPassword('');
    setUsername('');
    setIsSubmitting(false);
  };

  const handleBackToOptions = () => {
    setShowAuthForm(null);
  };

  const fetchScheduledCalls = useCallback(async () => {
    setLoadingCalls(true);
    try {
      const response = await scheduleService.getScheduledCalls();
      const scheduledCalls = response.scheduledCalls || [];
      const success = response.success;

      if (success) {
        setCalls(scheduledCalls);
      }
      else {
        showNotification(response.message || 'Error fetching scheduled calls. Please try again.', 'error');
      }
    }
    catch (error) {
      showNotification('An error occurred while fetching scheduled calls. Please try again.', 'error');
    }
    finally {
      setLoadingCalls(false);
    }
  }, [showNotification]);

  const checkUserLoggedIn = useCallback(async () => {
    const loggedInUserDetails = await scheduleService.isUserLoggedIn();
    
    if (loggedInUserDetails) {
      setIsUserLoggedIn(true);
      setUsername(loggedInUserDetails.username);
      fetchScheduledCalls();
    }
    else {
      setIsUserLoggedIn(false);
      setUsername('');
    }
  }, [fetchScheduledCalls]);

  useEffect(() => {
    if (!isOpen) {
      hasCheckedAuth.current = false;
      return;
    }

    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkUserLoggedIn();
    }
  }, [isOpen, checkUserLoggedIn]);
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
        const result = await scheduleService.signup({ username, email, password });
        if (result.success) {
        showNotification('Sign up successful! Verify your account by clicking the link in the email sent to you.', 'success', 10000);
        } else {
            showNotification(result.message, 'error');
        }
    }
    catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    }
    finally {
      setIsSubmitting(false);
      resetSubmitForm();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showNotification('Please fill in all fields', 'error');
      return;
    }   

    setIsSubmitting(true);
    try {
      const result = await scheduleService.login({ email, password });
      if (result.success) {
        showNotification('Login successful!', 'success');
        checkUserLoggedIn();
      } else {
        showNotification(result.message || 'Error logging in. Please try again.', 'error');
      }
    }
    catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    }
    finally {
      setIsSubmitting(false);
      resetSubmitForm();
    }
  };

  const handleLogout = async () => {
    await scheduleService.logout();
    checkUserLoggedIn(); 
    showNotification('Logged out successfully!', 'success');
  };

  if (!isOpen) return null;

  return (
    <>
    {isUserLoggedIn ? (
        <div className="view-calls-modal-overlay" onClick={closeModal}>
            <div className={`view-calls-modal-content ${calls && calls.length > 0 ? 'view-calls-modal-content-with-table' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="view-calls-modal-header">
                    <div>
                        <h2>Hello {username}</h2>
                        <p>Here are your scheduled calls.</p>
                    </div>
                    <button className="view-calls-modal-close-button" onClick={closeModal}>×</button>
                </div>
                <div className="view-calls-modal-body">
                    {loadingCalls 
                        ? (<div className="view-calls-modal-loading">Loading your scheduled calls...</div>) 
                        : calls && calls.length > 0 
                            ? (
                                <div className="view-calls-table-container">
                                    <table className="view-calls-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Platform</th>
                                                <th>Link</th>
                                                <th>Password</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {calls.map((call, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(call.scheduledAt).toLocaleDateString()}</td>
                                                    <td>{call.description}</td>
                                                    <td>{call.meetPlatform}</td>
                                                    <td>
                                                        {call.meetLink ? (
                                                            <a href={call.meetLink} target="_blank" rel="noopener noreferrer" className="view-calls-link">
                                                                Join Meeting
                                                            </a>
                                                        ) : (
                                                            <span className="view-calls-no-link">-</span>
                                                        )}
                                                    </td>
                                                    <td>{call.meetPassword || '-'}</td>
                                                    <td>
                                                        <span className={`view-calls-status view-calls-status-${call.status}`}>
                                                            {call.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : (
                                <div className="view-calls-empty-state">
                                    <h3>No scheduled calls found</h3>
                                    <p>You have not scheduled any calls yet. Schedule a call to get started.</p>
                                </div>
                            )
                    }
                </div>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    ) : (
        <div className="view-calls-modal-overlay" onClick={closeModal}>
            <div className="view-calls-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="view-calls-modal-header">
                    <h2>Please login to view your calls</h2>
                    <button className="view-calls-modal-close-button" onClick={closeModal}>×</button>
                </div>
                <div className="view-calls-modal-body">
                    {!showAuthForm ? (
                        <div className="view-calls-auth-prompt">
                            <p className="view-calls-auth-message">You need to be logged in to view your scheduled calls.</p>
                            <p className="view-calls-auth-submessage">Sign up for a new account or login to your existing account to continue.</p>
                            <div className="view-calls-auth-buttons">
                                <button className="btn btn-primary" onClick={() => setShowAuthForm('signup')}>
                                    Sign Up
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowAuthForm('login')}>
                                    Login
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="view-calls-auth-container">
                            <div className="view-calls-auth-form-header">
                                <h3>{showAuthForm === 'signup' ? 'Create Account' : 'Login'}</h3>
                                <button 
                                    className="view-calls-auth-back-button" 
                                    onClick={handleBackToOptions}
                                    type="button"
                                >
                                    <BackButtonIcon />
                                </button>
                            </div>
                            {showAuthForm === 'signup'
                            ? (<SignUpForm setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} isSubmitting={isSubmitting} handleSubmit={handleSignup} />) 
                            : (<LoginForm setEmail={setEmail} setPassword={setPassword} isSubmitting={isSubmitting} handleSubmit={handleLogin} />)
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )}
    </>
  );
};

export default ViewCallsModal;