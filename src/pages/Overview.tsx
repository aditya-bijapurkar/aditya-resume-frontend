import React from 'react';
import './css/Pages.css';

const Overview: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Microservices Architecture Platform',
      description: 'Designed and implemented a scalable microservices platform using Spring Boot and Docker. Features include multithreading, API controller, prometheus monitoring, and distributed tracing.',
      technologies: ['SpringBoot', 'Java', 'JPA-Repo','Prometheus', 'Docker', 'PostgreSQL'],
      image: {
        src: '/project/spring.png',
        alt: 'Backend',
      }, 
      repoLink: 'https://github.com/aditya-bijapurkar/aditya-resume-backend',
      action: 'done'
    },
    {
      id: 2,
      title: 'Authentication & Authorization',
      description: 'Implemented user management module in Go for subscription based access to the website and added reCAPTCHA V3 to verify human interaction and prevent bot scraping and attacks.',
      technologies: ['Golang', 'JWT', 'Authentication', 'reCAPTCHA v3', 'User Management'],
      image: {
        src: '/project/go-auth.png',
        alt: 'Authentication',
      },
      repoLink: 'https://github.com/aditya-bijapurkar/aditya-resume-auth',
      action: 'done'
    },
    {
      id: 3,
      title: 'Docker Containerization and CI / DC',
      description: 'Created CI / CD pipelines using Github Actions for the application to build, test and deploy to the Docker Hub. Also used Docker Compose to orchestrate the containers on live OCI instance.',
      technologies: ['Docker', 'Docker Compose', 'Dockerfile', 'Github Actions', 'Docker Hub', 'CI/CD'],
      image: {
        src: '/project/docker-cicd.png',
        alt: 'Docker',
      },
      repoLink: 'https://hub.docker.com/repositories/adityabijapurkar',
      action: 'done'
    },
    {
      id: 4,
      title: 'RAG Framework and LLM chatbot',
      description: 'Implemented RAG framework using Cosine similarity to retrieve relevant documents from the S3 knowledge base. Implemented LLM chatbot using OpenAI API to answer questions and provide information.',
      technologies: ['RAG', 'Cosine Similarity', 'OpenAI API', 'LLM', 'Chatbot'],
      image: {
        src: '/project/rag.png',
        alt: 'RAG framework',
      },  
      action: 'done'
    },
    {
      id: 5,
      title: 'AWS + OCI + Cloudflare Infrastructure',
      description: 'Built comprehensive infrastructure as code using Cloudflare DNS and AWS services including Route53, OCI Compute, ACM, RDS, SES and CloudFront to deploy the website on live servers.',
      technologies: ['AWS', 'OCI', 'Cloudflare', 'Route53', 'Compute', 'ACM', 'RDS', 'CloudFront', 'SES'],
      image: {
        src: '/project/aws-cf.png',
        alt: 'AWS + OCI + Cloudflare',
      }, 
      repoLink: 'https://github.com/aditya-bijapurkar/aditya-resume-infra',
      action: 'done'
    },
    {
      id: 6,
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
          <p>
            This website is built using Java SpringBoot, Golang and React TypeScript, running on OCI infrastructure and networked via Cloudflare DNS services.<br/>
            Github Actions CI/CD pipelines are used to build and push images to DockerHub and to orchestrate containers using Docker Compose on servers.
          </p>
        </div>

        <div className="flowchart-section">   
          <div className="flowchart-container">
            <div className="flowchart-image-wrapper">
              <h3>📊 System Architecture Flowchart</h3>
              <img 
                src="/system-architecture-06.svg" 
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

export default Overview; 