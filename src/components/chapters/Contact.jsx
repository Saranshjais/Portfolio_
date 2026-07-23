import Reveal from '../ui/Reveal';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Contact({ id }) {
  return (
    <section id={id} style={{ minHeight: '80vh' }}>
      <div className="section-content">
        <Reveal>
          <div className="section-header text-center" style={{ textAlign: 'center' }}>
            <span className="section-number">04 // End</span>
            <h2 className="section-title">Let's Connect.</h2>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="contact-content">
            <p className="hero-desc" style={{ margin: '0 auto 2rem auto' }}>
              Currently open for new opportunities. Whether you have a question, a project proposal, or just want to discuss data, my inbox is open!
            </p>
            
            <a href="mailto:saranshjaiswal2401@gmail.com" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Say Hello
            </a>
            
            <div className="contact-links">
              <a href="https://github.com/Saranshjais" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/saransh-jaiswal-440496271" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:saranshjaiswal2401@gmail.com" className="contact-icon" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      
      <footer style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <p className="mono">Built with React & Framer Motion.</p>
        <p>&copy; {new Date().getFullYear()} Saransh Jaiswal.</p>
      </footer>
    </section>
  );
}
