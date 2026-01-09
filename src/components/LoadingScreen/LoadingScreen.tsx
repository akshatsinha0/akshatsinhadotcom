import React, { useState, useEffect } from 'react'
import './LoadingScreen.css'
const LoadingScreen: React.FC = () => {
  const [counter, setCounter] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  useEffect(() => {
    let currentCount = 0
    let currentProgress = 0
    const duration = 3800
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeInOutCubic = (t: number): number => {
        const cycles = 3
        const cycleProgress = (t * cycles) % 1
        return cycleProgress < 0.5 
          ? 4 * cycleProgress * cycleProgress * cycleProgress 
          : 1 - Math.pow(-2 * cycleProgress + 2, 3) / 2
      }
      
      currentProgress = progress * 100
      setLineProgress(currentProgress)
      
      if (progress < 0.95) {
        currentCount = Math.floor(progress * 100)
      } else {
        currentCount = 100
      }
      setCounter(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [])
  return (
    <div className="loading-screen">
      <div className="top-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
        <div className="line line-4"></div>
      </div>
      
      <div className="vertical-line-container">
        <div 
          className="vertical-line" 
          style={{ 
            height: `${lineProgress}%`,
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
