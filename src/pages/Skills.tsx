import React from 'react';
import './Pages.css';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Express.js', level: 85 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 }
      ]
    },
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Vue.js', level: 75 }
      ]
    },
    {
      category: 'Tools & Technologies',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Firebase', level: 80 },
        { name: 'Webpack', level: 75 }
      ]
    }
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
            <span className="skill-tag">RESTful APIs</span>
            <span className="skill-tag">GraphQL</span>
            <span className="skill-tag">Responsive Design</span>
            <span className="skill-tag">UI/UX Design</span>
            <span className="skill-tag">Agile/Scrum</span>
            <span className="skill-tag">Testing</span>
            <span className="skill-tag">Performance Optimization</span>
            <span className="skill-tag">SEO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 