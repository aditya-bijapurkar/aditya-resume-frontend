import React from 'react';
import './css/Pages.css';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: 'Visa',
      position: 'Software Engineer',
      period: '2026 May - Present',
      description: 'Software Engineer in the IAM team within the Cybersecurity division at Visa.',
      achievements: [
        'Worked on inhouse tool to generate ephemeral certificates on bastion servers using CLI to login to private servers.',
        'Created passwordless authentication using Kerberos / gMSA based keytabs on MSSQL and eliminated password rotation.',
        'Working on onboarding PBAC agemts on AWS and GCP clouds to grant user access as a part of Day 0 access initiative',
        'Monitoring and governing user access across 30,000+ databases across Visa using automated pipelines and scripts.',
      ],
      technologies: ['Python', 'Go', 'Java', 'IAM', 'Cybersecurity']
    },
    {
      id: 2,
      company: 'AiDash',
      position: 'SDE 1',
      period: '2024 Nov - 2026 May',
      description: 'Backend Developer at AiDash, designing and developing scalable backend systems using SpringBoot and Django.',
      achievements: [
        'Developed an asynchronous multi-threaded architecture to scale task creation from 10 to 14k+ tasks.',
        'Implemented log tracing in over 6 microserices, streamlining debugging throughout the process lifeline.',
        'Created Prometheus metrics and alerts on 7+ services and built Grafana dashboards for monitoring.',
        'Streamlined process of Lambda functions deployment by writing MAKE commands and creating a pipeline.',
        'Achieved 70% reduction in database search-space by decoupling IVMS application from legacy frameworks.',
      ],
      technologies: ['SpringBoot', 'Django', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 3,
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

        <div className="explanation-section">
          <h3>Career Summary</h3>
          <p>
            I am currently working at Visa in the IAM team to maintain and monitor user access across various departments. <br/>
            I have previously worked on 2 projects at AiDash, delivering scalable backend solutions for asset management and compliance.<br/>
            I have experience in developing and architecting microservices in Java SpringBoot and Python Django while maintaining high code quality and test coverage.<br/>
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
