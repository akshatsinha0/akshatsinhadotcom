import React, { useState, useRef, useEffect } from 'react'
import './Projects.css'
const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'carousel' | 'timeline'>('carousel')
  const containerRef = useRef<HTMLDivElement>(null)
  const projects = [
    {
      id: 1,
      title: "TakesTakesTakes",
      subtitle: "Chess Platform Revolution",
      description: "Revolutionary two-player chess game with real-time multiplayer functionality and advanced AI analysis",
      category: "Web Application",
      technologies: ["React", "Node.js", "WebSockets", "MongoDB", "Socket.io", "Express"],
      link: "https://takestakestakes.netlify.app/",
      github: "https://github.com/akshatsinha0/takestakestakes-chessified.git",
      images: [
        "/src/assets/takestakestakesproject.png",
        "/src/assets/takestakestakes2.png"
      ],
      features: [
        "Real-time multiplayer chess with 60fps rendering",
        "Interactive chessboard with drag-and-drop mechanics",
        "Advanced user authentication & session management",
        "Comprehensive game history & replay system",
        "AI-powered move suggestions & analysis",
        "Tournament bracket management system"
      ],
      metrics: {
        users: "10K+",
        games: "50K+",
        uptime: "99.9%",
        rating: "4.8/5"
      },
      year: "2024",
      status: "Live Production"
    },
    {
      id: 2,
      title: "Chess Cheat Detection",
      subtitle: "AI-Powered Analysis Engine",
      description: "Sophisticated AI system for detecting suspicious chess gameplay patterns using machine learning algorithms",
      category: "AI/ML System",
      technologies: ["Python", "TensorFlow", "OpenCV", "Stockfish", "FastAPI", "Docker"],
      github: "https://github.com/akshatsinha0/CheatDetect.git",
      features: [
        "Real-time move analysis with 99.5% accuracy",
        "Advanced ML anomaly detection algorithms",
        "Dynamic warning system with threat levels",
        "Scalable Docker microservices architecture",
        "Integration with major chess platforms",
        "Comprehensive reporting dashboard"
      ],
      metrics: {
        accuracy: "99.5%",
        speed: "<100ms",
        detection: "95%+",
        platforms: "5+"
      },
      year: "2024",
      status: "In Development"
    },
    {
      id: 3,
      title: "Neural akshatsinhadotdom Portfolio",
      subtitle: "AI-Driven Personal Website",
      description: "This very portfolio - featuring advanced animations, AI integrations, and modern web technologies",
      category: "Personal Project",
      technologies: ["React", "TypeScript", "CSS3", "Vite", "Three.js", "Babylon.js"],
      github: "https://github.com/akshatsinha0/portfolio",
      features: [
        "Advanced 3D animations & particle systems",
        "Interactive terminal with AI responses",
        "Dynamic background with physics simulation",
        "Responsive design with mobile optimization",
        "Performance-optimized rendering",
        "Accessibility-compliant interface"
      ],
      metrics: {
        performance: "98/100",
        accessibility: "96/100",
        seo: "100/100",
        speed: "0.8s"
      },
      year: "2025",
      status: "Live & Evolving"
    }
  ]
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  const handleImageFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipping(true)
    setTimeout(() => setIsFlipping(false), 600)
  }
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index)
  }
  return (
    <section className="projects-section" ref={containerRef}>
      {}
      <div
        className="projects-background"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`
        } as React.CSSProperties}
      >
        <div className="bg-gradient-1"></div>
      </div>
      <div className="projects-container">
        {}
        <div className="section-header">
          <h2 className="section-title glitch-text" data-text="DIGITAL MASTERPIECES">
            <span className="glitch-layer">DIGITAL MASTERPIECES</span>
            <span className="glitch-layer">DIGITAL MASTERPIECES</span>
            <span className="glitch-layer">DIGITAL MASTERPIECES</span>
          </h2>
          <p className="section-subtitle typewriter-reveal">
            Innovative solutions engineered with passion and precision
          </p>
          {}
          <div className="view-selector">
            {(['grid', 'carousel', 'timeline'] as const).map((mode) => (
              <button
                key={mode}
                className={`view-btn ${viewMode === mode ? 'active' : ''}`}
                onClick={() => setViewMode(mode)}
              >
                <span className="btn-icon">{mode === 'grid' ? '⚏' : mode === 'carousel' ? '◉' : '▤'}</span>
                <span className="btn-text">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
        {}
        <div className={`projects-showcase view-${viewMode}`}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${activeProject === index ? 'active' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
              onClick={() => setActiveProject(index)}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardHover(null)}
              style={{ '--card-index': index } as React.CSSProperties}
            >
              {}
              <div className="holographic-border"></div>
              {}
              <div className={`status-badge ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="status-dot"></span>
                {project.status}
              </div>
              {}
              {project.images && (
                <div className="project-images">
                  <div className={`notebook-container ${isFlipping ? 'flipping' : ''}`}>
                    <div className="page page-front">
                      <img src={project.images[0]} alt={`${project.title} - View 1`} />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <span className="category-tag">{project.category}</span>
                          <span className="year-badge">{project.year}</span>
                        </div>
                      </div>
                    </div>
                    {project.images[1] && (
                      <div className="page page-back">
                        <img src={project.images[1]} alt={`${project.title} - View 2`} />
                      </div>
                    )}
                  </div>
                  <button className="flip-btn liquid-btn" onClick={handleImageFlip}>
                    <span className="btn-liquid"></span>
                    <span className="btn-text">Turn Page</span>
                  </button>
                </div>
              )}
              {}
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">
                    <span className="title-main">{project.title}</span>
                    <span className="title-sub">{project.subtitle}</span>
                  </h3>
                  {}
                  <div className="metrics-grid">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="metric-item">
                        <div className="metric-value">{value}</div>
                        <div className="metric-label">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                {}
                <div className="project-features">
                  <h4 className="features-title">Core Features</h4>
                  <div className="features-grid">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <div className="feature-icon">
                          <div className="icon-pulse"></div>
                          ✦
                        </div>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {}
                <div className="tech-stack">
                  <h4 className="tech-title">Technology Stack</h4>
                  <div className="tech-constellation">
                    {project.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="tech-node"
                        style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
                      >
                        <div className="node-core">{tech}</div>
                        <div className="node-orbit"></div>
                      </div>
                    ))}
                    <svg className="tech-connections" viewBox="0 0 100 100">
                      {project.technologies.map((_, idx) => (
                        idx < project.technologies.length - 1 && (
                          <line
                            key={idx}
                            x1={`${(idx + 1) * (100 / (project.technologies.length + 1))}`}
                            y1="50"
                            x2={`${(idx + 2) * (100 / (project.technologies.length + 1))}`}
                            y2="50"
                            className="connection-line"
                          />
                        )
                      ))}
                    </svg>
                  </div>
                </div>
                {}
                <div className="project-actions">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn primary-action"
                    >
                      <span className="btn-bg"></span>
                      <span className="btn-text">Live Demo</span>
                      <span className="btn-icon"></span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn secondary-action"
                    >
                      <span className="btn-bg"></span>
                      <span className="btn-text">Source Code</span>
                      <span className="btn-icon"></span>
                    </a>
                  )}
                </div>
              </div>
              {}
              <div className="card-morph-bg"></div>
              {}
              <div className="floating-elements">
                <div className="float-element float-1">◆</div>
                <div className="float-element float-2">◇</div>
                <div className="float-element float-3">◈</div>
              </div>
            </div>
          ))}
        </div>
        {}
        <div className="project-navigation">
          <div className="nav-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeProject === index ? 'active' : ''}`}
                onClick={() => setActiveProject(index)}
              >
                <span className="dot-pulse"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Projects