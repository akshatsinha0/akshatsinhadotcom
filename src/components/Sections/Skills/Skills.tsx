import React, { useState } from 'react'
import './Skills.css'
import reactLogo from '../../../assets/reactjs.png'
import tsLogo from '../../../assets/typescript.png'
import nodeLogo from '../../../assets/nodejs.png'
import qtLogo from '../../../assets/qt.png'
import awsLogo from '../../../assets/aws.png'
import gqlLogo from '../../../assets/graphql.png'
const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const skills = [
    {
      name: 'React',
      level: 95,
      color: '#61DAFB',
      logo: reactLogo,
      particles: ['Hooks', 'Context', 'Fibre', 'Suspense']
    },
    {
      name: 'TypeScript',
      level: 90,
      color: '#3178C6',
      logo: tsLogo,
      particles: ['Types', 'Enums', 'Generics', 'Decorators']
    },
    {
      name: 'Node.js',
      level: 88,
      color: '#68A063',
      logo: nodeLogo,
      particles: ['Express', 'Streams', 'Cluster', 'NPM']
    },
    {
      name: 'Qt Creator',
      level: 85,
      color: '#41CD52',
      logo: qtLogo,
      particles: ['QML', 'Widgets', 'Signals', 'Multithreading']
    },
    {
      name: 'AWS',
      level: 82,
      color: '#FF9900',
      logo: awsLogo,
      particles: ['EC2', 'S3', 'Lambda', 'DynamoDB']
    },
    {
      name: 'GraphQL',
      level: 80,
      color: '#E535AB',
      logo: gqlLogo,
      particles: ['Schemas', 'Resolvers', 'Apollo', 'Federation']
    }
  ]
  return (
    <section className="skills-section">
      {}
      <div className="skills-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-gradient">Technical Mastery</span>
            <span className="title-shadow">Technical Mastery</span>
          </h2>
          <p className="section-subtitle">Yah, technologies</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`skill-card ${activeSkill === skill.name ? 'active' : ''}`}
              onMouseEnter={() => setActiveSkill(skill.name)}
              onMouseLeave={() => setActiveSkill(null)}
              style={{
                '--skill-level': `${skill.level}%`,
                '--skill-color': skill.color
              } as React.CSSProperties}
            >
              {}
              <div className="particle-orbit">
                {skill.particles.map((particle, idx) => (
                  <div
                    key={idx}
                    className="orbiting-particle"
                    style={{
                      '--particle-index': idx,
                      '--total-particles': skill.particles.length
                    } as React.CSSProperties}
                  >
                    {particle}
                  </div>
                ))}
              </div>
              {}
              <div className="skill-core">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="skill-logo"
                />
                <div className="core-glow"></div>
              </div>
              {}
              <div className="skill-details">
                <h3 className="skill-name">{skill.name}</h3>
                <div className="skill-meta">
                  <span className="skill-level">{skill.level}%</span>
                  <span className="skill-difficulty">Normal</span>
                </div>
              </div>
              {}
              <div className="progress-constellation">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                  <div className="progress-sparkles">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="sparkle"
                        style={{ '--sparkle-delay': `${i * 0.2}s` } as React.CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {}
              <div className="quantum-ripple"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Skills
