import React, { useState, useEffect } from 'react'
import './LandingPage.css'

interface LandingPageProps {
  onEnter: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [scrambledCGPA, setScrambledCGPA] = useState('')

  const cgpaText = '8.79/10'
  const characters = '0123456789./'

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setScrambledCGPA(
        cgpaText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return cgpaText[index]
            }
            if (char === '/' || char === '.') return char
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      if (iteration >= cgpaText.length) {
        clearInterval(interval)
      }

      iteration += 1
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const portfolioCards = [
    {
      id: 1,
      title: 'About Me',
      image: '/src/assets/about-preview.jpg',
      category: 'Introduction'
    },
    {
      id: 2,
      title: 'Projects',
      image: '/src/assets/projects-preview.jpg',
      category: 'Showcase'
    },
    {
      id: 3,
      title: 'Experience',
      image: '/src/assets/experience-preview.jpg',
      category: 'Professional'
    },
    {
      id: 4,
      title: 'Skills',
      image: '/src/assets/skills-preview.jpg',
      category: 'Technical'
    },
    {
      id: 5,
      title: 'Certifications',
      image: '/src/assets/certs-preview.jpg',
      category: 'Achievements'
    },
    {
      id: 6,
      title: 'Awards',
      image: '/src/assets/awards-preview.jpg',
      category: 'Recognition'
    }
  ]

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-logo">
          <span className="logo-text">Akshat Sinha</span>
          <span className="logo-subtitle">Portfolio</span>
        </div>
        <nav className="landing-nav">
          <button className="nav-link">About</button>
          <button className="nav-link">Projects</button>
          <button className="nav-link">Experience</button>
          <button className="nav-link">Skills</button>
          <button className="nav-link">Certifications</button>
          <button className="nav-link">Awards</button>
        </nav>
        <div className="landing-actions">
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className="bookmark-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="enter-btn" onClick={onEnter}>
            Visit Portfolio
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Featured</div>
          <h1 className="hero-title">Akshat Sinha</h1>
          <p className="hero-description">
            Full-Stack Developer | Computer Science @ VIT Vellore | CGPA: {scrambledCGPA || cgpaText}
          </p>
          <div className="hero-meta">
            <span className="meta-item">2024</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">15+ Projects</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">3+ Certifications</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">React • Node.js • Python</span>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onEnter}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Visit My Portfolio
            </button>
            <button className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add to Bookmarks
            </button>
            <button className="btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-gradient"></div>
        </div>
      </section>

      <section className="portfolio-picks">
        <h2 className="section-title">Portfolio Highlights</h2>
        <div className="cards-container">
          {portfolioCards.map((card) => (
            <div
              key={card.id}
              className={`portfolio-card ${hoveredCard === card.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={onEnter}
            >
              <div className="card-image">
                <div className="card-gradient"></div>
                <div className="play-overlay">
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span className="play-text">Visit Portfolio</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-category">{card.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="featured-grid">
          <div
            className="featured-card"
            onClick={onEnter}
          >
            <div className="featured-image">
              <div className="featured-gradient"></div>
              <div className="play-overlay">
                <div className="play-button">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <span className="play-text">Visit Portfolio</span>
              </div>
            </div>
            <div className="featured-info">
              <span className="featured-badge">Live Project</span>
              <h3 className="featured-title">TakesTakesTakes Chess Platform</h3>
            </div>
          </div>
          <div
            className="featured-card"
            onClick={onEnter}
          >
            <div className="featured-image">
              <div className="featured-gradient"></div>
              <div className="play-overlay">
                <div className="play-button">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <span className="play-text">Visit Portfolio</span>
              </div>
            </div>
            <div className="featured-info">
              <span className="featured-badge">AI/ML</span>
              <h3 className="featured-title">Chess Cheat Detection Engine</h3>
            </div>
          </div>
          <div
            className="featured-card"
            onClick={onEnter}
          >
            <div className="featured-image">
              <div className="featured-gradient"></div>
              <div className="play-overlay">
                <div className="play-button">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <span className="play-text">Visit Portfolio</span>
              </div>
            </div>
            <div className="featured-info">
              <span className="featured-badge">Web Development</span>
              <h3 className="featured-title">Neural Portfolio Website</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
