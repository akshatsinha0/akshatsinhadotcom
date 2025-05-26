import React, { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Navigation from './components/Navigation/Navigation'
import FloatingAmoeba from './components/FloatingAmoeba/FloatingAmoeba'
import MouseTrail from './components/MouseTrail/MouseTrail'
import Description from './components/Description/Description'
import Experiences from './components/Sections/Experiences/Experiences'
import Projects from './components/Sections/Projects/Projects'
import Skills from './components/Sections/Skills/Skills'
import Certifications from './components/Sections/Certifications/Certifications'
import Awards from './components/Sections/Awards/Awards'
import Contact from './components/Contact/Contact'
// import QuantumBackground from './components/QuantumBackground/QuantumBackground';
import VantaBackground from './components/VantaBackground/VantaBackground'
import InteractiveTerminal from './components/InteractiveTerminal/InteractiveTerminal'
import TerminalIcon from './components/TerminalIcon/TerminalIcon'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('description')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const sections = {
    description: <Description />,
    experiences: <Experiences />,
    projects: <Projects />,
    skills: <Skills />,
    certifications: <Certifications />,
    awards: <Awards />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="app">
      <VantaBackground />
      {/* <QuantumBackground /> */}
      <FloatingAmoeba />
      <MouseTrail />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="main-content">
        <div className="section-container">
          {sections[activeSection as keyof typeof sections]}
        </div>
      </main>
      
      <Contact />
      <TerminalIcon onClick={() => setIsTerminalOpen(true)} />
      <InteractiveTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </div>
  )
}

export default App
