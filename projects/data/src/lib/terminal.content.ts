/** Interactive-terminal content.
 *  Static command output lives here; dynamic commands (clear/exit/date) stay in
 *  the component. */

export const TERMINAL_INTRO: readonly string[] = [
  "Welcome to Akshat Sinha's Interactive Terminal v2.0",
  'Portfolio System initialized successfully',
  "Type 'help' to see available commands",
  "Type 'about' to learn more about Akshat",
  '',
];

export const TERMINAL_HELP: readonly string[] = [
  'AVAILABLE COMMANDS:',
  '├─ about        → Learn about Akshat Sinha',
  '├─ experience   → Professional work history',
  '├─ projects     → Showcased development projects',
  '├─ skills       → Technical expertise & proficiency',
  '├─ achievements → Awards, certifications & recognition',
  '├─ contact      → Get in touch information',
  '├─ whoami       → Current user identity',
  '├─ date         → Current system date & time',
  '├─ quote        → Inspirational programming quote',
  '├─ matrix       → Enter the matrix (easter egg)',
  '├─ clear        → Clear terminal history',
  '└─ exit         → Close terminal interface',
];

export const TERMINAL_ABOUT = {
  bio: [
    'Akshat Sinha - Fragment Developer & Innovation Enthusiast',
    'Currently pursuing Computer Science at VIT Vellore',
    'CGPA: 8.84/10 - Academic Excellence in Technical Domain',
    'Passionate about creating modern digital solutions',
    'Award-winning developer with multiple certifications',
    'Specializes in React, Node.js, Python, and Qt Creator',
    'Research interests: AI/ML, Web Technologies, Chess Analytics',
  ],
  experience: [
    'BACKEND DEVELOPER @ XYZ Corporation',
    '   ├─ Architected scalable microservices using Node.js & TypeScript',
    '   ├─ Implemented real-time analytics with WebSocket & Redis',
    '   ├─ Designed CI/CD pipelines reducing deployment time by 60%',
    '   └─ Led cross-functional team of 5 developers in agile environment',
    '',
    'SOFTWARE TECH INTERN @ Freecharge',
    '   ├─ Developed payment gateway integrations handling 100K+ transactions',
    '   ├─ Optimized API response times by 40% using advanced caching',
    '   ├─ Implemented fraud detection algorithms with 95% accuracy',
    '   └─ Created automated testing framework reducing QA time by 50%',
  ],
  projects: [
    'TAKESTAKESTAKES - Revolutionary Chess Platform',
    '   ├─ Real-time multiplayer chess with advanced game engine',
    '   ├─ Secure user authentication and session management',
    '   ├─ Interactive chessboard with drag-and-drop functionality',
    '   ├─ Live URL: https://takestakestakes.netlify.app/',
    '   └─ Tech Stack: React, Node.js, WebSockets, MongoDB',
    '',
    'CHESS CHEAT DETECTION ENGINE',
    '   ├─ AI-powered suspicious gameplay pattern detection',
    '   ├─ Real-time move analysis using Stockfish integration',
    '   ├─ Machine Learning anomaly detection with 98% precision',
    '   ├─ Dynamic warning system for tournament organizers',
    '   └─ Tech Stack: Python, TensorFlow, OpenCV, Docker',
  ],
  skills: [
    'PROGRAMMING LANGUAGES:',
    '   ├─ JavaScript/TypeScript (Expert)',
    '   ├─ Python (Advanced)',
    '   ├─ Java (Intermediate)',
    '   ├─ C++ (Intermediate)',
    '   └─ Qt Creator (Advanced)',
    '',
    'FRAMEWORKS & LIBRARIES:',
    '   ├─ React.js + Next.js (Expert)',
    '   ├─ Node.js + Express (Expert)',
    '   ├─ Spring Boot (Intermediate)',
    '   └─ TensorFlow + PyTorch (Learning)',
    '',
    'CLOUD & DEVOPS:',
    '   ├─ AWS (EC2, S3, Lambda, RDS)',
    '   ├─ Docker + Kubernetes',
    '   ├─ GitHub Actions CI/CD',
    '   └─ MongoDB + PostgreSQL',
  ],
  achievements: [
    'TECHNICAL ACHIEVEMENTS:',
    '   ├─ Best Innovation Award - TechCrunch Disrupt 2024',
    '   ├─ Top Open Source Contributor - GitHub Universe 2023',
    '   ├─ Young Engineer of the Year - IEEE 2022',
    '   ├─ Hackathon Winner - 3 consecutive competitions',
    '   └─ LeetCode Rating: 1850+ (Top 5% globally)',
    '',
    'CERTIFICATIONS:',
    '   ├─ AWS Certified Developer Associate (2024)',
    '   ├─ Meta React Professional Certificate (2023)',
    '   ├─ Google Cloud Professional Developer (2023)',
    '   └─ MongoDB Certified Developer (2022)',
  ],
  contact: [
    'CONNECT WITH AKSHAT:',
    '   ├─ Email: akshatsinhasramhardy@gmail.com',
    '   ├─ LinkedIn: linkedin.com/in/akshat-sinha-248805214',
    '   ├─ GitHub: github.com/akshatsinha0',
    '   ├─ LeetCode: leetcode.com/u/akshatsinha0',
    '   ├─ Resume: [Google Drive Link]',
    "   └─ Portfolio: You're already here!",
  ],
} as const;

export const TERMINAL_WHOAMI: readonly string[] = [
  "akshat@portfolio:~$ You are viewing Akshat Sinha's interactive terminal",
];

export const TERMINAL_QUOTES: readonly string[] = [
  '"The best way to predict the future is to invent it." - Alan Kay',
  '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
  '"First, solve the problem. Then, write the code." - John Johnson',
];

export const TERMINAL_MATRIX: readonly string[] = [
  'Taking the red pill...',
  'Accessing the Matrix...',
  'Welcome to the real world, Neo.',
  'There is no spoon. Only code.',
];

export const TERMINAL_EXIT_MESSAGE = "Thanks for visiting Akshat's terminal! Come back soon!";
export const TERMINAL_PROMPT = 'akshat@portfolio:~$ ';
