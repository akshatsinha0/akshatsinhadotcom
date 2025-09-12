import React from 'react'
import './Awards.css'
import trophy from '../../../assets/winningtrophyicon.png'
import {awards} from '../../../data/awards'
const Awards:React.FC=()=>{return(<section className="awards-section"><div className="awards-container">{awards.map(a=>(<div key={a.title} className="award-card"><div className="award-header"><div className="trophy-icon"><img src={trophy} alt="Trophy" className="trophy-image"/></div><h3>{a.title}</h3></div><div className="award-body"><div className="organization">{a.organization}</div><div className="year">{a.year}</div><p className="description">{a.description}</p></div></div>))}</div></section>)}
export default Awards
