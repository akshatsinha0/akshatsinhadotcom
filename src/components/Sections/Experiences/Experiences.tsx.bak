import React from 'react'
import './Experiences.css'
import {experiences} from '../../../data/experiences'
const Experiences:React.FC=()=>{return(<section className="experiences-section"><div className="experience-container"><h2 className="section-title">Experience</h2><div className="experience-grid">{experiences.map(exp=>(<div key={exp.id} className="experience-card"><div className="card-header"><h3 className="card-title">{exp.title}</h3><div className="duration-pill">{exp.duration}</div></div><ul className="achievement-list">{exp.description.map((d,i)=>(<li key={i} className="achievement-item">{d}</li>))}</ul><div className="tech-grid">{exp.tech.map((t,i)=>(<div key={i} className="tech-tag">{t}</div>))}</div></div>))}</div></div></section>)}
export default Experiences
