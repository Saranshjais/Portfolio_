import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Attempt to play (might be blocked by browser if no user interaction yet)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay blocked by browser. User must click to play.");
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  // We can't guarantee autoplay, but we can try if the user has already interacted
  // This listener allows other parts of the app (like the "Explore Data" button) 
  // to fire a custom event to start the music.
  useEffect(() => {
    const handleStartAudio = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
      }
    };
    window.addEventListener('start-audio', handleStartAudio);
    return () => window.removeEventListener('start-audio', handleStartAudio);
  }, [isPlaying]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/bg-music.mp3" 
        loop 
        preload="auto" 
      />

      <span className="mono" style={{ 
        fontSize: '0.7rem', 
        color: isPlaying ? '#00f0ff' : 'var(--text-secondary)',
        opacity: 0.8,
        letterSpacing: '1px'
      }}>
        [ SOUND {isPlaying ? 'ON' : 'OFF'} ]
      </span>

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `1px solid ${isPlaying ? 'rgba(0, 240, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: isPlaying ? '#00f0ff' : '#fff'
        }}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
