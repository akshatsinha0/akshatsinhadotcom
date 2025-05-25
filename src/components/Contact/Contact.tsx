import React from 'react'
import './Contact.css'

const Contact: React.FC = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/akshat-sinha-248805214',
      icon: '💼',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/akshatsinha0',
      icon: '🐱',
      color: '#333'
    },
    {
      name: 'Resume',
      url: 'https://drive.google.com/file/d/1LOYFiX2UF9wMsxSucTfbHYJxnkAlLyKE/view?usp=sharing',
      icon: '📄',
      color: '#667eea'
    },
    {
      name: 'Email',
      url: 'mailto:akshatsinhasramhardy@gmail.com',
      icon: '✉️',
      color: '#ea4335'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/akshatsinha0/',
      icon: '⚡',
      color: '#ffa116'
    }
  ]

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h3>Let's Create Something Extraordinary Together</h3>
        <p>Ready to transform ideas into digital masterpieces?</p>
      </div>
      
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{'--link-color': link.color, '--delay': `${index * 0.1}s`} as React.CSSProperties}
          >
            <span className="social-icon">{link.icon}</span>
            <span className="social-name">{link.name}</span>
            <div className="social-glow"></div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Contact
