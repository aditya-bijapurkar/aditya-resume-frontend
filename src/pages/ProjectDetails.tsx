import React from 'react';
import './Pages.css';

const ProjectDetails: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '🛒',
      link: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      technologies: ['React', 'Firebase', 'TypeScript'],
      image: '📋',
      link: '#'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application with location-based forecasts and interactive maps.',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      image: '🌤️',
      link: '#'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with modern web technologies.',
      technologies: ['React', 'TypeScript', 'CSS3'],
      image: '💼',
      link: '#'
    }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Projects</h1>
        <p className="subtitle">Showcasing my latest work and achievements</p>
      </div>
      
      <div className="page-content">
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <span className="project-icon">{project.image}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <button className="btn btn-primary">View Project</button>
                  <button className="btn btn-secondary">View Code</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 