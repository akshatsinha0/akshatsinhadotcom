import React, { useState } from 'react'
import './Certifications.css'
const Certifications: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const certifications = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2024',
      code: 'AWS-DEV-1234',
      logo: '/src/assets/aws-cert-logo.png',
      ribbonColor: '#FF9900',
      hologram: 'aws-hologram-pattern.png'
    },
    {
      title: 'React Professional Certification',
      issuer: 'Meta',
      date: '2023',
      code: 'META-REACT-5678',
      logo: '/src/assets/meta-cert-logo.png',
      ribbonColor: '#087B9B',
      hologram: 'meta-hologram-pattern.png'
    },
    {
      title: 'Node.js Master Certification',
      issuer: 'OpenJS Foundation',
      date: '2023',
      code: 'OJS-NODE-9012',
      logo: '/src/assets/openjs-cert-logo.png',
      ribbonColor: '#68A063',
      hologram: 'openjs-hologram-pattern.png'
    }
  ]
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }
  return (
    <section className="certifications-section">
      {}
      <div className="quantum-particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--particle-delay': `${i * 0.3}s`,
              '--particle-duration': `${5 + (i % 5)}s`
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="certification-matrix">
        {certifications.map((cert, idx) => (
          <div
            key={cert.code}
            className="certification-card"
            style={{
              '--delay': `${idx * 0.1}s`,
              '--ribbon-color': cert.ribbonColor
            } as React.CSSProperties}
          >
            {}
            <div className="holographic-overlay">
              <div className="hologram-pattern"
                style={{ backgroundImage: `url(${cert.hologram})` }} />
              <div className="light-refraction"></div>
            </div>
            {}
            <div className="verification-ribbon">
              <span>Verified</span>
              <div className="ribbon-fold"></div>
            </div>
            {}
            <div className="card-face front">
              <div className="issuer-emblem">
                <img src={cert.logo} alt={cert.issuer} />
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="issuer-name" style={{ color: 'white' }}>{cert.issuer}</div>
              <div className="cert-year" style={{ color: 'white' }}>{cert.date}</div>
            </div>
            {}
            <div className="card-face back">
              <div className="certificate-seal">
                <div className="seal-inner">
                  <div className="seal-lines"></div>
                  <span style={{ color: 'white' }}>Certified</span>
                </div>
              </div>
              <div className="credential-details">
                <div className="detail-item">
                  <label style={{ color: 'white' }}>Issuer:</label>
                  <div className="issuer-badge" style={{ color: 'white' }}>
                    <img src={cert.logo} alt={cert.issuer} />
                    {cert.issuer}
                  </div>
                </div>
                <div className="detail-item">
                  <label style={{ color: 'white' }}>Credential ID:</label>
                  <button
                    className="credential-id"
                    onClick={() => copyToClipboard(cert.code)}
                    style={{ color: 'white' }}
                  >
                    {cert.code}
                    {copiedCode === cert.code && (
                      <span className="copy-feedback" style={{ color: 'white' }}>Copied!</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {}
            <div className="interactive-glow"></div>
          </div>
        ))}
      </div>
      {}
      <div className="verification-badge">
        <div className="animated-checkmark">
          <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        Certifications Verified
      </div>
    </section>
  )
}
export default Certifications