import React from 'react'
import './LoadingScreen.css'

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="quantum-loader">
          <div className="quantum-particle"></div>
          <div className="quantum-particle"></div>
          <div className="quantum-particle"></div>
        </div>
        <div className="loading-text">
          <span className="loading-letter" style={{animationDelay: '0.1s'}}>I</span>
          <span className="loading-letter" style={{animationDelay: '0.2s'}}>n</span>
          <span className="loading-letter" style={{animationDelay: '0.3s'}}>i</span>
          <span className="loading-letter" style={{animationDelay: '0.4s'}}>t</span>
          <span className="loading-letter" style={{animationDelay: '0.5s'}}>i</span>
          <span className="loading-letter" style={{animationDelay: '0.6s'}}>a</span>
          <span className="loading-letter" style={{animationDelay: '0.7s'}}>l</span>
          <span className="loading-letter" style={{animationDelay: '0.8s'}}>i</span>
          <span className="loading-letter" style={{animationDelay: '0.9s'}}>z</span>
          <span className="loading-letter" style={{animationDelay: '1.0s'}}>i</span>
          <span className="loading-letter" style={{animationDelay: '1.1s'}}>n</span>
          <span className="loading-letter" style={{animationDelay: '1.2s'}}>g</span>
          <span className="loading-letter" style={{animationDelay: '1.3s'}}>.</span>
          <span className="loading-letter" style={{animationDelay: '1.4s'}}>.</span>
          <span className="loading-letter" style={{animationDelay: '1.5s'}}>.</span>
        </div>
        <div className="loading-subtitle">
          <span className="typewriter">Crafting Digital Excellence</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
