import React from 'react';
import './Pages.css';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: 'Backend Development',
      skills: [
        { name: 'Java SpringBoot' },
        { name: 'Python Django' },
        { name: 'Node.js' },
        { name: 'Golang' },
        { name: 'GraphQL' },
        { name: 'REST' },
      ]
    },
    {
      category: 'Database Management & Tools',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'PL/SQL' },
        { name: 'Kubernetes' },
        { name: 'Docker' },
        { name: 'Git' },
      ]
    },
    {
      category: 'Top 6 AWS Services',
      skills: [
        { name: 'EC2' },
        { name: 'Lambda' },
        { name: 'S3' }, 
        { name: 'SQS' },
        { name: 'Secrets Manager' },
        { name: 'Application Gateway' },
      ]
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Skills & Expertise</h1>
        <p className="subtitle">Technologies and tools I work with</p>
      </div>
      
      <div className="page-content">
        <div className="skills-overview">
          <p>
            I've developed expertise in a wide range of technologies through 
            years of hands-on experience. Here's a breakdown of my technical skills:
          </p>
        </div>
        
        <div className="skills-container">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="additional-skills">
          <h3>Additional Skills</h3>
          <div className="skills-tags">
            <span className="skill-tag">React.js</span>
            <span className="skill-tag">Prometheus</span>
            <span className="skill-tag">Graphana</span>
            <span className="skill-tag">Jenkins</span>
            <span className="skill-tag">CI/CD</span>
            <span className="skill-tag">Microservices</span>
            <span className="skill-tag">Multithreading</span>
            <span className="skill-tag">Authentication</span>
            <span className="skill-tag">Debugging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 