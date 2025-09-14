import React, { useState } from 'react'
import './Navigation.css'
import About3D from '../../3dIcons/NAVIGATION/ABOUTME3D.png'
import Experience3D from '../../3dIcons/NAVIGATION/EXPERIENCE3D.png'
import Projects3D from '../../3dIcons/NAVIGATION/PROJECTS3D.png'
import Skills3D from '../../3dIcons/NAVIGATION/SKILLS3D.png'
import Certs3D from '../../3dIcons/NAVIGATION/CERTIFICATIONS3D.png'
import Awards3D from '../../3dIcons/NAVIGATION/STARS3D.png'
import { Image as GalleryIcon } from 'lucide-react'
interface NavigationProps{activeSection:string;setActiveSection:(section:string)=>void}

type Section={id:string;label:string;color:string;icon?:string;IconCmp?:React.ComponentType<{className?:string}>}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const sections:Section[] = [
    {
      id: 'description',
      icon: About3D,
      label: 'About Me',
      color: '#667eea'
    },
    {
      id: 'experiences',
      icon: Experience3D,
      label: 'Experience',
      color: '#764ba2'
    },
    {
      id: 'projects',
      icon: Projects3D,
      label: 'Projects',
      color: '#f093fb'
    },
    {
      id: 'skills',
      icon: Skills3D,
      label: 'Skills',
      color: '#4facfe'
    },
    {
      id: 'certifications',
      icon: Certs3D,
      label: 'Certifications',
      color: '#43e97b'
    },
    {
      id: 'awards',
      icon: Awards3D,
      label: 'Awards',
      color: '#fa709a'
    },
    {
      id: 'images',
      IconCmp: GalleryIcon,
      label: 'Images',
      color: '#38bdf8'
    }
  ]
  return (
    <>
      <div className="mobile-nav-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="nav-toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
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
                if(section.id==='images'){
window.open((import.meta as any).env?.BASE_URL? `${(import.meta as any).env.BASE_URL}gallery.html`:'/gallery.html','_blank','noopener')
                }else{
                  setActiveSection(section.id)
                }
                setIsExpanded(false)
              }}
              style={{ '--item-color': section.color, '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="nav-icon">
                {section.IconCmp? (
                  <section.IconCmp className="nav-icon-svg" />
                ):(
                  <img
                    src={section.icon}
                    alt={section.label}
                    className="nav-icon-image"
                  />
                )}
              </div>
              <div className="nav-label">{section.label}</div>
              <div className="nav-glow"></div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
export default Navigation

