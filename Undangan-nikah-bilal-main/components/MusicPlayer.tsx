
import React, { useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  url: string;
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ url, isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => console.log("Autoplay blocked"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <audio ref={audioRef} src={url} loop />
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center justify-center border border-gray-50 text-gray-700 transition-colors hover:bg-gray-50"
      >
        {isPlaying ? (
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Music size={22} className="text-sage" />
          </motion.div>
        ) : (
          <VolumeX size={20} className="text-gray-300" />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
