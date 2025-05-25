import React, { useState } from 'react'
import './Navigation.css'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sections = [
    { id: 'description', icon: '👤', label: 'About Me', color: '#667eea' },
    { id: 'experiences', icon: '💼', label: 'Experience', color: '#764ba2' },
    { id: 'projects', icon: '🚀', label: 'Projects', color: '#f093fb' },
    { id: 'skills', icon: '⚡', label: 'Skills', color: '#4facfe' },
    { id: 'certifications', icon: '🏆', label: 'Certifications', color: '#43e97b' },
    { id: 'awards', icon: '🌟', label: 'Awards', color: '#fa709a' }
  ]

  return (
    <nav className={`navigation ${isExpanded ? 'expanded' : ''}`}>
      <div className="nav-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="nav-toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className="nav-items">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(section.id)
              setIsExpanded(false)
            }}
            style={{ '--item-color': section.color, '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="nav-icon">{section.icon}</div>
            <div className="nav-label">{section.label}</div>
            <div className="nav-glow"></div>
          </div>
        ))}
      </div>
      
      <div className="nav-indicator"></div>
    </nav>
  )
}

export default Navigation
