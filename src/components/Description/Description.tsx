import React, { useState, useEffect } from 'react'
import './Description.css'

const Description: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const textArray = [
    'Full-Stack Developer',
    'Problem Solver',
    'Innovation Enthusiast',
    'Code Architect',
    'Digital Creator'
    
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

  return (
    <section className="description-section">
      <div className="description-container">
        <div className="description-content">
          <div className="profile-section">
            <div className="profile-image-container">
              <div className="image-glow"></div>
              <img 
                src="/src/assets/AKSHATSINHAPHOTO.jpg" 
                alt="Akshat Sinha" 
                className="profile-image"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
          
          <div className="text-section">
            <div className="greeting">
              <span className="wave">👋</span>
              <span className="greeting-text">Hello, I'm</span>
            </div>
            
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
                a step towards creating something extraordinary.
              </p>
            </div>
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">8.79</div>
                <div className="stat-label">CGPA</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="primary-btn">
                <span>View Resume</span>
                <div className="btn-glow"></div>
              </button>
              <button className="secondary-btn">
                <span>Let's Connect</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="floating-elements">
          <div className="element element-1">⚡</div>
          <div className="element element-2">🚀</div>
          <div className="element element-3">💡</div>
          <div className="element element-4">🎯</div>
        </div>
      </div>
    </section>
  )
}

export default Description
