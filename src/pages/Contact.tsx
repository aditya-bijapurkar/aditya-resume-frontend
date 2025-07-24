import React, { useState } from 'react';
import './Pages.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Get In Touch</h1>
        <p className="subtitle">Let's work together on your next project</p>
      </div>
      
      <div className="page-content">
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>your.email@example.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Location</h4>
                <p>City, State, Country</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">💼</span>
              <div>
                <h4>LinkedIn</h4>
                <p>linkedin.com/in/yourprofile</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">🐙</span>
              <div>
                <h4>GitHub</h4>
                <p>github.com/yourusername</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send Me a Message</h3>
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
                  name="email"
                  value={formData.email}
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 