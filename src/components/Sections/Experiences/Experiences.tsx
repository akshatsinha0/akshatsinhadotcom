import React, { useState } from 'react';
import './Experiences.css';

const Experiences: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  const experiences = [
    {
      id: 'xyz',
      title: 'Backend Architect @ XYZ Corp',
      duration: '2023 - Present',
      description: [
        'Orchestrated microservices architecture serving 10M+ daily requests',
        'Pioneered real-time analytics pipeline reducing latency by 300%',
        'Architected CI/CD ecosystem deploying 50+ services daily',
        'Led cross-functional team of 15 engineers in agile environment'
      ],
      tech: ['Node.js', 'GraphQL', 'Kubernetes', 'AWS Lambda'],
      metrics: {
        scale: '10M+ RPM',
        latency: '<50ms',
        uptime: '99.99%',
        team: '15 Engineers'
      },
      color: '#667eea'
    },
    {
      id: 'freecharge',
      title: 'Software Engineer @ Freecharge',
      duration: '2022 - 2023',
      description: [
        'Engineered payment gateway handling $1M+ daily transactions',
        'Optimized API response times by 40% through advanced caching',
        'Devised fraud detection system with 99.8% accuracy',
        'Pioneered automated testing framework reducing QA cycles'
      ],
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka'],
      metrics: {
        transactions: '$1M+/day',
        accuracy: '99.8%',
        optimization: '40% faster',
        coverage: '90% Test'
      },
      color: '#764ba2'
    }
  ];

  return (
    <section className="experiences-section">
      <div className="experience-container">
        <h2 className="section-title">Professional Journey</h2>
        
        <div className="experience-grid">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`experience-card ${expandedCard === exp.id ? 'expanded' : ''}`}
              onMouseEnter={() => setExpandedCard(exp.id)}
              onMouseLeave={() => setExpandedCard(null)}
              style={{ '--accent-color': exp.color } as React.CSSProperties}
            >
              {/* Card Header */}
              <div className="card-header">
                <h3 className="card-title">{exp.title}</h3>
                <div className="duration-pill">{exp.duration}</div>
              </div>

              {/* Metrics Grid */}
              <div className="metrics-grid">
                {Object.entries(exp.metrics).map(([key, value]) => (
                  <div key={key} className="metric-item">
                    <div className="metric-value">{value}</div>
                    <div className="metric-label">{key}</div>
                  </div>
                ))}
              </div>

              {/* Description List */}
              <div className="description-section">
                <h4>Key Achievements</h4>
                <ul className="achievement-list">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="achievement-item">
                      <span className="achievement-icon">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="tech-section">
                <h4>Technologies</h4>
                <div className="tech-grid">
                  {exp.tech.map((tech, idx) => (
                    <div key={idx} className="tech-tag">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Effects */}
              <div className="card-glow"></div>
              <div className="card-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
