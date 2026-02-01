
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, MapPin, Copy, Flower2, Flower } from 'lucide-react';
import Cover from './components/Cover';
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';
import DigitalGift from './components/DigitalGift';
import RSVPForm from './components/RSVPForm';
import { WEDDING_DATA } from './constants';
import { GuestInfo } from './types';
import trueLoveSong from './True Love_Maher Zain [Music Box].mp3';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Menggunakan smooth spring agar transisi zoom tidak patah-patah
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // LOGIKA ULTRA-ZOOM EKSTREM
  // Skala ditingkatkan ke 12x untuk efek "menembus" foto
  const imageScale = useTransform(smoothProgress, [0, 0.45], [1, 15]);
  const imageOpacity = useTransform(smoothProgress, [0.4, 0.55], [1, 0]);
  const imageBlur = useTransform(smoothProgress, [0, 0.4], ["blur(0px)", "blur(12px)"]);
  
  // Teks Hero (Nama) - Menghilang lebih cepat dengan efek menjauh
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const heroTextScale = useTransform(smoothProgress, [0, 0.3], [1, 0.5]);
  const heroTextY = useTransform(smoothProgress, [0, 0.3], [0, -100]);

  // Konten Salam & Hadist - Muncul dari kecil ke normal (efek mendekat)
  const introOpacity = useTransform(smoothProgress, [0.45, 0.7], [0, 1]);
  const introScale = useTransform(smoothProgress, [0.45, 0.75], [0.8, 1]);
  const introY = useTransform(smoothProgress, [0.45, 0.75], [50, 0]);

  const guestInfo: GuestInfo = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      name: params.get('to') || 'Tamu Undangan',
      session: parseInt(params.get('s') || '1', 10),
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    // Smooth scroll ke atas saat dibuka
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="app-container relative" ref={containerRef}>
      <AnimatePresence>
        {!isOpen && <Cover guest={guestInfo} onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <MusicPlayer url={trueLoveSong} isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />

        {/* SECTION 1 & 2: STICKY ULTRA-ZOOM CONTAINER */}
        <div className="relative h-[350vh]">
          <div className="sticky top-0 h-screen overflow-hidden bg-white">
            
            {/* BACKGROUND IMAGE ZOOM WITH BLUR */}
            <motion.div 
              style={{ scale: imageScale, opacity: imageOpacity, filter: imageBlur }}
              className="absolute inset-0 z-0 origin-center"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img 
                src={WEDDING_DATA.heroImage} 
                className="w-full h-full object-cover" 
                alt="Hero Background" 
              />
            </motion.div>
            
            {/* HERO CONTENT (NAMA) */}
            <motion.div 
              style={{ opacity: heroTextOpacity, scale: heroTextScale, y: heroTextY }}
              className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isOpen ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <p className="font-script text-3xl md:text-4xl mb-4 text-white/90 drop-shadow-md">
                  The Wedding Of
                </p>
                
                <h1 className="font-serif text-5xl md:text-7xl tracking-[0.1em] uppercase mb-8 leading-tight drop-shadow-2xl">
                  {WEDDING_DATA.bride} <span className="font-signature lowercase text-6xl opacity-70">&</span> <br /> {WEDDING_DATA.groom}
                </h1>

                <div className="flex flex-col items-center">
                  <div className="h-[1px] w-24 bg-white/40 mb-4" />
                  <p className="font-bold tracking-[0.5em] text-xs uppercase drop-shadow-md">
                    12 . 08 . 2026
                  </p>
                  <div className="h-[1px] w-24 bg-white/40 mt-4" />
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50"
              >
                <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1">
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1 h-1 bg-white rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* INTRO CONTENT (SALAM & HADIST) - FADES IN AS YOU GO THROUGH THE IMAGE */}
            <motion.div 
              style={{ opacity: introOpacity, scale: introScale, y: introY }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-8 bg-white"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   className="mb-10"
                >
                   <Countdown targetDate={WEDDING_DATA.date} />
                </motion.div>
                
                <p className="font-serif text-2xl text-sage mb-6 italic">Assalamualaikum Wr.Wb.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-12 px-4">
                  Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.
                </p>

                <div className="relative py-14 px-8 bg-[#f9fbf9] rounded-[3rem] border border-sage/5 shadow-inner">
                  <Heart className="mx-auto text-sage/20 mb-6" size={40} fill="currentColor" />
                  <p className="text-gray-500 text-xs leading-loose mb-6 italic">
                    "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                  </p>
                  <p className="text-[10px] font-bold text-sage uppercase tracking-[0.3em]">QS. Ar-Rum: 21</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 3: PROFIL MEMPELAI - dengan hiasan bunga */}
        <section className="relative py-32 px-6 space-y-40 bg-[#FCFAF7] z-40 rounded-t-[4rem] shadow-[0_-30px_60px_rgba(0,0,0,0.05)] -mt-16 overflow-hidden">
          {/* Dekorasi bunga background */}
          <div className="pointer-events-none absolute inset-0">
            <Flower2 className="absolute top-8 left-4 w-10 h-10 text-rose-200/60 rotate-12" />
            <Flower className="absolute top-20 right-6 w-8 h-8 text-sage/30 -rotate-6" />
            <Flower2 className="absolute top-1/3 right-2 w-6 h-6 text-pink-200/50 rotate-[-20deg]" />
            <Flower className="absolute bottom-1/3 left-2 w-7 h-7 text-amber-200/50 rotate-45" />
            <Flower2 className="absolute bottom-32 right-8 w-9 h-9 text-rose-100/70 -rotate-12" />
            <Flower className="absolute bottom-20 left-6 w-8 h-8 text-sage/25 rotate-[-15deg]" />
          </div>

          {/* Bilal - Mempelai Wanita */}
          <motion.div {...fadeInUp} className="relative">
            {/* Bunga sekitar kartu mempelai wanita */}
            <Flower2 className="absolute -top-2 -left-2 z-10 w-12 h-12 text-rose-300/80 rotate-[-15deg]" />
            <Flower className="absolute -top-1 right-4 z-10 w-10 h-10 text-pink-200/70 rotate-12" />
            <Flower2 className="absolute top-1/3 -left-1 z-10 w-8 h-8 text-sage/40 rotate-45" />
            <Flower className="absolute top-1/3 -right-1 z-10 w-9 h-9 text-amber-200/60 -rotate-6" />
            <Flower2 className="absolute -bottom-4 left-8 z-10 w-11 h-11 text-rose-200/70 rotate-6" />
            <Flower className="absolute -bottom-4 right-10 z-10 w-9 h-9 text-pink-200/60 -rotate-12" />
            <div className="w-full aspect-[4/5] bg-white rounded-t-full overflow-hidden shadow-2xl p-2 border border-sage/10 relative">
              <img src={WEDDING_DATA.bridePhoto} className="w-full h-full object-cover rounded-t-full" alt="Bilal" />
            </div>
            <div className="absolute -bottom-24 left-4 right-4 text-center px-6 bg-white/95 backdrop-blur-md py-10 rounded-[2.5rem] shadow-2xl border border-sage/5">
              <p className="font-script text-3xl text-sage mb-3">Mempelai Wanita</p>
              <h3 className="font-serif text-3xl mb-4 text-gray-800 tracking-tight">{WEDDING_DATA.fullBrideName}</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 font-bold">Putri Dari:</p>
              <p className="text-sm font-semibold text-gray-700 leading-relaxed">Bapak {WEDDING_DATA.brideParents.father} <br /> & Ibu {WEDDING_DATA.brideParents.mother}</p>
            </div>
          </motion.div>

          <div className="flex justify-center py-10 relative">
            <Flower2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-sage/20 rotate-0" />
            <motion.span 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="font-signature text-9xl text-sage/10 select-none relative z-10"
             >&</motion.span>
          </div>

          {/* Sandika - Mempelai Pria */}
          <motion.div {...fadeInUp} className="relative">
            <Flower className="absolute -top-2 -right-2 z-10 w-12 h-12 text-sage/50 rotate-12" />
            <Flower2 className="absolute -top-1 left-4 z-10 w-10 h-10 text-amber-200/70 -rotate-6" />
            <Flower className="absolute top-1/3 -right-1 z-10 w-8 h-8 text-rose-200/50 rotate-[-20deg]" />
            <Flower2 className="absolute top-1/3 -left-1 z-10 w-9 h-9 text-pink-200/50 rotate-6" />
            <Flower className="absolute -bottom-4 right-8 z-10 w-11 h-11 text-sage/40 -rotate-12" />
            <Flower2 className="absolute -bottom-4 left-10 z-10 w-9 h-9 text-amber-200/60 rotate-6" />
            <div className="w-full aspect-[4/5] bg-white rounded-t-full overflow-hidden shadow-2xl p-2 border border-sage/10 relative">
              <img src={WEDDING_DATA.groomPhoto} className="w-full h-full object-cover rounded-t-full" alt="Sandika" />
            </div>
            <div className="absolute -bottom-24 left-4 right-4 text-center px-6 bg-white/95 backdrop-blur-md py-10 rounded-[2.5rem] shadow-2xl border border-sage/5">
              <p className="font-script text-3xl text-sage mb-3">Mempelai Pria</p>
              <h3 className="font-serif text-3xl mb-4 text-gray-800 tracking-tight">{WEDDING_DATA.fullGroomName}</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 font-bold">Putra Dari:</p>
              <p className="text-sm font-semibold text-gray-700 leading-relaxed">Bapak {WEDDING_DATA.groomParents.father} <br /> & Ibu {WEDDING_DATA.groomParents.mother}</p>
            </div>
          </motion.div>
        </section>

        {/* Agenda Kebahagiaan - lebih hidup, ceria, colorful */}
        <section className="py-40 px-6 z-40 relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-rose-50/50 to-sage/5">
          {/* Dekorasi background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-10 left-6 w-24 h-24 rounded-full bg-rose-200/20 blur-2xl" />
            <div className="absolute top-1/4 right-4 w-20 h-20 rounded-full bg-amber-200/30 blur-2xl" />
            <div className="absolute bottom-1/4 left-8 w-28 h-28 rounded-full bg-sage/10 blur-2xl" />
            <Flower2 className="absolute top-16 right-12 w-10 h-10 text-rose-200/40 rotate-12" />
            <Flower className="absolute bottom-24 left-10 w-8 h-8 text-amber-300/40 -rotate-6" />
          </div>
          <div className="text-center mb-20 relative z-10">
            <h2 className="font-serif text-4xl mb-4 tracking-tight bg-gradient-to-r from-emerald-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">Agenda Kebahagiaan</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-sage/50 to-transparent mx-auto rounded-full" />
          </div>

          <div className="space-y-16 max-w-sm mx-auto relative z-10">
            {/* Akad Card - colorful */}
            <motion.div {...fadeInUp} className="relative overflow-hidden group rounded-[3rem] shadow-xl border border-rose-100/80 bg-gradient-to-br from-white via-rose-50/30 to-amber-50/40 p-10 text-center">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                <Heart size={80} className="text-rose-300" />
              </div>
              <div className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-amber-200/20 blur-xl" />
              <h3 className="font-serif text-3xl mb-8 bg-gradient-to-r from-sage to-emerald-700 bg-clip-text text-transparent">Akad Nikah</h3>
              <div className="space-y-6 text-sm text-gray-600">
                <div className="space-y-1">
                  <p className="font-bold text-gray-800 uppercase tracking-[0.2em] text-[10px]">Hari / Tanggal</p>
                  <p className="font-medium text-lg text-gray-700">{WEDDING_DATA.locations.akad.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-800 uppercase tracking-[0.2em] text-[10px]">Waktu</p>
                  <p className="font-medium text-lg text-gray-700">{WEDDING_DATA.locations.akad.time}</p>
                </div>
                <div className="pt-4 flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-sage">
                       <MapPin size={18} />
                       <span className="font-bold text-gray-800">{WEDDING_DATA.locations.akad.place}</span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-[200px]">{WEDDING_DATA.locations.akad.address}</p>
                  </div>
                  <a 
                    href={WEDDING_DATA.locations.akad.mapUrl} 
                    target="_blank" 
                    className="bg-gradient-to-r from-sage to-emerald-700 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-emerald-300/50 hover:scale-[1.02] transition-all"
                  >
                    Lihat Peta
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Resepsi Card - colorful */}
            <motion.div {...fadeInUp} className="relative overflow-hidden group rounded-[3rem] shadow-xl border border-amber-100/80 bg-gradient-to-br from-white via-amber-50/30 to-rose-50/40 p-10 text-center">
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-rose-200/20 blur-xl" />
              <h3 className="font-serif text-3xl mb-8 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Resepsi</h3>
              <div className="space-y-6 text-sm text-gray-600">
                <div className="space-y-1">
                  <p className="font-bold text-gray-800 uppercase tracking-[0.2em] text-[10px]">Hari / Tanggal</p>
                  <p className="font-medium text-lg text-gray-700">{WEDDING_DATA.locations.resepsi.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-800 uppercase tracking-[0.2em] text-[10px]">Waktu</p>
                  <p className="font-medium text-lg text-gray-700">{WEDDING_DATA.locations.resepsi.time}</p>
                </div>
                <div className="pt-4 flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-sage">
                       <MapPin size={18} />
                       <span className="font-bold text-gray-800">{WEDDING_DATA.locations.resepsi.place}</span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-[200px]">{WEDDING_DATA.locations.resepsi.address}</p>
                  </div>
                  <a 
                    href={WEDDING_DATA.locations.resepsi.mapUrl} 
                    target="_blank" 
                    className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-rose-300/50 hover:scale-[1.02] transition-all"
                  >
                    Lihat Peta
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gift & RSVP */}
        <DigitalGift onShowToast={showToast} />
        <RSVPForm />

        {/* Footer */}
        <footer className="py-40 px-10 text-center bg-[#FCFAF7] border-t border-gray-100 z-40 relative">
          <motion.div {...fadeInUp}>
            <p className="font-script text-4xl text-sage mb-6">Terima Kasih</p>
            <p className="text-gray-500 text-sm mb-16 italic leading-relaxed max-w-xs mx-auto">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
            <h4 className="font-serif text-4xl text-gray-800 uppercase tracking-[0.15em] mb-4">{WEDDING_DATA.bride} & {WEDDING_DATA.groom}</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">#TheWeddingOfBilalSandika</p>
          </motion.div>
        </footer>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[200] bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-[10px] font-bold shadow-2xl tracking-widest uppercase"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
