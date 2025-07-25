import React from 'react';
import './Pages.css';

const ProjectDetails: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Microservices Architecture Platform',
      description: 'Designed and implemented a scalable microservices platform using Spring Boot, Spring Cloud, and Docker. Features include service discovery, API gateway, and distributed tracing.',
      technologies: ['Spring Boot', 'Spring Cloud', 'Docker', 'Kubernetes', 'PostgreSQL'],
      image: '🏗️',
      link: '#',
      repoLink: 'https://github.com/yourusername/microservices-platform',
      explanation: 'This project demonstrates a complete microservices architecture with service discovery using Eureka, API gateway with Zuul, and distributed tracing with Sleuth. The platform handles high traffic with load balancing and circuit breakers.'
    },
    {
      id: 2,
      title: 'AWS Infrastructure Automation',
      description: 'Built comprehensive infrastructure as code using Terraform and AWS services including Route53, EC2, RDS, and CloudFormation for automated deployment and scaling.',
      technologies: ['AWS', 'Terraform', 'Route53', 'EC2', 'RDS', 'CloudFormation'],
      image: '☁️',
      link: '#',
      repoLink: 'https://github.com/yourusername/aws-infrastructure',
      explanation: 'Infrastructure as Code implementation using Terraform to provision and manage AWS resources. Includes automated DNS management with Route53, database provisioning with RDS, and auto-scaling EC2 instances.'
    },
    {
      id: 3,
      title: 'High-Performance REST API',
      description: 'Developed a RESTful API with Spring Boot, JPA/Hibernate, and PostgreSQL. Implemented caching with Redis, rate limiting, and comprehensive monitoring.',
      technologies: ['Spring Boot', 'JPA/Hibernate', 'PostgreSQL', 'Redis', 'Docker'],
      image: '⚡',
      link: '#',
      repoLink: 'https://github.com/yourusername/high-performance-api',
      explanation: 'Optimized REST API with connection pooling, Redis caching for frequently accessed data, and rate limiting to prevent abuse. Includes comprehensive API documentation with Swagger and health checks.'
    },
    {
      id: 4,
      title: 'Database Migration & Optimization',
      description: 'Led database migration from legacy system to PostgreSQL with performance optimization, indexing strategies, and data integrity validation.',
      technologies: ['PostgreSQL', 'Flyway', 'Spring Data JPA', 'AWS RDS'],
      image: '🗄️',
      link: '#',
      repoLink: 'https://github.com/yourusername/db-migration-tool',
      explanation: 'Database migration tool using Flyway for version control of schema changes. Includes performance optimization scripts, automated backup strategies, and data validation procedures.'
    },
    {
      id: 5,
      title: 'CI/CD Pipeline with AWS',
      description: 'Implemented end-to-end CI/CD pipeline using AWS CodePipeline, CodeBuild, and CodeDeploy with automated testing and deployment strategies.',
      technologies: ['AWS CodePipeline', 'CodeBuild', 'CodeDeploy', 'Docker', 'Spring Boot'],
      image: '🔄',
      link: '#',
      repoLink: 'https://github.com/yourusername/cicd-pipeline',
      explanation: 'Automated deployment pipeline that builds, tests, and deploys applications to multiple environments. Includes automated testing, security scanning, and rollback capabilities.'
    },
    {
      id: 6,
      title: 'Monitoring & Observability Platform',
      description: 'Built comprehensive monitoring solution with AWS CloudWatch, custom metrics, logging aggregation, and alerting systems for production environments.',
      technologies: ['AWS CloudWatch', 'Spring Boot Actuator', 'ELK Stack', 'Prometheus'],
      image: '📊',
      link: '#',
      repoLink: '#',
      explanation: 'Centralized monitoring and logging solution with custom dashboards, automated alerting, and log aggregation. Provides real-time insights into application performance and system health.'
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
                src="/system-architecture.svg" 
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
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <span className="project-icon">{project.image}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-explanation">
                    <p><strong>How it works:</strong> {project.explanation}</p>
                  </div>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 