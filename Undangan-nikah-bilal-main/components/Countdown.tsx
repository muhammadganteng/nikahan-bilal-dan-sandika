
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CountdownTime } from '../types';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center px-4 border-r last:border-0 border-white/10">
      <span className="text-2xl font-serif font-bold tracking-tight">{value.toString().padStart(2, '0')}</span>
      <span className="text-[7px] uppercase tracking-[0.3em] opacity-60 font-black mt-1">{label}</span>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#579BB1]/15 backdrop-blur-md text-white py-4 px-2 rounded-3xl border border-white/25 shadow-2xl flex items-center justify-center mx-auto w-fit"
    >
      <TimeBox value={timeLeft.days} label="Hari" />
      <TimeBox value={timeLeft.hours} label="Jam" />
      <TimeBox value={timeLeft.minutes} label="Menit" />
      <TimeBox value={timeLeft.seconds} label="Detik" />
    </motion.div>
  );
};

export default Countdown;
