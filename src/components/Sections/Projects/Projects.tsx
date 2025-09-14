import React, { useState, useRef, useEffect } from 'react'
import './Projects.css'
import ElectricBorder from './ElectricBorder'
import type { Project } from '../../../types/project'
import { projects as projectsData } from '../../../data/projects'
interface ProjectsProps { enableFlip?: boolean }
const Projects: React.FC<ProjectsProps> = ({ enableFlip = false }) => {
  const [activeProject, setActiveProject] = useState(0)
  const [turned, setTurned] = useState<Record<number, boolean>>({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'carousel' | 'timeline'>('carousel')
  const containerRef = useRef<HTMLDivElement>(null)

  const projects: Project[] = projectsData

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

  const handleImageFlip = (e: React.MouseEvent, idx:number) => {
    e.stopPropagation()
    setTurned(prev=>({...prev,[idx]:!prev[idx]}))
  }

  const handleCardHover = (index: number | null) => {
    setHoveredCard(index)
  }

  return (
    <section className="projects-section" ref={containerRef}>
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
        <div className="section-header">
          <h2 className="section-title">PROJECT</h2>
          <p className="section-subtitle">
            Innovative solutions engineered with passion and precision
          </p>
          <div className="view-selector">
            {(['carousel', 'timeline'] as const).map((mode) => (
              <button
                key={mode}
                className={`view-btn ${viewMode === mode ? 'active' : ''}`}
                onClick={() => setViewMode(mode)}
              >
                <span className="btn-icon">{mode === 'carousel' ? '◉' : '▤'}</span>
                <span className="btn-text">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`projects-showcase view-${viewMode}`}>
          {projects.map((project, index) => (
            <ElectricBorder key={project.id} color="#7df9ff" speed={1} chaos={0.5} thickness={2} style={{borderRadius:0}}>
              <div
                className={`project-card ${activeProject === index ? 'active' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
                onClick={() => setActiveProject(index)}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className={`status-badge ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="status-dot"></span>
                  {project.status}
                </div>

                {project.images && (
                  <div className="project-images">
                    {enableFlip && project.images.length >= 2 ? (
                      <div className="pfx-flip-scene">
                        <div className={`pfx-flip-card ${turned[index] ? 'is-turned' : ''}`}>
                          <div className="pfx-flip-face pfx-front">
                            <img
                              className="pfx-img"
                              src={project.images[0]}
                              alt={`${project.title} - View 1`}
                            />
                          </div>
                          <div className="pfx-flip-face pfx-back">
                            <img
                              className="pfx-img"
                              src={project.images[1]}
                              alt={`${project.title} - View 2`}
                            />
                          </div>
                        </div>
                        <div className="image-overlay">
                          <div className="overlay-content">
                            <span className="category-tag">{project.category}</span>
                            <span className="year-badge">{project.year}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="notebook-container simple">
                        <img
                          className="project-image"
                          src={turned[index] ? project.images[1] : project.images[0]}
                          alt={`${project.title} - ${turned[index] ? 'View 2' : 'View 1'}`}
                        />
                        <div className="image-overlay">
                          <div className="overlay-content">
                            <span className="category-tag">{project.category}</span>
                            <span className="year-badge">{project.year}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="flip-btn liquid-btn" onClick={(e)=>handleImageFlip(e,index)}>
                      <span className="btn-liquid"></span>
                      <span className="btn-text">Turn Page</span>
                    </button>
                  </div>
                )}

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">
                      <span className="title-main">{project.title}</span>
                      <span className="title-sub">{project.subtitle}</span>
                    </h3>

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

                  <div className="project-features">
                    <h4 className="features-title">Core Features</h4>
                    <div className="features-grid">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <div className="feature-icon">✦</div>
                          <span className="feature-text">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tech-stack">
                    <h4 className="tech-title">Technology Stack</h4>
                    <div className="tech-constellation">
                      {project.technologies.map((tech, idx) => (
                        <div key={idx} className="tech-node" style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}>
                          <div className="node-core">{tech}</div>
                        </div>
                      ))}
                    </div>
                  </div>

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
              </div>
            </ElectricBorder>
          ))}
        </div>

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

