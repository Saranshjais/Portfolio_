import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectCard({ title, category, desc, tech, image, link }) {
  return (
    <div className="project-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', background: 'rgba(21, 21, 28, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
      
      <div style={{ flex: '0 0 40%', borderRight: '1px solid var(--border-color)' }}>
        <div className="card-header" style={{ background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="mac-dot red"></div>
          <div className="mac-dot yellow"></div>
          <div className="mac-dot green"></div>
        </div>
        <div style={{ height: '100%', minHeight: '300px', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>
      
      <div className="project-content" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="mono text-cyan" style={{ fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '1px' }}>{category}</span>
        <h3 className="project-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h3>
        <p className="project-desc" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 0 }}>{desc}</p>
        
        <div className="project-tech" style={{ marginBottom: '2rem' }}>
          {tech.map(t => (
            <span key={t} className="tech-tag" style={{ background: 'rgba(255,191,0,0.1)', padding: '4px 10px', borderRadius: '4px' }}>#{t}</span>
          ))}
        </div>
        
        <div className="project-links">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover-target" style={{ fontSize: '1.1rem', borderBottom: '1px solid var(--accent-cyan)', paddingBottom: '4px' }}>
              View Project <FaExternalLinkAlt size={14} style={{ marginLeft: '8px' }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
