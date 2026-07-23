import { motion } from 'framer-motion';

export default function Hero({ id, scrollOpacity }) {
  return (
    <motion.section 
      id={id} 
      style={{ 
        opacity: scrollOpacity, 
        alignItems: 'center', 
        textAlign: 'center',
        padding: '0 5vw'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ maxWidth: '800px', width: '100%' }}
      >
        <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>Saransh Jaiswal</h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Data Scientist & AI Engineer
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Transforming chaotic data into predictive models and clear, strategic narratives. 
          Scroll to explore the neural core.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a 
            href="#about" 
            onClick={() => window.dispatchEvent(new Event('start-audio'))}
            style={{ padding: '0.75rem 1.5rem', background: '#ffffff', color: '#000000', borderRadius: '30px', fontWeight: 500, fontSize: '0.9rem' }}
          >
            Explore Data
          </a>
          <a href="/assets/resume/Saransh_Jaiswal.pdf" target="_blank" style={{ padding: '0.75rem 1.5rem', border: '1px solid var(--glass-border)', color: '#ffffff', borderRadius: '30px', fontWeight: 500, fontSize: '0.9rem' }}>
            View Resume
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
