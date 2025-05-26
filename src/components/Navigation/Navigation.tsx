import React, { useState } from 'react'
import './Navigation.css'
import DescriptionIcon from '../../assets/description.png'
import ExperiencesIcon from '../../assets/experiencesicon.png'
import ProjectsIcon from '../../assets/projectsicon.png'
import SkillsIcon from '../../assets/skillsicon.png'
import CertificationsIcon from '../../assets/certificationsicon.png'
import AwardsIcon from '../../assets/awardsicon.png'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sections = [
    { 
      id: 'description', 
      icon: DescriptionIcon, 
      label: 'About Me', 
      color: '#667eea' 
    },
    { 
      id: 'experiences', 
      icon: ExperiencesIcon, 
      label: 'Experience', 
      color: '#764ba2' 
    },
    { 
      id: 'projects', 
      icon: ProjectsIcon, 
      label: 'Projects', 
      color: '#f093fb' 
    },
    { 
      id: 'skills', 
      icon: SkillsIcon, 
      label: 'Skills', 
      color: '#4facfe' 
    },
    { 
      id: 'certifications', 
      icon: CertificationsIcon, 
      label: 'Certifications', 
      color: '#43e97b' 
    },
    { 
      id: 'awards', 
      icon: AwardsIcon, 
      label: 'Awards', 
      color: '#fa709a' 
    }
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
            <div className="nav-icon">
              <img 
                src={section.icon} 
                alt={section.label} 
                className="nav-icon-image"
              />
            </div>
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
