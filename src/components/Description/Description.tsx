import React,{useState} from 'react'
import './Description.css'
import ContactModal from '../ContactModal/ContactModal'
import profileImg from '../../assets/AKSHATSINHAPHOTO.jpg'
const Description:React.FC=()=>{
  const[activeExpertise,setActiveExpertise]=useState<string|null>(null)
  const[clickedStat,setClickedStat]=useState<string|null>(null)
  const[cardsState,setCardsState]=useState<'stack'|'scatter'|'open'>('stack')
  const[isContactModalOpen,setIsContactModalOpen]=useState(false)
  const expertiseAreas=[
    {
      id: 'programming',
      title: 'Programming Knowledge',
      subtitle: 'Java & Beyond',
      details: [
        'Java Development & OOP Mastery',
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
        'Mathematics & Statistics',
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
  const handleStatClick=(statType:string)=>{
    setClickedStat(statType)
    setTimeout(()=>setClickedStat(null),1000)
  }
  const handleExpertiseClick=(id:string)=>{
    setActiveExpertise(activeExpertise===id?null:id)
  }
  const handleResumeClick=()=>{
    window.open('https://drive.google.com/file/d/1Uet3riDOGna4d3JUR2jxRvpNAP76OEcU/view?usp=sharing','_blank')
  }
  const handleConnectClick=()=>{
    setIsContactModalOpen(true)
  }
  return(
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
            <div className="description-text">
              <p className="intro"></p>
              <p className="philosophy">Ready and suprised student.</p>
              <p className="expertise-intro"></p>
            </div>
            <div className="stats-container">
              <div className={`stat-item ${clickedStat==='cgpa'?'clicked':''}`} onClick={()=>handleStatClick('cgpa')}>
                <div className="stat-number">8.85</div>
                <div className="stat-label">CGPA</div>
                <div className="stat-detail">VIT Vellore</div>
              </div>
              <div className={`stat-item ${clickedStat==='projects'?'clicked':''}`} onClick={()=>handleStatClick('projects')}>
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects</div>
                <div className="stat-detail">Developed</div>
              </div>
              <div className={`stat-item ${clickedStat==='certs'?'clicked':''}`} onClick={()=>handleStatClick('certs')}>
                <div className="stat-number">3+</div>
                <div className="stat-label">Certifications</div>
                <div className="stat-detail">Achieved</div>
              </div>
              <div className={`stat-item ${clickedStat==='score'?'clicked':''}`} onClick={()=>handleStatClick('score')}>
                <div className="stat-number">95%</div>
                <div className="stat-label">Class X</div>
                <div className="stat-detail">DPS Ranchi</div>
              </div>
            </div>
            <div className="expertise-section">
              <h3 className="section-title">
                <span className="title-icon"></span>
                Standard Areas
              </h3>
              <div className={`expertise-grid ${cardsState}`}>
                {expertiseAreas.map((area,idx)=>(
                  <div
                    key={area.id}
                    className={`expertise-card ${activeExpertise===area.id?'active':''}`}
                    onClick={()=>{if(cardsState==='stack'&&idx===0)setCardsState('scatter');else if(cardsState==='scatter')setCardsState('stack');else handleExpertiseClick(area.id)}}
                    style={{'--accent-color':area.color} as React.CSSProperties}
                  >
                    <div className="card-header">
                      <h4>{area.title}</h4>
                      <span className="card-subtitle">{area.subtitle}</span>
                    </div>
                    <div className="card-content">
                      <ul className="expertise-details">
                        {area.details.map((detail,idx2)=>(
                          <li key={idx2}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="action-buttons">
              <button className="primary-btn" onClick={handleResumeClick}>
                <span>View Resume</span>
                <span className="btn-fill" aria-hidden="true"></span>
                <div className="btn-glow"></div>
              </button>
              <button className="secondary-btn" onClick={handleConnectClick}>
                <span>Let's Connect</span>
                <span className="btn-fill" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={()=>setIsContactModalOpen(false)}/>
    </section>
  )
}
export default Description

