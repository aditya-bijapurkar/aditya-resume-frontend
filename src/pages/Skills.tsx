import React from 'react';
import './css/Pages.css';

const Skills: React.FC = () => {
  const certifications = [
    {
      name: 'Certified Kubernetes Application Developer',
      validity: 'Oct 2025 - Oct 2027',
      provider: 'The Linux Foundation (CNCF)',
      link: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/3335f5c7-10b6-4fab-b750-9289969c9f39-aditya-bijapurkar-fb50f4b9-40a7-4516-8d0f-3f91b78a67c0-certificate.pdf'
    }
  ]

  const skillCategories = [
    {
      category: 'Backend Development',
      skills: [
        { name: 'Java SpringBoot' },
        { name: 'Python Django' },
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'GraphQL' },
        { name: 'REST' },
      ]
    },
    {
      category: 'DevOps and Automation',
      skills: [
     
        { name: 'Kubernetes' },
        { name: 'Docker' },
        { name: 'Github Actions' },
        { name: 'Git' },
        { name: 'Makefile' },
        { name: 'CI/CD' },
      ]
    },
    {
      category: 'Top AWS Services',
      skills: [
        { name: 'EC2' },
        { name: 'Lambda' },
        { name: 'S3' }, 
        { name: 'SQS' },
        { name: 'Cloudfront CDN' },
        { name: 'Application Gateway' },
      ]
    }
  ];

  const additionalSkills = [
    'Github Actions', 'React.js', 'Prometheus', 
    'Graphana', 'Jenkins', 'CI/CD', 'Microservices', 
    'Authentication', 'Secrets Manager'
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Skills & Certifications</h1>
        <p className="subtitle">Technologies and tools I work with</p>
      </div>
      
      <div className="page-content">
        <div className="certifications-container">
          {certifications.map((certification, index) => (
            <div key={index} className="certification-item">
              <div className="certificate-header">
                <h3>{certification.name}</h3>
                <h5>{certification.validity}</h5>
              </div>
              <p>{certification.provider}</p>
              <a href={certification.link} target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          ))}
        </div>

        <div className="skills-overview">
          <p><b>
            I've developed expertise in a wide range of technologies through 
            years of hands-on experience. Here's a breakdown of my technical skills:
          </b></p>
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