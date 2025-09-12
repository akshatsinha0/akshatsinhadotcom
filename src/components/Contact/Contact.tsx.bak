import React from 'react'
import './Contact.css'
import LINKEDIN3D from '../../3dIcons/LINKEDIN3D.png'
import GITHUB3D from '../../3dIcons/GITHUB3D.png'
import RESUME3D from '../../3dIcons/RESUME3D.png'
import GMAIL3D from '../../3dIcons/GMAIL3D.png'
import LEETCODE3D from '../../3dIcons/LEETCODE3D.png'
const Contact:React.FC=()=>{const socialLinks=[{name:'LinkedIn',url:'https://www.linkedin.com/in/akshat-sinha-248805214',img:LINKEDIN3D,color:'#0077b5'},{name:'GitHub',url:'https://github.com/akshatsinha0',img:GITHUB3D,color:'#333'},{name:'Resume',url:'https://drive.google.com/file/d/1Uet3riDOGna4d3JUR2jxRvpNAP76OEcU/view?usp=sharing',img:RESUME3D,color:'#667eea'},{name:'Email',url:'mailto:akshatsinhasramhardy@gmail.com',img:GMAIL3D,color:'#ea4335'},{name:'LeetCode',url:'https://leetcode.com/u/akshatsinha0/',img:LEETCODE3D,color:'#ffa116'}];return(<div className="contact-container"><div className="contact-header"><h3>Let's Create Something Extraordinary Together</h3><p>Ready to transform ideas into digital masterpieces?</p></div><div className="social-links">{socialLinks.map((link,index)=>(<a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link" style={{'--link-color':link.color,'--delay':`${index*.1}s`} as React.CSSProperties}><span className="social-icon-img"><img src={link.img} alt={link.name}/></span><span className="social-name">{link.name}</span><div className="social-glow"></div></a>))}</div></div>)}
export default Contact
