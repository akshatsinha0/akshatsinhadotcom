import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import LandingPage from "./components/LandingPage/LandingPage";
import Navigation from "./components/Navigation/Navigation";
import Contact from "./components/Contact/Contact";
import TerminalIcon from "./components/TerminalIcon/TerminalIcon";
const Description = React.lazy(
  () => import("./components/Description/Description")
);
const Experiences = React.lazy(
  () => import("./components/Sections/Experiences/Experiences")
);
const Projects = React.lazy(
  () => import("./components/Sections/Projects/Projects")
);
const Skills = React.lazy(() => import("./components/Sections/Skills/Skills"));
const Certifications = React.lazy(
  () => import("./components/Sections/Certifications/Certifications")
);
const Awards = React.lazy(() => import("./components/Sections/Awards/Awards"));
// Images page moved to standalone /images.html
const InteractiveTerminal = React.lazy(
  () => import("./components/InteractiveTerminal/InteractiveTerminal")
);
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState("description");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const el = document.querySelector(".top-color-patch") as HTMLElement | null;
    if (!el) return;
    const lightPalette = [
      "rgba(186,230,253,0.55)",
      "rgba(167,243,208,0.5)",
      "rgba(244,114,182,0.45)",
      "rgba(253,186,116,0.45)",
      "rgba(147,197,253,0.5)",
      "rgba(250,204,255,0.5)",
      "rgba(254,205,211,0.55)",
      "rgba(255,247,133,0.5)",
      "rgba(204,251,241,0.5)",
      "rgba(221,214,254,0.5)",
    ];
    const chroma = [
      "rgba(168,85,247,0.20)",
      "rgba(59,130,246,0.20)",
      "rgba(34,197,94,0.20)",
      "rgba(239,68,68,0.20)",
      "rgba(249,115,22,0.20)",
      "rgba(139,92,246,0.20)",
    ];
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    const apply = () => {
      el.style.setProperty("--c1", pick(lightPalette));
      el.style.setProperty("--c2", pick(lightPalette));
      el.style.setProperty("--c3", pick(lightPalette));
      el.style.setProperty("--c4", pick(lightPalette));
      el.style.setProperty("--c5", pick(lightPalette));
      const mix = [...chroma].sort(() => Math.random() - 0.5);
      el.style.setProperty("--c6", mix[0]);
      el.style.setProperty("--c7", mix[1]);
      el.style.setProperty("--c8", mix[2]);
      el.style.setProperty("--c9", mix[3]);
      el.style.setProperty("--c10", mix[4]);
      el.style.setProperty("--c11", mix[5]);
      el.style.setProperty(
        "--patch-speed",
        `${24 + Math.floor(Math.random() * 24)}s`
      );
    };
    apply();
    const id = setInterval(apply, 12000);
    return () => clearInterval(id);
  }, []);
  if (isLoading) return <LoadingScreen />;
  if (showLanding) return <LandingPage onEnter={() => setShowLanding(false)} />;
  return (
    <div className="app">
      <div className="top-color-patch" aria-hidden="true"></div>
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="main-content">
        <div className="section-container">
          <Suspense fallback={null}>
            {activeSection === "description" && <Description />}
            {activeSection === "experiences" && <Experiences />}
            {activeSection === "projects" && <Projects />}
            {activeSection === "skills" && <Skills />}
            {activeSection === "certifications" && <Certifications />}
            {activeSection === "awards" && <Awards />}
            {}
          </Suspense>
        </div>
      </main>
      <Contact />
      <TerminalIcon onClick={() => setIsTerminalOpen(true)} />
      <Suspense fallback={null}>
        {isTerminalOpen && (
          <InteractiveTerminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
export default App;
