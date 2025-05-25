import React, { useEffect, useRef } from 'react'
import './MouseTrail.css'

const MouseTrail: React.FC = () => {
  const trailRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let trailX = 0
    let trailY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animateTrail = () => {
      const speed = 0.1
      trailX += (mouseX - trailX) * speed
      trailY += (mouseY - trailY) * speed

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`
        cursorRef.current.style.top = `${mouseY}px`
      }

      if (trailRef.current) {
        trailRef.current.style.left = `${trailX}px`
        trailRef.current.style.top = `${trailY}px`
      }

      requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateTrail()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={trailRef} className="mouse-trail"></div>
    </>
  )
}

export default MouseTrail
