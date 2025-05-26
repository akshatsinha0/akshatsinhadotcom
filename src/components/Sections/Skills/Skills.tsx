import React from 'react'
import './Skills.css'

const Skills: React.FC = () => {
  const skills = [
    { 
      name: 'React', 
      level: 95, 
      color: '#61DAFB',
      logo: '/src/assets/reactjs.png'
    },
    { 
      name: 'TypeScript', 
      level: 90, 
      color: '#3178C6',
      logo: '/src/assets/typescript.png'
    },
    { 
      name: 'Node.js', 
      level: 88, 
      color: '#68A063',
      logo: '/src/assets/nodejs.png'
    },
    { 
      name: 'Qt Creator', 
      level: 85, 
      color: '#41CD52',
      logo: '/src/assets/qt.png'
    },
    { 
      name: 'AWS', 
      level: 82, 
      color: '#FF9900',
      logo: '/src/assets/aws.png'
    },
    { 
      name: 'GraphQL', 
      level: 80, 
      color: '#E535AB',
      logo: '/src/assets/graphql.png'
    }
  ]

  return (
    <section className="skills-section">
      <div className="skills-grid">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className="skill-card"
            style={{ '--skill-level': `${skill.level}%`, '--skill-color': skill.color } as React.CSSProperties}
          >
            <div className="skill-header">
              <img 
                src={skill.logo} 
                alt={skill.name} 
                className="skill-logo" 
              />
              <div className="skill-title">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>
            </div>
            
            <div className="skill-progress">
              <div className="progress-bar"></div>
              <div className="progress-glow"></div>
            </div>
            
            <div className="skill-orb"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
