import React, { useState } from 'react'
import './Experiences.css'

const Experiences: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const experiences = [
    {
      id: 'xyz',
      title: 'Backend Developer @ XYZ',
      duration: '2023 - Present',
      description: [
        'Architected microservices using Node.js & TypeScript',
        'Implemented real-time analytics with WebSocket & Redis',
        'Designed CI/CD pipelines with GitHub Actions',
        'Led team of 5 developers in agile environment'
      ],
      tech: ['Node.js', 'GraphQL', 'Docker', 'AWS'],
      color: '#667eea'
    },
    {
      id: 'freecharge',
      title: 'Software Tech Intern @ Freecharge',
      duration: '2022 - 2023',
      description: [
        'Developed payment gateway integrations',
        'Optimized API response times by 40%',
        'Implemented fraud detection algorithms',
        'Created automated testing framework'
      ],
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka'],
      color: '#764ba2'
    }
  ]

  return (
    <section className="experiences-section">
      <div className="experience-grid">
        {experiences.map((exp) => (
          <div 
            key={exp.id}
            className={`experience-card ${expandedCard === exp.id ? 'expanded' : ''}`}
            onMouseEnter={() => setExpandedCard(exp.id)}
            onMouseLeave={() => setExpandedCard(null)}
            style={{ '--accent-color': exp.color } as React.CSSProperties}
          >
            <div className="card-header">
              <div className="company-logo"></div>
              <h3>{exp.title}</h3>
              <span className="duration">{exp.duration}</span>
            </div>
            
            <div className="card-content">
              <ul className="description-list">
                {exp.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              <div className="tech-stack">
                {exp.tech.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="card-glow"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experiences
// This code defines a React component for displaying work experiences in a grid format.