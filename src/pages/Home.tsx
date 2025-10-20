import React, {useState} from 'react';
import ScheduleModal from '../components/ScheduleModal';
import ChatModal from '../components/ChatModal';
import './css/Pages.css';
import Notification from '../components/Notification';
import { NotificationInterface } from '../components/props/NotificationInterface';

const Home: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationInterface>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const handleScheduleCall = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenChat = () => {
    setIsChatOpen(true);
  }

  const handleCloseChat = () => {
    setIsChatOpen(false);
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

  const getYearsOfExperience = (startDate: string) : number => {
    const start = new Date(startDate);
    const now = new Date(); 
    
    let yearsExperienced = now.getFullYear() - start.getFullYear();
    let monthsExperienced = (now.getMonth() + 1) - (start.getMonth() + 1);

    if (monthsExperienced < 0) {
      monthsExperienced = monthsExperienced + 12;
      yearsExperienced = yearsExperienced - 1;
    }

    return parseFloat((yearsExperienced + (monthsExperienced / 12)).toFixed(1));
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
          <div className="hero-section-left">
            <h2>Hello,</h2>
            <p>
            I'm a Certified Kubernetes Application Developer with a passion for building scalable, reliable, and secure systems. <br/>
            With hands-on experience in Backend Development using Java Spring Boot and Python Django, 
            I specialize in designing and developing microservices architectures that are both maintainable and efficient.
            </p>
            <div className="home-card">
              <div className="home-card-content">
                <h3>Schedule a 1-on-1 call with me</h3>
                <p>Let's connect over a Google Meet call!</p>
                <div className="home-cta">
                  <button className="btn btn-primary" onClick={handleScheduleCall}>
                    Schedule a call
                  </button>
                </div>
              </div>
            </div> 
            <div className="home-card">
              <div className="home-card-content">
                <h3>Ask Me Anything</h3>
                <p>Curious about my experience or skills?</p>
                <div className="home-cta">
                  <button className="btn btn-primary" onClick={handleOpenChat}>
                    Start Chatting
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-section-right">
            <img 
              src="/aditya-face.jpg" 
              alt="Aditya Bijapurkar" 
              className="profile-image"
            />
            <div className="quick-stats">
              <div className="stat-card">
                <h3>{getYearsOfExperience('2024-04-01')}</h3>
                <p>Years of Experience</p>
              </div>
              <div className="stat-card">
                <h3>10+</h3>
                <p>Microservices Developed</p>
              </div>
              <div className="stat-card">
                <h3>90%</h3>
                <p>API Optimized</p>
              </div>
            </div> 
          </div>
        </div>
      </div>
      
      <ScheduleModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        setNotification={setNotification}
      />
      
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={handleCloseChat}
      />
    </div>
  );
};

export default Home;