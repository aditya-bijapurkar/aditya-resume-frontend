import React, {useState} from 'react';
import ScheduleModal from '../components/ScheduleModal';
import './Pages.css';
import Notification from '../components/Notification';
import { NotificationInterface } from '../components/props/NotificationInterface';

const Home: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationInterface>({
    message: '',
    type: 'info',
    isVisible: true
  });

  const handleScheduleCall = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const showNotification = () => {
    return (
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification({...notification, isVisible: false})}
      />
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Aditya Bijapurkar</h1>
        <p className="subtitle">Personal Portfolio Website</p>
      </div>

      {showNotification()}
      
      <div className="page-content">
        <div className="hero-section">
          <div className="hero-text">
            <h2>Hello, I'm Aditya</h2>
            <p>
            I'm a Backend developer with a passion for building scalable, reliable, and secure systems. <br/>
            With hands-on experience in Java Spring Boot and Python Django,<br/>
            I specialize in designing and developing microservices architectures that are both maintainable and efficient.
            </p>
            <h3>Schedule a 1-on-1 call with me</h3>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleScheduleCall}>Schedule a call</button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="/aditya-face.jpg" 
              alt="Aditya Bijapurkar" 
              className="profile-image"
            />
          </div>
        </div>
      </div>
      
      <ScheduleModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        setNotification={setNotification}
      />
      
      <div className="quick-stats">
        <div className="stat-card">
          <h3>1.5+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-card">
          <h3>10+</h3>
          <p>Microservices Experience</p>
        </div>
        <div className="stat-card">
          <h3>90%</h3>
          <p>API Optimisation</p>
        </div>
      </div> 
    </div>
  );
};

export default Home; 