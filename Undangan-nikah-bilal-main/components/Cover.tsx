
import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { GuestInfo } from '../types';
import { WEDDING_DATA } from '../constants';

interface CoverProps {
  guest: GuestInfo;
  onOpen: () => void;
}

const Cover: React.FC<CoverProps> = ({ guest, onOpen }) => {
  return (
    <div className="fixed inset-0 z-[100] max-w-[450px] mx-auto overflow-hidden pointer-events-none">
      {/* Pintu Kiri - soft blue-to-cream gradient */}
      <motion.div
        exit={{ x: '-100%', transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1] } }}
        className="absolute top-0 left-0 w-1/2 h-full door-gradient z-20 pointer-events-auto border-r border-white/10"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30">
          {/* Bagian dari segel akan menempel di pintu kiri */}
        </div>
      </motion.div>

      {/* Pintu Kanan - soft blue-to-cream gradient */}
      <motion.div
        exit={{ x: '100%', transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1] } }}
        className="absolute top-0 right-0 w-1/2 h-full door-gradient z-20 pointer-events-auto border-l border-white/10"
      />

      {/* Konten di tengah pintu (Segel & Info) */}
      <motion.div 
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="door-gradient p-12 flex flex-col items-center pointer-events-auto">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.4em] text-[10px] text-white/80 mb-6 font-medium"
          >
            The Wedding Of
          </motion.p>

          <motion.h1 
            className="font-serif text-4xl text-white mb-12 tracking-tight text-center"
          >
            {WEDDING_DATA.bride} &  {WEDDING_DATA.groom}
          </motion.h1>

          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full border-2 border-white/30 gradient-button text-[#F8F4EA] flex flex-col items-center justify-center shadow-2xl group transition-colors"
          >
            <MailOpen className="mb-1" size={24} />
            <span className="text-[10px] uppercase font-bold tracking-tighter">Buka</span>
          </motion.button>

          <div className="mt-12 text-center text-white">
            <p className="text-[9px] uppercase tracking-widest text-white/60 mb-2 font-medium">Kepada Yth:</p>
            <h2 className="text-xl font-serif mb-1">{guest.name}</h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cover;
