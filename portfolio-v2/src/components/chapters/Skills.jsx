import Reveal from '../ui/Reveal';
import SkillTag from '../ui/SkillTag';
import ParallaxSkill from '../ui/ParallaxSkill';

export default function Skills({ id }) {
  const categories = [
    {
      title: "Languages",
      skills: ["Python", "SQL", "JavaScript", "HTML/CSS"]
    },
    {
      title: "ML / Data Science",
      skills: ["Scikit-learn", "Pandas", "NumPy", "NLP", "SciPy"]
    },
    {
      title: "Visualization",
      skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn"]
    },
    {
      title: "Tools & Environments",
      skills: ["Jupyter", "Git", "GitHub", "Vite"]
    }
  ];

  return (
    <section id={id}>
      <div className="section-content">
        <Reveal>
          <div className="section-header">
            <span className="section-number">02 // Patterns</span>
            <h2 className="section-title">The Toolkit.</h2>
          </div>
        </Reveal>
        
        <div className="skills-grid" style={{ marginTop: '4rem' }}>
          {categories.map((cat, index) => (
            <ParallaxSkill key={cat.title} offset={index % 2 === 0 ? 80 : -80}>
              <Reveal delay={0.1 * (index + 1)}>
                <div className="skill-category" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                  <h3 className="skill-category-title">{'>'} {cat.title}</h3>
                  <div className="tags-container">
                    {cat.skills.map(skill => (
                      <SkillTag key={skill} name={skill} />
                    ))}
                  </div>
                </div>
              </Reveal>
            </ParallaxSkill>
          ))}
        </div>
      </div>
    </section>
  );
}
