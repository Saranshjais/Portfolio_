import { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function HoverImageReveal({ title, category, image, link }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  // Spring physics for smooth cursor following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovered && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position relative to the container center
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, x, y]);

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', padding: '2rem 0', borderBottom: '1px solid var(--text-muted)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hover-target"
    >
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 6rem)', 
              color: isHovered ? 'var(--accent-color)' : 'var(--text-primary)',
              transition: 'color 0.3s ease',
              margin: 0
            }}
          >
            {title}
          </h2>
          <span className="mono" style={{ color: 'var(--text-muted)' }}>[{category}]</span>
        </div>
      </a>

      {/* Floating Image */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '250px',
          pointerEvents: 'none',
          zIndex: 10,
          x,
          y,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? (x.get() * 0.05) : 0 // subtle rotation based on velocity/position
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <img 
          src={image} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }}
        />
      </motion.div>
    </div>
  );
}
