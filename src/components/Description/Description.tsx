import React, { useState, useEffect } from 'react'
import './Description.css'
import ContactModal from '../ContactModal/ContactModal'
import profileImg from '../../assets/AKSHATSINHAPHOTO.jpg'
const Description: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [activeExpertise, setActiveExpertise] = useState<string | null>(null)
  const [clickedStat, setClickedStat] = useState<string | null>(null)
  const [educationHover, setEducationHover] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const textArray = [
    'Full-Stack Developer',
    'Problem Solver',
    'Innovation Enthusiast',
    'Code Architect',
    'Digital Creator',
    'Java Enthusiast',
    'AI Prompt Engineer',
    'Mathematical Thinker'
  ]
  const expertiseAreas = [
    {
      id: 'programming',
      title: 'Programming Knowledge',
      subtitle: 'Java & Beyond',
      details: [
        'Advanced Java Development & OOP Mastery',
        'Data Structures & Algorithms Expertise',
        'Software Development Life Cycle',
        'Clean Code Architecture & Design Patterns'
      ],
      color: '#667eea'
    },
    {
      id: 'mathematics',
      title: 'Mathematical Foundation',
      subtitle: 'Logical Reasoning',
      details: [
        'Advanced Mathematics & Statistics',
        'Quantitative Aptitude & Mental Ability',
        'Mathematical Modeling & Problem Solving',
        'Algorithmic Complexity Analysis'
      ],
      color: '#f093fb'
    },
    {
      id: 'management',
      title: 'Leadership & Communication',
      subtitle: 'People Skills',
      details: [
        'Project Management & Team Leadership',
        'Public Speaking & Presentation Skills',
        'Crowd Management & Event Organization',
        'Cross-functional Team Collaboration'
      ],
      color: '#4facfe'
    },
    {
      id: 'ai',
      title: 'AI & Emerging Tech',
      subtitle: 'Future-Ready',
      details: [
        'AI Prompt Engineering & Optimization',
        'Machine Learning Fundamentals',
        'Natural Language Processing',
        'Emerging Technology Research'
      ],
      color: '#43e97b'
    }
  ]
  const educationTimeline = [
    {
      id: 'vit',
      institution: 'Vellore Institute of Technology',
      location: 'Vellore Campus, Tamil Nadu',
      duration: 'Aug 2022 - May 2026 (Expected)',
      degree: 'B.Tech in Computer Science Core',
      achievement: 'Current CGPA: 8.85/10',
      status: 'Pursuing',
      icon: '',
      color: '#667eea'
    },
    {
      id: 'dps',
      institution: 'Delhi Public School Ranchi',
      location: 'Ranchi, Jharkhand',
      duration: '2015 - 2022',
      degree: 'Senior Secondary Education',
      achievement: 'Class XII: 89.6% | Class X: 95%',
      status: 'Completed',
      icon: '',
      color: '#f093fb'
    },
    {
      id: 'fiitjee',
      institution: 'FIITJEE Ranchi',
      location: 'Ranchi, Jharkhand',
      duration: '2019 - 2022',
      degree: 'Competitive Exam Preparation',
      achievement: 'PCM + Mental Ability + Quantitative Aptitude',
      status: 'Completed',
      icon: '',
      color: '#4facfe'
    }
  ]
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textArray.length
      const fullText = textArray[i]
      setTypewriterText(isDeleting
        ? fullText.substring(0, typewriterText.length - 1)
        : fullText.substring(0, typewriterText.length + 1)
      )
      setTypingSpeed(isDeleting ? 30 : 150)
      if (!isDeleting && typewriterText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }
    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [typewriterText, isDeleting, loopNum, typingSpeed, textArray])
  const handleStatClick = (statType: string) => {
    setClickedStat(statType)
    setTimeout(() => setClickedStat(null), 1000)
  }
  const handleExpertiseClick = (id: string) => {
    setActiveExpertise(activeExpertise === id ? null : id)
  }
  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/1Uet3riDOGna4d3JUR2jxRvpNAP76OEcU/view?usp=sharing', '_blank')
  }
  const handleConnectClick = () => {
    setIsContactModalOpen(true)
  }
  return (
    <section className="description-section">
      <div className="description-container">
        <div className="description-content">
          <div className="profile-section">
            <div className="profile-image-container">
              <img src={profileImg} alt="Akshat Sinha" className="profile-image"/>
            </div>
          </div>
          <div className="text-section">
            <h1 className="name">
              <span className="first-name">Akshat</span>
              <span className="last-name">Sinha</span>
            </h1>
            <div className="title-container">
              <span className="title-prefix">I am a </span>
              <span className="typewriter-text">
                {typewriterText}
                <span className="cursor">|</span>
              </span>
            </div>
            <div className="description-text">
              <p className="intro">
                Passionate <strong>Computer Science</strong> student at <em>VIT Vellore</em> with a relentless
                drive for innovation and excellence. I craft sophisticated digital solutions that bridge
                the gap between imagination and implementation.
              </p>
              <p className="philosophy">
                My philosophy revolves around <strong>continuous learning</strong>, <strong>creative problem-solving</strong>,
                and building technologies that make a meaningful impact. Every line of code I write is
                a step towards creating something meaningful.
              </p>
              <p className="expertise-intro">
                <strong>Java enthusiast</strong> with deep knowledge in <em>mathematics</em>, <em>DSA</em>, and
                <em>software development</em>. Currently mastering <strong>AI prompt engineering</strong> while
                excelling in <em>public speaking</em> and <em>team leadership</em>.
              </p>
            </div>
            <div className="stats-container">
              <div
                className={`stat-item ${clickedStat === 'cgpa' ? 'clicked' : ''}`}
                onClick={() => handleStatClick('cgpa')}
              >
                <div className="stat-number">8.85</div>
                <div className="stat-label">CGPA</div>
                <div className="stat-detail">VIT Vellore</div>
              </div>
              <div
                className={`stat-item ${clickedStat === 'projects' ? 'clicked' : ''}`}
                onClick={() => handleStatClick('projects')}
              >
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects</div>
                <div className="stat-detail">Developed</div>
              </div>
              <div
                className={`stat-item ${clickedStat === 'certs' ? 'clicked' : ''}`}
                onClick={() => handleStatClick('certs')}
              >
                <div className="stat-number">3+</div>
                <div className="stat-label">Certifications</div>
                <div className="stat-detail">Achieved</div>
              </div>
              <div
                className={`stat-item ${clickedStat === 'score' ? 'clicked' : ''}`}
                onClick={() => handleStatClick('score')}
              >
                <div className="stat-number">95%</div>
                <div className="stat-label">Class X</div>
                <div className="stat-detail">DPS Ranchi</div>
              </div>
            </div>
            {}
            <div className="expertise-section">
              <h3 className="section-title">
                <span className="title-icon"></span>
                Standard Areas
              </h3>
              <div className="expertise-grid">
                {expertiseAreas.map((area) => (
                  <div
                    key={area.id}
                    className={`expertise-card ${activeExpertise === area.id ? 'active' : ''}`}
                    onClick={() => handleExpertiseClick(area.id)}
                    style={{ '--accent-color': area.color } as React.CSSProperties}
                  >
                    <div className="card-header">
                      <h4>{area.title}</h4>
                      <span className="card-subtitle">{area.subtitle}</span>
                    </div>
                    <div className="card-content">
                      <ul className="expertise-details">
                        {area.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
            {}
            <div className="education-section">
              <h3 className="section-title">
                <span className="title-icon"></span>
                Education
              </h3>
              <div className="education-timeline">
                {educationTimeline.map((edu) => (
                  <div
                    key={edu.id}
                    className={`timeline-item ${educationHover === edu.id ? 'hovered' : ''}`}
                    onMouseEnter={() => setEducationHover(edu.id)}
                    onMouseLeave={() => setEducationHover(null)}
                    style={{ '--timeline-color': edu.color } as React.CSSProperties}
                  >
                    <div className="timeline-icon">{edu.icon}</div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h4>{edu.institution}</h4>
                        <span className="timeline-status">{edu.status}</span>
                      </div>
                      <div className="timeline-details">
                        <p className="timeline-degree">{edu.degree}</p>
                        <p className="timeline-location">{edu.location}</p>
                        <p className="timeline-duration">{edu.duration}</p>
                        <p className="timeline-achievement">{edu.achievement}</p>
                      </div>
                    </div>
                    <div className="timeline-glow"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="action-buttons">
              <button className="primary-btn" onClick={handleResumeClick}>
                <span>View Resume</span>
                <div className="btn-glow"></div>
              </button>
              <button className="secondary-btn" onClick={handleConnectClick}>
                <span>Let's Connect</span>
              </button>
            </div>
          </div>
        </div>
        <div className="floating-elements">
          <div className="element element-1"></div>
          <div className="element element-2"></div>
          <div className="element element-3"></div>
          <div className="element element-4"></div>
          <div className="element element-5"></div>
          <div className="element element-6"></div>
        </div>
        {}
        <div className="interactive-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>
      {}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  )
}
export default Description