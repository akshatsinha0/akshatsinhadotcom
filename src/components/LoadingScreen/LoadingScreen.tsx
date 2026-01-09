import React, { useState, useEffect } from 'react'
import './LoadingScreen.css'
const LoadingScreen: React.FC = () => {
  const [counter, setCounter] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  const [lineSqueeze, setLineSqueeze] = useState(0)
  useEffect(() => {
    let currentCount = 0
    const duration = 6000
    const startTime = Date.now()
    
    const customEasing = (t: number): number => {
      if (t < 0.25) {
        return t * 3.2
      } else if (t < 0.45) {
        return 0.8 + (t - 0.25) * 0.6
      } else if (t < 0.7) {
        return 0.92 + (t - 0.45) * 2.8
      } else if (t < 0.85) {
        return 1.62 + (t - 0.7) * 0.4
      } else {
        return 1.68 + (t - 0.85) * 2.13
      }
    }
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      
      const easedProgress = customEasing(rawProgress)
      const normalizedProgress = Math.min(easedProgress / 2, 1)
      
      currentCount = Math.floor(normalizedProgress * 100)
      
      if (rawProgress >= 0.95) {
        currentCount = 100
      }
      
      setCounter(currentCount)
      setLineProgress(normalizedProgress * 100)
      
      if (currentCount >= 84) {
        const squeezeProgress = Math.min((currentCount - 84) / 16, 1)
        const squeezeAmount = squeezeProgress * 88
        setLineSqueeze(squeezeAmount)
      }
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [])
  return (
    <div className="loading-screen">
      <div className="top-lines">
        <div 
          className="line line-1" 
          style={{ 
            marginLeft: `${lineSqueeze}%`,
            transition: 'margin-left 0.3s ease-out'
          }}
        ></div>
        <div 
          className="line line-2" 
          style={{ 
            marginLeft: `${lineSqueeze}%`,
            transition: 'margin-left 0.3s ease-out'
          }}
        ></div>
        <div 
          className="line line-3" 
          style={{ 
            marginLeft: `${lineSqueeze}%`,
            transition: 'margin-left 0.3s ease-out'
          }}
        ></div>
        <div 
          className="line line-4" 
          style={{ 
            marginLeft: `${lineSqueeze}%`,
            transition: 'margin-left 0.3s ease-out'
          }}
        ></div>
      </div>
      
      <div className="vertical-line-container">
        <div 
          className="vertical-line" 
          style={{ 
            left: `${lineProgress}%`,
            transition: 'none'
          }}
        ></div>
      </div>
      
      <div className="loading-counter">
        <span className="counter-number">{counter}</span>
        <span className="counter-percent">%</span>
      </div>
    </div>
  )
}
export default LoadingScreen
