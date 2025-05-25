import React from 'react'
import './Certifications.css'

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2024',
      code: 'AWS-DEV-1234'
    },
    {
      title: 'React Professional Certification',
      issuer: 'Meta',
      date: '2023',
      code: 'META-REACT-5678'
    },
    {
      title: 'Node.js Master Certification',
      issuer: 'OpenJS Foundation',
      date: '2023',
      code: 'OJS-NODE-9012'
    }
  ]

  return (
    <section className="certifications-section">
      <div className="certification-cards">
        {certifications.map((cert, idx) => (
          <div 
            key={cert.code}
            className="certification-card"
            style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
          >
            <div className="card-front">
              <h3>{cert.title}</h3>
              <div className="issuer">{cert.issuer}</div>
            </div>
            
            <div className="card-back">
              <div className="cert-details">
                <div className="detail-item">
                  <span>Issued:</span>
                  <span>{cert.date}</span>
                </div>
                <div className="detail-item">
                  <span>Credential ID:</span>
                  <span>{cert.code}</span>
                </div>
              </div>
              <div className="cert-ribbon"></div>
            </div>
            
            <div className="card-glow"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certifications
