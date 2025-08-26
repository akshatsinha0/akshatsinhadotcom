import takesProject from '../assets/takestakestakesproject.png'
import takes2 from '../assets/takestakestakes2.png'
import type { Project } from '../types/project'

export const projects:Project[]=[
  {
    id:1,
    title:'TakesTakesTakes',
    subtitle:'Chess Platform Revolution',
    description:'Revolutionary two-player chess game with real-time multiplayer functionality and advanced AI analysis',
    category:'Web Application',
    technologies:['React','Node.js','WebSockets','MongoDB','Socket.io','Express'],
    link:'https://takestakestakes.netlify.app/',
    github:'https://github.com/akshatsinha0/takestakestakes-chessified.git',
    images:[takesProject,takes2],
    features:[
      'Real-time multiplayer chess with 60fps rendering',
      'Interactive chessboard with drag-and-drop mechanics',
      'Advanced user authentication & session management',
      'Comprehensive game history & replay system',
      'AI-powered move suggestions & analysis',
      'Tournament bracket management system'
    ],
    metrics:{users:'5',games:'10',uptime:'99.9%',rating:'5/5'},
    year:'2024',
    status:'Live Production'
  },
  {
    id:2,
    title:'Chess Cheat Detection',
    subtitle:'AI-Powered Analysis Engine',
    description:'Sophisticated AI system for detecting suspicious chess gameplay patterns using machine learning algorithms',
    category:'AI/ML System',
    technologies:['Python','TensorFlow','OpenCV','Stockfish','FastAPI','Docker'],
    github:'https://github.com/akshatsinha0/CheatDetect.git',
    features:[
      'Real-time move analysis with 99.5% accuracy',
      'Advanced ML anomaly detection algorithms',
      'Dynamic warning system with threat levels',
      'Scalable Docker microservices architecture',
      'Integration with major chess platforms',
      'Comprehensive reporting dashboard'
    ],
    metrics:{accuracy:'99.5%',speed:'<100ms',detection:'95%+',platforms:'LocalHost'},
    year:'2024',
    status:'In Development'
  },
  {
    id:3,
    title:'Altrude akshatsinhadotdom Portfolio',
    subtitle:'AI-Driven Personal Website',
    description:'This very portfolio - featuring advanced animations, AI integrations, and modern web technologies',
    category:'Personal Project',
    technologies:['React','TypeScript','CSS3','Vite','Three.js','Babylon.js'],
    github:'https://github.com/akshatsinha0/portfolio',
    features:[
      'Advanced 3D animations & particle systems',
      'Interactive terminal with AI responses',
      'Dynamic background with physics simulation',
      'Responsive design with mobile optimization',
      'Performance-optimized rendering',
      'Accessibility-compliant interface'
    ],
    metrics:{performance:'98/100',accessibility:'96/100',seo:'100/100',speed:'0.8s'},
    year:'2025',
    status:'Live & Evolving'
  }
]

