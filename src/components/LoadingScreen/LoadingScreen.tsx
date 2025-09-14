import React, { useState, useEffect } from 'react'
import './LoadingScreen.css'
const LoadingScreen: React.FC = () => {
  const [counter, setCounter] = useState(1)
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevCounter + 1
      })
    }, 38) 
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="loading-screen">
      <div className="loading-watermark" aria-hidden="true"></div>
      <div className="loading-content">
        <div className="quantum-loader">
          <div className="quantum-particle"></div>
          <div className="quantum-particle"></div>
          <div className="quantum-particle"></div>
        </div>
        <div className="loading-counter">
          <div className="counter-container">
            <span className="counter-number">{counter}</span>
            <span className="counter-percent">%</span>
          </div>
          <div className="progress-ring">
            <svg className="progress-svg" width="120" height="120">
              <circle
                className="progress-background"
                cx="60"
                cy="60"
                r="50"
                strokeWidth="3"
                fill="none"
              />
              <circle
                className="progress-bar"
                cx="60"
                cy="60"
                r="50"
                strokeWidth="3"
                fill="none"
                style={{
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${2 * Math.PI * 50 * (1 - counter / 100)}`,
                  transition: 'stroke-dashoffset 0.1s ease-out'
                }}
              />
            </svg>
          </div>
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
