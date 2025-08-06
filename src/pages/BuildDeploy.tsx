import React from 'react';
import './css/Pages.css';

const BuildDeploy: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Microservices Architecture Platform',
      description: 'Designed and implemented a scalable microservices platform using Spring Boot and Docker. Features include multithreading, API controller, prometheus monitoring, and distributed tracing.',
      technologies: ['Spring Boot', 'Java', 'JPA-Repo','Prometheus', 'Docker', 'PostgreSQL'],
      image: {
        src: '/project/spring.png',
        alt: 'Spring Boot',
      }, 
      repoLink: 'https://github.com/aditya-bijapurkar/aditya-resume-backend',
      action: 'done'
    },
    {
      id: 2,
      title: 'Docker Containerization and CI / DC',
      description: 'Created CI / CD pipelines using Github Actions for the application to build, test and deploy to the Docker Hub. Also used Docker Compose to orchestrate the containers on live EC2 instances.',
      technologies: ['Docker', 'Docker Compose', 'Dockerfile', 'Github Actions', 'Docker Hub', 'CI/CD'],
      image: {
        src: '/project/docker-cicd.png',
        alt: 'Docker',
      },
      repoLink: 'https://hub.docker.com/repositories/adityabijapurkar',
      action: 'done'
    },
    {
      id: 3,
      title: 'React-ive Frontend Interface',
      description: 'Developed a React-based frontend interface for the website. Implemented responsive design, component-based architecture, and integration with backend services using reverse proxy.',
      technologies: ['React', 'TypeScript', 'CSS3', 'React Router', 'React Hooks'],
      image: {
        src: '/project/react.jpeg',
        alt: 'React Txs',
      }, 
      repoLink: 'https://github.com/aditya-bijapurkar/aditya-resume-frontend',
      action: 'done'
    },
    {
      id: 4,
      title: 'AWS Infrastructure',
      description: 'Built comprehensive infrastructure as code using AWS services including Route53, EC2, ACM, RDS, SES and CloudFront to deploy the website on live servers.',
      technologies: ['AWS', 'Route53', 'EC2', 'ACM', 'RDS', 'CloudFront', 'SES'],
      image: {
        src: '/project/aws.png',
        alt: 'AWS',
      }, 
      action: 'done'
    },
    {
      id: 5,
      title: 'Authentication & Authorization',
      description: 'Implemented reCAPTCHA v3 for the website to prevent unauthorized access and DDOS attacks to the website. TODO - implemented user-management module for subscription based access to the website.',
      technologies: ['reCAPTCHA v3', 'Auth-service', 'AWS Lambda', 'AWS S3'],
      image: {
        src: '/project/incognito.png',
        alt: 'reCAPTCHA v3',
      },      
      action: 'done'
    },
    {
      id: 6,
      title: 'Monitoring & Observability Platform',
      description: 'Implemented prometheus custom metrics in Spring Application to enable easy monitoring and alerting. TODO - Adding Graphana Dashboards and Alerting to integrate with the website to send email alerts.',
      technologies: ['Prometheus', 'Grafana', 'Monitoring', 'Alerting', 'Actuator'],
      image: {
        src: '/project/prometheus.png',
        alt: 'Prometheus',
      },  
      action: 'todo'
    }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Implementation details for the website</h1>
        <p className="subtitle">This page contains the implementation details for the website!</p>
      </div>
      
      <div className="page-content">        
        <div className="sub-header">
          <h2>System Architecture Overview</h2>
        </div>
        <div className="explanation-section">
          <h2>How It Works</h2>
          <p>
            This portfolio website is built using React with TypeScript for the frontend, showcasing modern web development practices.<br/> 
            The backend infrastructure demonstrates my expertise in Spring Boot, PostgreSQL, and AWS services.<br/>
            The system follows microservices architecture principles with proper separation of concerns, 
            automated deployment pipelines, and comprehensive monitoring solutions.<br/>
          </p>
          <p>
            Key features include responsive design, component-based architecture, and integration with various 
            backend services for contact forms and scheduling functionality. The entire system is containerized 
            and deployed using CI/CD practices with infrastructure as code.
          </p>
        </div>

        <div className="flowchart-section">   
          <div className="flowchart-container">
            <div className="flowchart-image-wrapper">
              <h3>📊 System Architecture Flowchart</h3>
              <img 
                src="/system-architecture-one.svg" 
                alt="System Architecture Flowchart"
                className="flowchart-image"
              />
            </div>
          </div>
        </div>

        <div className="projects-section">
          <h2>Technical Implementation Details</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className={`project-card-${project.action}`}>
                <div className="project-image-container">
                  <span className="project-icon">
                    <img src={project.image.src} alt={project.image.alt} className="project-image" />
                  </span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {
                    project.repoLink && (
                      <div className="project-actions">
                        <a 
                          href={project.repoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`btn btn-secondary ${project.repoLink === '#' ? 'disabled' : ''}`}
                          style={{ pointerEvents: project.repoLink === '#' ? 'none' : 'auto' }}
                        >
                          Repository Link
                        </a>
                      </div>   
                    )
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuildDeploy; 