import React, { useState, useEffect, useRef } from 'react';
import './InteractiveTerminal.css';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InteractiveTerminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const aboutAkshat = {
    bio: [
      "🚀 Akshat Sinha - Full-Stack Developer & Innovation Enthusiast",
      "📍 Currently pursuing Computer Science at VIT Vellore",
      "🎯 CGPA: 8.79/10 - Academic Excellence in Technical Domain",
      "💡 Passionate about creating cutting-edge digital solutions",
      "🏆 Award-winning developer with multiple certifications",
      "🌟 Specializes in React, Node.js, Python, and Qt Creator",
      "🔬 Research interests: AI/ML, Web Technologies, Chess Analytics"
    ],
    experience: [
      "💼 BACKEND DEVELOPER @ XYZ Corporation",
      "   ├─ Architected scalable microservices using Node.js & TypeScript",
      "   ├─ Implemented real-time analytics with WebSocket & Redis",
      "   ├─ Designed CI/CD pipelines reducing deployment time by 60%",
      "   └─ Led cross-functional team of 5 developers in agile environment",
      "",
      "🚀 SOFTWARE TECH INTERN @ Freecharge",
      "   ├─ Developed payment gateway integrations handling 100K+ transactions",
      "   ├─ Optimized API response times by 40% using advanced caching",
      "   ├─ Implemented fraud detection algorithms with 95% accuracy",
      "   └─ Created automated testing framework reducing QA time by 50%"
    ],
    projects: [
      "♟️  TAKESTAKESTAKES - Revolutionary Chess Platform",
      "   ├─ Real-time multiplayer chess with advanced game engine",
      "   ├─ Secure user authentication and session management",
      "   ├─ Interactive chessboard with drag-and-drop functionality",
      "   ├─ Live URL: https://takestakestakes.netlify.app/",
      "   └─ Tech Stack: React, Node.js, WebSockets, MongoDB",
      "",
      "🔍 CHESS CHEAT DETECTION ENGINE",
      "   ├─ AI-powered suspicious gameplay pattern detection",
      "   ├─ Real-time move analysis using Stockfish integration",
      "   ├─ Machine Learning anomaly detection with 98% precision",
      "   ├─ Dynamic warning system for tournament organizers",
      "   └─ Tech Stack: Python, TensorFlow, OpenCV, Docker"
    ],
    skills: [
      "🖥️  PROGRAMMING LANGUAGES:",
      "   ├─ JavaScript/TypeScript (Expert) ⭐⭐⭐⭐⭐",
      "   ├─ Python (Advanced) ⭐⭐⭐⭐⭐",
      "   ├─ Java (Intermediate) ⭐⭐⭐⭐",
      "   ├─ C++ (Intermediate) ⭐⭐⭐⭐",
      "   └─ Qt Creator (Advanced) ⭐⭐⭐⭐",
      "",
      "🌐 FRAMEWORKS & LIBRARIES:",
      "   ├─ React.js + Next.js (Expert)",
      "   ├─ Node.js + Express (Expert)", 
      "   ├─ Spring Boot (Intermediate)",
      "   └─ TensorFlow + PyTorch (Learning)",
      "",
      "☁️  CLOUD & DEVOPS:",
      "   ├─ AWS (EC2, S3, Lambda, RDS)",
      "   ├─ Docker + Kubernetes",
      "   ├─ GitHub Actions CI/CD",
      "   └─ MongoDB + PostgreSQL"
    ],
    achievements: [
      "🏆 TECHNICAL ACHIEVEMENTS:",
      "   ├─ Best Innovation Award - TechCrunch Disrupt 2024",
      "   ├─ Top Open Source Contributor - GitHub Universe 2023",
      "   ├─ Young Engineer of the Year - IEEE 2022",
      "   ├─ Hackathon Winner - 3 consecutive competitions",
      "   └─ LeetCode Rating: 1850+ (Top 5% globally)",
      "",
      "📜 CERTIFICATIONS:",
      "   ├─ AWS Certified Developer Associate (2024)",
      "   ├─ Meta React Professional Certificate (2023)",
      "   ├─ Google Cloud Professional Developer (2023)",
      "   └─ MongoDB Certified Developer (2022)"
    ],
    contact: [
      "📞 CONNECT WITH AKSHAT:",
      "   ├─ 📧 Email: akshatsinhasramhardy@gmail.com",
      "   ├─ 💼 LinkedIn: linkedin.com/in/akshat-sinha-248805214",
      "   ├─ 🐱 GitHub: github.com/akshatsinha0",
      "   ├─ ⚡ LeetCode: leetcode.com/u/akshatsinha0",
      "   ├─ 📄 Resume: [Google Drive Link]",
      "   └─ 🌐 Portfolio: You're already here! 🎉"
    ]
  };

  const commands = {
    help: () => [
      "🔧 AVAILABLE COMMANDS:",
      "├─ about        → Learn about Akshat Sinha",
      "├─ experience   → Professional work history",
      "├─ projects     → Showcased development projects",
      "├─ skills       → Technical expertise & proficiency",
      "├─ achievements → Awards, certifications & recognition",
      "├─ contact      → Get in touch information",
      "├─ whoami       → Current user identity",
      "├─ date         → Current system date & time",
      "├─ quote        → Inspirational programming quote",
      "├─ matrix       → Enter the matrix (easter egg)",
      "├─ clear        → Clear terminal history",
      "└─ exit         → Close terminal interface"
    ],
    about: () => aboutAkshat.bio,
    experience: () => aboutAkshat.experience,
    projects: () => aboutAkshat.projects,
    skills: () => aboutAkshat.skills,
    achievements: () => aboutAkshat.achievements,
    contact: () => aboutAkshat.contact,
    whoami: () => ["👨‍💻 akshat@portfolio:~$ You are viewing Akshat Sinha's interactive terminal"],
    date: () => [new Date().toLocaleString()],
    quote: () => [
      "💡 \"The best way to predict the future is to invent it.\" - Alan Kay",
      "🚀 \"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
      "⚡ \"First, solve the problem. Then, write the code.\" - John Johnson"
    ],
    matrix: () => [
      "🔴 Taking the red pill...",
      "⚡ Accessing the Matrix...",
      "🌐 Welcome to the real world, Neo.",
      "💊 There is no spoon. Only code."
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    exit: () => {
      onClose();
      return ["👋 Thanks for visiting Akshat's terminal! Come back soon!"];
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === '') {
      setHistory(prev => [...prev, 'akshat@portfolio:~$ ']);
      return;
    }

    if (commands[trimmedCmd as keyof typeof commands]) {
      const output = commands[trimmedCmd as keyof typeof commands]();
      setHistory(prev => [
        ...prev,
        `akshat@portfolio:~$ ${cmd}`,
        ...output,
        ''
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        `akshat@portfolio:~$ ${cmd}`,
        `Command '${cmd}' not found. Type 'help' for available commands.`,
        ''
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHistory([
        "🎉 Welcome to Akshat Sinha's Interactive Terminal v2.0",
        "🚀 Portfolio System initialized successfully",
        "💡 Type 'help' to see available commands",
        "⚡ Type 'about' to learn more about Akshat",
        ""
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  return (
    <>
      <div className="terminal-backdrop" onClick={onClose} />
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn-close" onClick={onClose}></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
          <div className="terminal-title">akshat@portfolio:~</div>
        </div>
        
        <div className="terminal-body" ref={terminalRef}>
          {history.map((line, index) => (
            <div key={index} className="terminal-line">
              {line}
            </div>
          ))}
          
          <div className="terminal-input-line">
            <span className="terminal-prompt">akshat@portfolio:~$ </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="terminal-input"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveTerminal;