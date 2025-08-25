import React,{useState,useEffect,Suspense} from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Navigation from './components/Navigation/Navigation'
import Contact from './components/Contact/Contact'
import TerminalIcon from './components/TerminalIcon/TerminalIcon'
const VantaBackground=React.lazy(()=>import('./components/VantaBackground/VantaBackground'))
const FloatingAmoeba=React.lazy(()=>import('./components/FloatingAmoeba/FloatingAmoeba'))
const Description=React.lazy(()=>import('./components/Description/Description'))
const Experiences=React.lazy(()=>import('./components/Sections/Experiences/Experiences'))
const Projects=React.lazy(()=>import('./components/Sections/Projects/Projects'))
const Skills=React.lazy(()=>import('./components/Sections/Skills/Skills'))
const Certifications=React.lazy(()=>import('./components/Sections/Certifications/Certifications'))
const Awards=React.lazy(()=>import('./components/Sections/Awards/Awards'))
const InteractiveTerminal=React.lazy(()=>import('./components/InteractiveTerminal/InteractiveTerminal'))
const GridRipple=React.lazy(()=>import('./components/GridRipple/GridRipple'))
function App(){const[isLoading,setIsLoading]=useState(true);const[activeSection,setActiveSection]=useState('description');const[isTerminalOpen,setIsTerminalOpen]=useState(false);const[enableFx,setEnableFx]=useState(false);useEffect(()=>{const t=setTimeout(()=>setIsLoading(false),1200);const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;const fine=window.matchMedia&&window.matchMedia('(pointer:fine)').matches;setEnableFx(!reduce&&fine);return()=>clearTimeout(t)},[]);if(isLoading)return<LoadingScreen/>;return(<div className="app"><Suspense fallback={null}>{enableFx&&<VantaBackground/>}{enableFx&&<FloatingAmoeba/>}{enableFx&&<GridRipple/>}</Suspense><Navigation activeSection={activeSection} setActiveSection={setActiveSection}/><main className="main-content"><div className="section-container"><Suspense fallback={null}>{activeSection==='description'&&<Description/>}{activeSection==='experiences'&&<Experiences/>}{activeSection==='projects'&&<Projects/>}{activeSection==='skills'&&<Skills/>}{activeSection==='certifications'&&<Certifications/>}{activeSection==='awards'&&<Awards/>}</Suspense></div></main><Contact/><TerminalIcon onClick={()=>setIsTerminalOpen(true)}/><Suspense fallback={null}>{isTerminalOpen&&<InteractiveTerminal isOpen={isTerminalOpen} onClose={()=>setIsTerminalOpen(false)}/>}</Suspense></div>) }
export default App
