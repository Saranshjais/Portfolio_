import { motion } from 'framer-motion';
import clsx from 'clsx';
import './Nav.css';

const navItems = [
  { id: 'hero', label: '00 // Start' },
  { id: 'about', label: '01 // Raw_Data' },
  { id: 'skills', label: '02 // Patterns' },
  { id: 'projects', label: '03 // Insights' },
  { id: 'contact', label: '04 // End' }
];

export default function Nav({ activeSection }) {
  return (
    <nav className="fixed-nav">
      <div className="nav-container">
        <a href="#hero" className="logo mono text-cyan">SJ.</a>
        
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={clsx('nav-link mono', isActive && 'active')}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="active-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
