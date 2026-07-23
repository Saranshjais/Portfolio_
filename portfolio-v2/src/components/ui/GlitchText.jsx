import './GlitchText.css';

export default function GlitchText({ text, as: Component = 'h1', className = '' }) {
  return (
    <Component className={`glitch-wrapper ${className}`} data-text={text}>
      {text}
    </Component>
  );
}
