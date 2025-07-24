import React from 'react';
import './Pages.css';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: 'Tech Company Inc.',
      position: 'Senior Full-Stack Developer',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies.',
      achievements: [
        'Led a team of 5 developers in building a customer portal',
        'Improved application performance by 40%',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker']
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and improved user experience across multiple platforms.',
      achievements: [
        'Built 3 major features from concept to deployment',
        'Reduced page load time by 30%',
        'Mentored junior developers and conducted code reviews'
      ],
      technologies: ['React', 'TypeScript', 'Redux', 'Sass']
    },
    {
      id: 3,
      company: 'Digital Agency',
      position: 'Web Developer',
      period: '2018 - 2020',
      description: 'Created custom websites and e-commerce solutions for various clients.',
      achievements: [
        'Delivered 20+ client projects on time and budget',
        'Developed reusable component library',
        'Implemented SEO best practices across all projects'
      ],
      technologies: ['JavaScript', 'PHP', 'WordPress', 'MySQL']
    }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Work Experience</h1>
        <p className="subtitle">My professional journey and achievements</p>
      </div>
      
      <div className="page-content">
        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="experience-item">
              <div className="experience-header">
                <div className="experience-title">
                  <h3>{experience.position}</h3>
                  <h4>{experience.company}</h4>
                  <span className="experience-period">{experience.period}</span>
                </div>
                <div className="experience-technologies">
                  {experience.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="experience-content">
                <p className="experience-description">{experience.description}</p>
                
                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="experience-summary">
          <h3>Career Summary</h3>
          <p>
            Over the past 5+ years, I've worked across various industries and 
            technologies, always focusing on delivering high-quality, scalable 
            solutions. I've grown from a junior developer to a senior role, 
            leading teams and mentoring others along the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience; 