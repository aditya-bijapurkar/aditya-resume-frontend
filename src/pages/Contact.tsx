import React, { useState } from 'react';
import { useRecaptcha, RECAPTCHA_ACTIONS } from '../services/recaptchaService';
import './Pages.css';
import { emailService, ContactFormData } from '../services/emailService';

const Contact: React.FC = () => {
  const { executeRecaptcha, isRecaptchaAvailable } = useRecaptcha();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    emailId: '',
    subject: '',
    text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMailSuccess = () => {
    setSubmitStatus({ type: 'success', message: 'Thank you for your mail! I will get back to you soon.' });
    setTimeout(() => {
      setSubmitStatus({ type: null, message: '' });
    }, 5000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      if (!isRecaptchaAvailable) {
        throw new Error('ReCaptcha verification failed. Please refresh the page and try again.');
      }
      
      const token = await executeRecaptcha(RECAPTCHA_ACTIONS.CONTACT_FORM);
      
      await emailService.sendContactEmail(formData, token);
      handleMailSuccess();
      
      setFormData({
        name: '',
        emailId: '',
        subject: '',
        text: ''
      });
    } 
    catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      });
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Get In Touch</h1>
        <p className="subtitle">Please feel free to reach out to me for any questions or collaborations.</p>
      </div>
      
      <div className="page-content">
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Personal Email</h4>
                <p>adityabijapurkar@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <h4>Phone</h4>
                <p>+91 6301930425</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">⚒️</span>
              <div>
                <h4>Leetcode</h4>
                <a href="https://leetcode.com/u/adityabijapurkar/" target='_blank'><p>https://leetcode.com/u/adityabijapurkar/</p></a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">💼</span>
              <div>
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/aditya-bijapurkar/" target='_blank'><p>https://www.linkedin.com/in/aditya-bijapurkar/</p></a>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">🐙</span>
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/aditya-bijapurkar" target='_blank'><p>https://github.com/aditya-bijapurkar</p></a>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>Bengaluru, Karnataka, India</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send Me a Mail</h3>
            <small>You will recieve a copy mail for the same from the system!</small>
            
            {submitStatus.type && (
              <div className={`status-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="text"
                  style={{ fontSize: '16px' }}
                  value={formData.text}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Mail'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 