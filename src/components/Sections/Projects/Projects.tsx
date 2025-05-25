import React, { useState } from 'react'
import './Projects.css'

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const projects = [
    {
      id: 1,
      title: "TakesTakesTakes - Chess Platform",
      description: "Revolutionary two-player chess game with real-time multiplayer functionality",
      technologies: ["React", "Node.js", "WebSockets", "MongoDB"],
      link: "https://takestakestakes.netlify.app/",
      images: [
        "/src/assets/takestakestakesproject.png",
        "/src/assets/takestakestakes2.png"
      ],
      features: [
        "Real-time multiplayer chess",
        "Interactive chessboard interface", 
        "Secure user authentication",
        "Game history tracking"
      ]
    },
    {
      id: 2,
      title: "Chess Cheat Detection Engine",
      description: "AI-powered system for detecting suspicious chess gameplay patterns",
      technologies: ["Python", "TensorFlow", "OpenCV", "Stockfish"],
      features: [
        "Real-time move analysis",
        "ML-based anomaly detection",
        "Dynamic warning system",
        "Scalable Docker architecture"
      ]
    }
  ]

  const handleImageFlip = () => {
    setIsFlipping(true)
    setTimeout(() => setIsFlipping(false), 600)
  }

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Innovative solutions crafted with passion and precision</p>
        </div>

        <div className="projects-showcase">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card ${activeProject === index ? 'active' : ''}`}
              onClick={() => setActiveProject(index)}
            >
              {project.images && (
                <div className="project-images">
                  <div className={`notebook-container ${isFlipping ? 'flipping' : ''}`}>
                    <div className="page page-front">
                      <img src={project.images[0]} alt={`${project.title} - View 1`} />
                    </div>
                    <div className="page page-back">
                      <img src={project.images[1]} alt={`${project.title} - View 2`} />
                    </div>
                  </div>
                  <button className="flip-btn" onClick={handleImageFlip}>
                    Turn Page
                  </button>
                </div>
              )}
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-features">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Explore Project →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
