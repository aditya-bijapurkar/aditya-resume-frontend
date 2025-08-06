import React from 'react';
import './css/Pages.css';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: 'AiDash',
      position: 'SDE 1',
      period: '2024 Nov - Present',
      description: 'Backend Developer at AiDash, designing and developing scalable backend systems using Java SpringBoot and Python Django.',
      achievements: [
        'Developed an asynchronous multi-threaded architecture to scale task creation from 10 to 14k+ tasks.',
        'Implemented log tracing in over 6 microserices, streamlining debugging throughout the process lifeline.',
        'Created Prometheus metrics and alerts on 7+ services and built Graphana dashboards for monitoring.',
        'Streamlined process of Lambda functions deployment by writing MAKE commands and creating a pipeline.',
        'Achieved 70% reduction in database search-space by decoupling IVMS application from legacy frameworks.',
      ],
      technologies: ['SpringBoot', 'Django', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 2,
      company: 'AiDash',
      position: 'SDE Intern',
      period: '2024 Apr - 2024 Nov',
      description: 'Worked on BNG-AI project, created GraphQL APIs and streamlined the process of data ingestion to the application.',
      achievements: [
        'Reduced 95% of the manual effort for the site ingestion process by architecting an orchestration system.',
        'Developed Bspoke compliance backend engine using Java SpringBoot in just 2 weeks with testcases and documentation.',
        'Worked on GraphQL API schema designing and development for over 20+ endpoints'
      ],
      technologies: ['Java', 'GraphQL', 'REST', 'PostgreSQL']
    },
    {
      id: 3,
      company: 'Akto.io',
      position: 'Backend Developer Intern',
      period: '2024 Mar - 2024 Apr',
      description: 'Worked on API security and threat detection with Akto.io as a backend developer intern.',
      achievements: [],
      technologies: ['Node.js', 'Java', 'React.js', 'Postman']
    }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Work Experience</h1>
        <p className="subtitle">My professional journey and achievements</p>
      </div>
      
      <div className="page-content">
        
        <div className="experience-summary">
          <h3>Career Summary</h3>
          <p>
            Over the past 1.5+ years I have worked on 2 projects, delivering scalable backend solutions for asset management and compliance.<br/>
            I have experience in developing and architecting microservices in Java SpringBoot and Python Django while maintaining high code quality and test coverage.<br/>
            I have deep knowledge about RDBMS (postgres) and NoSQL (mongo) databases and have worked on them extensively.<br/>
            Maintaining high quality code and streamlining the deployment process on AWS has been a top priority for me.<br/>
          </p>
        </div>

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
                  {
                    experience.achievements.length > 0 ? (
                      <>
                      <h5>Key Achievements:</h5>
                      <ul>
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ))}
                      </ul>
                      </>
                    ) : (
                      <></>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Experience; 