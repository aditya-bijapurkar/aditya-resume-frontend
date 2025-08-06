import React from 'react';
import './css/Pages.css';

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
        { name: 'Cloudfront CDN' },
        { name: 'Application Gateway' },
      ]
    },
  ];

  const additionalSkills = [
    'Github Actions', 'React.js', 'Prometheus', 
    'Graphana', 'Jenkins', 'CI/CD', 'Microservices', 
    'Authentication', 'Secrets Manager'
  ]

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
            {
              additionalSkills.map((skill, index) => (
                <span key={index} className='skill-tag'>{skill}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 