import { motion, useScroll, useTransform } from 'framer-motion';
import Scene from './components/ui/Scene';
import CustomCursor from './components/ui/CustomCursor';
import AudioPlayer from './components/ui/AudioPlayer';
import Hero from './components/chapters/Hero';
import About from './components/chapters/About';
import Skills from './components/chapters/Skills';
import Projects from './components/chapters/Projects';
import './index.css';

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  return (
    <div className="app-container">
      {/* 3D WebGL Background */}
      <Scene />
      <CustomCursor />
      <AudioPlayer />

      {/* UI Overlay */}
      <div className="ui-layer">
        
        {/* Floating Nav/Logo */}
        <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', zIndex: 50 }}>
          <div className="mono" style={{ fontSize: '1rem', letterSpacing: '2px' }}>SJ.</div>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI/ML Engineer</div>
        </nav>

        <main>
          <Hero id="hero" scrollOpacity={opacity} />
          <About id="about" />
          <Projects id="projects" />
        </main>
        
        <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }} className="mono">
          &copy; {new Date().getFullYear()} Saransh Jaiswal.
        </footer>
      </div>
    </div>
  );
}

export default App;
