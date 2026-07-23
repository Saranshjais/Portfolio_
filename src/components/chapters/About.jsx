import { motion } from 'framer-motion';

export default function About({ id }) {
  return (
    <section id={id} className="about-section">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '800px' }}
      >
        <div className="mono" style={{ color: '#00f0ff', marginBottom: '1rem', letterSpacing: '2px' }}>[01] THE NARRATIVE</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, marginBottom: '3rem', letterSpacing: '-0.02em' }}>
          Decoding Complexity.
        </h2>
        
        <p className="about-text" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.25rem', lineHeight: '1.8', fontWeight: 300 }}>
          My journey began with a simple curiosity about how data shapes the world around us. As a Data Science graduate, I quickly learned that numbers without context are just noise.
        </p>
        <p className="about-text" style={{ color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.25rem', lineHeight: '1.8', fontWeight: 300 }}>
          Today, my focus is on transforming that chaotic raw data into clear, strategic narratives. From exploratory data analysis and feature engineering to training predictive models and crafting interactive dashboards, I handle the entire lifecycle.
        </p>
        
        <div className="about-grid">
          <div>
            <div className="mono" style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '1rem', letterSpacing: '1px' }}>CORE SKILLS</div>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Machine Learning, Data Visualization, NLP, Predictive Modeling</p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '1rem', letterSpacing: '1px' }}>TOOLKIT</div>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Python, SQL, React, Power BI, Tableau, Scikit-learn</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
