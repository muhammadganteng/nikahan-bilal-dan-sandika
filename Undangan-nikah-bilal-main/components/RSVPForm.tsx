
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const RSVPForm: React.FC = () => {
  const [status, setStatus] = useState('');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 px-6"
    >
      <div className="bg-white border border-amber-100 p-8 rounded-3xl shadow-sm text-center">
        <h3 className="font-serif text-3xl text-amber-900 mb-6">Konfirmasi Kehadiran</h3>
        <p className="text-gray-500 text-sm mb-8 italic">Mohon kesediaannya untuk memberikan konfirmasi kehadiran Anda.</p>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Nama Lengkap" 
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <input 
            type="number" 
            placeholder="Jumlah Tamu" 
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-500"
          >
            <option value="">Status Kehadiran</option>
            <option value="hadir">Hadir</option>
            <option value="mungkin">Mungkin Hadir</option>
            <option value="tidak">Tidak Hadir</option>
          </select>
          <button className="w-full bg-amber-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-900 transition-colors mt-6">
            <Send size={18} />
            Kirim Konfirmasi
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default RSVPForm;
