import React,{useEffect,useRef,useState} from 'react'
import { createRoot } from 'react-dom/client'
import './images.css'
import './index.css'

const countPerRow=5
const rows=5
const total=countPerRow*rows

const unsplash=(i:number,w:number,h:number)=>`https://source.unsplash.com/${w}x${h}/?nature,scenery&sig=${i}`
const picsum=(i:number,w:number,h:number)=>`https://picsum.photos/seed/gallery-${i}/${w}/${h}`

const defaultHeroIndex=()=> 1*countPerRow + Math.floor(countPerRow/2)

const Gallery:React.FC=()=>{
  const secRef=useRef<HTMLElement|null>(null)
  const pinRef=useRef<HTMLDivElement|null>(null)
  const overlayRef=useRef<HTMLDivElement|null>(null)
  const hoverIdxRef=useRef<number|null>(null)
  const wasActiveRef=useRef(false)
  const [heroIdx,setHeroIdx]=useState<number>(defaultHeroIndex())
  useEffect(()=>{const ease=(t:number)=>{t=Math.max(0,Math.min(1,t));return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
    const u=()=>{const s=secRef.current,p=pinRef.current,o=overlayRef.current;if(!s||!p)return;const r=s.getBoundingClientRect();const vh=innerHeight;
      const active=r.top<=0 && r.bottom>=vh; const finished=r.bottom<=vh; let gp=0;
      // Precompute tail distance and expose it as padding to allow scroll past pin
      const tailLen=Math.max(120,Math.min(vh*0.9, r.height*0.25));
      s.style.setProperty('--tail', `${Math.round(tailLen)}px`)
      if(active){
        const total=Math.max(1,r.height-vh); const progressed=Math.min(total,Math.max(0,-r.top)); gp=ease(progressed/total)
      } else if(finished){
        // Tail release: keep a small easing window after the section bottom hits the viewport
        const past=Math.min(tailLen,Math.max(0, vh - r.bottom));
        const t=past/tailLen; gp=1 - ease(t)
      } else {gp=0}
      // lock hero on pin entry using current hover (or default center of row 2)
      if(active && !wasActiveRef.current){setHeroIdx(hoverIdxRef.current ?? defaultHeroIndex())}
      wasActiveRef.current=active
      gp=Math.max(0,Math.min(1,gp)); p.style.setProperty('--gp',String(gp));
      // compute grid template weights so the real size grows, not a visual zoom
      const heroCol=heroIdx%countPerRow; const heroRow=Math.floor(heroIdx/countPerRow); const g=ease(gp);
      const cols=Array.from({length:countPerRow},(_,c)=>c===heroCol? (1+g*32): (Math.max(0.0001,1-g*0.98)))
      const rowsW=Array.from({length:rows},(_,r)=>r===heroRow? (1+g*8): (r===0? 2:Math.max(0.0001,1-g*0.9)))
      const colSum=cols.reduce((a,b)=>a+b,0); const rowSum=rowsW.reduce((a,b)=>a+b,0);
      const colFr=cols.map(v=>`${(v/colSum*100).toFixed(4)}fr`).join(' ')
      const rowFr=rowsW.map(v=>`${(v/rowSum*100).toFixed(4)}fr`).join(' ')
      const grid=p!.querySelector('.img-grid') as HTMLElement
      if(grid){grid.style.gridTemplateColumns=colFr; grid.style.gridTemplateRows=rowFr}
      // clip overlay to hero card bounds so text stays inside the image
      if(o&&grid){const heroEl=grid.querySelector('.card.focus') as HTMLElement|null; if(heroEl){const cr=p.getBoundingClientRect(); const hr=heroEl.getBoundingClientRect(); const top=hr.top-cr.top; const left=hr.left-cr.left; const right=cr.right-hr.right; const bottom=cr.bottom-hr.bottom; o.style.clipPath=`inset(${top}px ${right}px ${bottom}px ${left}px round 16px)`}}
      const pastTail=Math.max(0, vh - r.bottom);
const keepFixedTail= finished && pastTail < (tailLen*0.35) && gp>0.01;
      const release = finished && pastTail >= (tailLen*0.35);
      p.classList.toggle('fixed', (active && !finished) || keepFixedTail)
      p.classList.toggle('release', release)};u();addEventListener('scroll',u,{passive:true});addEventListener('resize',u);return()=>{removeEventListener('scroll',u);removeEventListener('resize',u)}},[heroIdx])
  return(
    <main className="images-page">
      <header className="img-header"><h1 className="page-title">These are the images that you can see, later to be more</h1></header>
      <section className="img-grid-section" ref={secRef}>
        <div className="pin" ref={pinRef}>
          <div className="img-grid">
            {Array.from({length:total},(_,i)=>{
              const isHero=i===heroIdx
              return(
                <figure key={i} className={`card${isHero?' focus':''}`} onMouseEnter={()=>{hoverIdxRef.current=i}}>
                  <img src={unsplash(i,1600,900)} referrerPolicy="no-referrer" alt={`img-${i}`} onError={(e)=>{const t=e.currentTarget;t.onerror=null;t.src=picsum(i,1600,900)}}/>
                </figure>
              )
            })}
          </div>
          <div className="grid-hero-overlay" ref={overlayRef}>
            <div className="overlay-inner">
              <div className="o-line t1">Black ice waits under blue air.</div>
              <div className="o-line t2">Cracks write their slow lines across the bay.</div>
              <div className="o-line t3 typewriter">Somewhere below this calm, the water remembers winter.</div>
            </div>
          </div>
        </div>
      </section>
      <footer className="img-footer">
        <h2 className="footer-title">Thanks for scrolling</h2>
        <p className="footer-sub">You’ve reached the end of this scrolly gallery. Here are a few quick notes.</p>
        <div className="footer-grid">
          <div className="f-card"><strong>Polar hush</strong><p className="footer-note">The sky slows to a breath and the ice listens. A ribbon of green curls over a black sea.</p></div>
          <div className="f-card"><strong>Needle light</strong><p className="footer-note">Faint sparks climb the horizon, thin as frost on wire, then gather into a slow tide.</p></div>
          <div className="f-card"><strong>Magnet roads</strong><p className="footer-note">Invisible lanes pull color north. You can hear it if you hold still—like snow moving in sleep.</p></div>
          <div className="f-card"><strong>Return</strong><p className="footer-note">What rises, falls. Dawn takes back the sky, and the lake keeps the secret.</p></div>
        </div>
        <p className="footer-note">Made with React + Vite</p>
      </footer>
    </main>
  )
}
createRoot(document.getElementById('images-root')!).render(<Gallery />)
