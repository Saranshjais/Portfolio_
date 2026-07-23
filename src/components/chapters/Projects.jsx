import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store';

export default function Projects({ id }) {
  const setActiveShape = useStore(state => state.setActiveShape);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "Face Skin Analysis",
      category: "Computer Vision",
      desc: "Developed a computer vision model for facial skin analysis and detection, extracting actionable insights from image data.",
      tech: ["Python", "TensorFlow", "OpenCV"],
      link: "#",
      shape: "clusters"
    },
    {
      title: "Blinkit Dashboard",
      category: "Data Analytics",
      desc: "Interactive Power BI dashboard revealing critical sales and operational metrics.",
      tech: ["Power BI", "DAX"],
      link: "/projects/blinkit.html",
      shape: "barChart"
    },
    {
      title: "Airline Delays",
      category: "Data Visualization",
      desc: "Tableau visualization analyzing historical flight delay patterns and root causes.",
      tech: ["Tableau", "SQL"],
      link: "/projects/airline-tableau.html",
      shape: "galaxy"
    },
    {
      title: "Sentiment Analysis",
      category: "NLP Model",
      desc: "NLP model classifying social media text to gauge public sentiment dynamically.",
      tech: ["Python", "Scikit-learn"],
      link: "/projects/sentiment-analysis.html",
      shape: "clusters"
    }
  ];

  return (
    <section id={id} className="projects-section">
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div className="projects-header-container">
          <div className="mono" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>[02] SELECTED WORKS</div>
          <h2 style={{ fontSize: '2.5rem' }}>Impact Through Data</h2>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {projects.map((proj, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.div 
                key={proj.title}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setActiveShape(proj.shape);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setActiveShape('sphere');
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative'
                }}
              >
                {/* Hover Glow Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '1px', 
                    background: '#00f0ff',
                    transformOrigin: 'right'
                  }}
                />

                <a 
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'block', 
                    padding: '2.5rem 1rem', 
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div className="project-header">
                    <motion.h3 
                      animate={{ 
                        x: isHovered ? -20 : 0, 
                        color: isHovered ? '#ffffff' : '#a0a0a0' 
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, margin: 0 }}
                    >
                      {proj.title}
                    </motion.h3>
                    <span className="mono" style={{ fontSize: '0.8rem', color: isHovered ? '#00f0ff' : 'var(--text-secondary)', transition: 'color 0.3s' }}>
                      {proj.category}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="project-details">
                          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '60%', margin: 0 }}>
                            {proj.desc}
                          </p>
                          <div className="project-tech">
                            {proj.tech.map(t => (
                              <span key={t} className="mono" style={{ fontSize: '0.7rem', color: '#00f0ff', border: '1px solid rgba(0, 240, 255, 0.3)', padding: '4px 10px', borderRadius: '30px' }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
