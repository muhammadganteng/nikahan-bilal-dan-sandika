
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Gift, Check } from 'lucide-react';
import { WEDDING_DATA } from '../constants';

interface DigitalGiftProps {
  onShowToast: (msg: string) => void;
}

const DigitalGift: React.FC<DigitalGiftProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num);
    setCopiedId(idx);
    onShowToast("Nomor rekening berhasil disalin");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 px-6 bg-accent"
    >
      <div className="text-center mb-10">
        <Gift className="mx-auto text-primary mb-4" size={32} />
        <h3 className="font-serif text-3xl text-[#579BB1] mb-2">Digital Gift</h3>
        <p className="text-gray-500 text-sm max-w-[280px] mx-auto italic text-center">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberi tanda kasih, dapat melalui:
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#E1D7C6]/60 overflow-hidden gradient-card">
        <div className="flex border-b border-[#ECE8DD]">
          {WEDDING_DATA.bankAccounts.map((account, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-4 text-xs font-bold tracking-widest transition-colors ${activeTab === idx ? 'text-[#579BB1] bg-[#ECE8DD]/70' : 'text-gray-400'}`}
            >
              {account.bank}
            </button>
          ))}
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-center"
            >
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Nomor Rekening</p>
              <p className="text-2xl font-serif text-[#579BB1] mb-1">{WEDDING_DATA.bankAccounts[activeTab].number}</p>
              <p className="text-primary font-medium text-xs mb-6">a/n {WEDDING_DATA.bankAccounts[activeTab].name}</p>
              
              <button
                onClick={() => handleCopy(WEDDING_DATA.bankAccounts[activeTab].number, activeTab)}
                className="inline-flex items-center gap-2 bg-[#ECE8DD] text-[#579BB1] px-6 py-2 rounded-full text-[10px] font-bold border border-[#E1D7C6]/50 hover:bg-[#E1D7C6]/60 transition-all uppercase tracking-widest"
              >
                {copiedId === activeTab ? <Check size={14} /> : <Copy size={14} />}
                {copiedId === activeTab ? 'Berhasil disalin' : 'Salin Nomor'}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default DigitalGift;
