
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../constants';

interface EventDetailsProps {
  session: number;
}

const Card = ({ title, data }: { title: string, data: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white border border-[#E1D7C6]/50 rounded-[2.5rem] p-10 shadow-sm text-center relative mb-12 overflow-hidden gradient-card"
  >
    <h3 className="font-serif text-3xl text-[#579BB1] mb-8">{title}</h3>
    
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-[#ECE8DD] rounded-full flex items-center justify-center text-primary mb-3">
          <Calendar size={20} />
        </div>
        <p className="text-gray-800 font-semibold tracking-wide">Sabtu, 12 Desember 2026</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-[#ECE8DD] rounded-full flex items-center justify-center text-primary mb-3">
          <Clock size={20} />
        </div>
        <p className="text-gray-800 font-medium">{data.time}</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-[#ECE8DD] rounded-full flex items-center justify-center text-primary mb-3">
          <MapPin size={20} />
        </div>
        <p className="text-gray-900 font-bold text-lg leading-tight">{data.place}</p>
        <p className="text-gray-400 text-xs mt-2 leading-relaxed max-w-[220px]">{data.address}</p>
      </div>

      <motion.a
        href={data.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex items-center gap-2 gradient-button px-10 py-4 rounded-full text-[10px] font-bold shadow-lg transition-all uppercase tracking-widest border-0"
      >
        <ExternalLink size={14} />
        Buka Google Maps
      </motion.a>
    </div>
  </motion.div>
);

const EventDetails: React.FC<EventDetailsProps> = ({ session }) => {
  return (
    <section className="py-24 px-6 bg-off-white">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl text-[#579BB1]"
        >
          Agenda Acara
        </motion.h2>
        <div className="h-[1px] w-16 bg-[#579BB1]/30 mx-auto mt-6" />
      </div>

      <div className="max-w-[400px] mx-auto">
        {session === 1 && <Card title="Akad Nikah" data={WEDDING_DATA.locations.akad} />}
        <Card title="Resepsi Pernikahan" data={WEDDING_DATA.locations.resepsi} />
      </div>
    </section>
  );
};

export default EventDetails;
