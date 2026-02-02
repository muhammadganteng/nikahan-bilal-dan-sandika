
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, animate, useScroll } from 'framer-motion';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import Cover from './Undangan-nikah-bilal-main/components/Cover.tsx';
import MusicPlayer from './Undangan-nikah-bilal-main/components/MusicPlayer.tsx';
import Countdown from './Undangan-nikah-bilal-main/components/Countdown.tsx';
import DigitalGift from './Undangan-nikah-bilal-main/components/DigitalGift.tsx';
import RSVPForm from './Undangan-nikah-bilal-main/components/RSVPForm.tsx';
import { WEDDING_DATA } from './Undangan-nikah-bilal-main/constants.ts';
import { GuestInfo } from './Undangan-nikah-bilal-main/types.ts';

// Variabel Animasi Global
// Fixed: Explicitly typed 'ease' as a tuple to satisfy Framer Motion's BezierDefinition requirements.
const sectionReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasTriggeredZoom, setHasTriggeredZoom] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const zoomProgress = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Animasi Awan Melayang (Parallax)
  const cloud1X = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const cloud2X = useTransform(scrollYProgress, [0, 1], [50, -150]);

  // LOGIKA TRANSFORMASI INTRO
  const imageScale = useTransform(zoomProgress, [0, 0.6], [1, 20]);
  const imageOpacity = useTransform(zoomProgress, [0.5, 0.75], [1, 0]);
  const imageBlur = useTransform(zoomProgress, [0, 0.5], ["blur(0px)", "blur(30px)"]);

  const heroContentOpacity = useTransform(zoomProgress, [0, 0.35], [1, 0]);
  const heroContentScale = useTransform(zoomProgress, [0, 0.45], [1, 0.3]);
  const heroContentY = useTransform(zoomProgress, [0, 0.45], [0, -300]);

  const introOpacity = useTransform(zoomProgress, [0.65, 0.9], [0, 1]);
  const introScale = useTransform(zoomProgress, [0.65, 1], [0.9, 1]);
  const introY = useTransform(zoomProgress, [0.65, 1], [150, 0]);

  useEffect(() => {
    if (!isOpen || hasTriggeredZoom) return;

    const handleInitialScroll = (e: any) => {
      setHasTriggeredZoom(true);
      animate(zoomProgress, 1, {
        duration: 2.8,
        ease: [0.65, 0, 0.35, 1],
        onComplete: () => setIsAnimationComplete(true)
      });
    };

    window.addEventListener('wheel', handleInitialScroll, { once: true });
    window.addEventListener('touchmove', handleInitialScroll, { once: true });
    return () => {
      window.removeEventListener('wheel', handleInitialScroll);
      window.removeEventListener('touchmove', handleInitialScroll);
    };
  }, [isOpen, hasTriggeredZoom, zoomProgress]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className={`app-container relative gradient-intro ${isAnimationComplete ? 'overflow-y-auto' : 'overflow-hidden h-screen'}`} ref={containerRef}>
      <AnimatePresence>
        {!isOpen && <Cover guest={guestInfo} onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <MusicPlayer url={WEDDING_DATA.audioUrl} isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />

        {/* ULTRA-ZOOM SECTION (HERO) */}
        <div className="relative h-screen w-full bg-off-white">
          <div className="absolute inset-0 overflow-hidden">

            {/* BACKGROUND IMAGE ZOOM */}
            <motion.div
              style={{ scale: imageScale, opacity: imageOpacity, filter: imageBlur }}
              className="absolute inset-0 z-0 origin-center"
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
              <img
                src={WEDDING_DATA.heroImage}
                className="w-full h-full object-cover"
                alt="Hero Background"
              />
            </motion.div>

            {/* HERO CONTENT: NAMES & COUNTDOWN */}
            <motion.div
              style={{ opacity: heroContentOpacity, scale: heroContentScale, y: heroContentY }}
              className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isOpen ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px w-8 bg-white/30" />
                  <p className="font-script text-2xl text-white/90 text-3d">The Wedding Of</p>
                  <div className="h-px w-8 bg-white/30" />
                </div>

                <h1 className="font-serif text-5xl md:text-6xl tracking-[0.1em] uppercase mb-10 leading-tight drop-shadow-2xl text-white text-3d-strong">
                  {WEDDING_DATA.bride} <br /> <span className="font-signature lowercase text-6xl opacity-70">&</span> <br /> {WEDDING_DATA.groom}
                </h1>

                <div className="mb-10">
                  <Countdown targetDate={WEDDING_DATA.date} />
                </div>

                <div className="flex flex-col items-center">
                  <p className="font-bold tracking-[0.6em] text-[10px] uppercase drop-shadow-md text-white/80">15 . 02 . 2026</p>
                </div>
              </motion.div>

              {!hasTriggeredZoom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                  <p className="text-[7px] uppercase tracking-[0.6em] mb-1 font-bold">Slide Down</p>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-[1.2px] h-12 bg-gradient-to-b from-white to-transparent"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* INTRO CONTENT: SALAM & HADITS (AFTER ZOOM) */}
            <motion.div
              style={{ opacity: introOpacity, scale: introScale, y: introY }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-8 gradient-intro"
            >
              <div className="max-w-md mx-auto flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="mb-8 text-primary opacity-20 heart-3d"
                >
                  <Heart size={60} fill="currentColor" />
                </motion.div>

                <p className="font-serif text-3xl text-primary mb-6 italic text-3d">Assalamualaikum Wr.Wb.</p>
                <p className="text-gray-600 text-[13px] leading-loose mb-12 px-6 text-3d">
                  Tanya mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami.
                </p>

                <motion.div
                  className="relative py-14 px-8 gradient-soft rounded-[3rem] border border-[#579BB1]/10 shadow-sm max-w-[320px]"
                >
                  <p className="text-gray-500 text-[11px] leading-relaxed italic mb-6">
                    "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-4 bg-[#579BB1]/30" />
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">QS. Ar-Rum: 21</p>
                    <div className="h-px w-4 bg-[#579BB1]/30" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* CLOUD BRIDGE SECTION & PROFILES */}
        {isAnimationComplete && (
          <div className="relative z-40 bg-off-white">

            {/* FLOATING CLOUDS + DECORATIVE GARLAND (tree.png) */}
            <div className="h-32 relative overflow-hidden pointer-events-none -mt-10 mb-20">
              <motion.div
                style={{ x: cloud1X }}
                className="absolute -top-10 left-0 w-64 h-32 bg-[#579BB1]/8 blur-[60px] rounded-full"
              />
              <motion.div
                style={{ x: cloud2X }}
                className="absolute top-10 right-0 w-80 h-40 bg-[#ECE8DD]/60 blur-[80px] rounded-full"
              />
              <img
                src="/img/tree.png"
                alt=""
                className="absolute inset-0 w-full h-full object-contain object-center opacity-90 scale-110"
                aria-hidden
              />
            </div>

            <section className="relative px-6 space-y-48 pb-32">
              {/* Mempelai Wanita */}
              <motion.div {...sectionReveal} className="relative">
                <div className="flex justify-center mb-10">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-20px] border border-dashed border-[#579BB1]/20 rounded-full"
                    />
                    <div className="w-72 h-96 bg-white rounded-t-full overflow-hidden shadow-[0_20px_50px_rgba(87,155,177,0.08)] p-2 border border-[#579BB1]/10 relative z-10">
                      <img src={WEDDING_DATA.bridePhoto} className="w-full h-full object-cover rounded-t-full" alt={WEDDING_DATA.fullBrideName} />
                    </div>
                  </div>
                </div>
                <br />
                <div className="text-center">
                  <p className="font-script text-3xl text-primary mb-4">Mempelai Wanita</p>
                  <h3 className="font-serif text-3xl mb-4 text-[#579BB1] tracking-tight">{WEDDING_DATA.fullBrideName}</h3>
                  <p className="text-[12px] font-semibold text-gray-500 max-w-[200px] mx-auto leading-relaxed">
                    Putri Dari Bapak {WEDDING_DATA.brideParents.father} <br /> & Ibu {WEDDING_DATA.brideParents.mother}
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-center py-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <span className="font-signature text-9xl text-[#579BB1]/15">&</span>
                </motion.div>
              </div>

              {/* Mempelai Pria */}
              <motion.div {...sectionReveal} className="relative">
                <div className="flex justify-center mb-10">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-20px] border border-dashed border-[#579BB1]/20 rounded-full"
                    />
                    <div className="w-72 h-96 bg-white rounded-t-full overflow-hidden shadow-[0_20px_50px_rgba(87,155,177,0.08)] p-2 border border-[#579BB1]/10 relative z-10">
                      <img src={WEDDING_DATA.groomPhoto} className="w-full h-full object-cover rounded-t-full" alt={WEDDING_DATA.fullGroomName} />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-script text-3xl text-primary mb-4">Mempelai Pria</p>
                  <h3 className="font-serif text-3xl mb-4 text-[#579BB1] tracking-tight">{WEDDING_DATA.fullGroomName}</h3>
                  <p className="text-[12px] font-semibold text-gray-500 max-w-[200px] mx-auto leading-relaxed">
                    Putra Dari Bapak {WEDDING_DATA.groomParents.father} <br /> & Ibu {WEDDING_DATA.groomParents.mother}
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Agenda Kebahagiaan - accent section */}
            <section className="py-40 px-6 section-accent relative overflow-hidden">
              {/* Background soft gradient */}
              <motion.div
                animate={{ x: [0, 50, 0], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -right-20 top-20 w-64 h-64 bg-[#579BB1]/25 blur-[100px] rounded-full pointer-events-none"
              />

              <motion.div {...sectionReveal} className="text-center mb-24">
                <Sparkles className="mx-auto text-primary opacity-50 mb-4" size={24} />
                <h2 className="font-serif text-4xl mb-4 tracking-tight text-[#579BB1]">Agenda Kebahagiaan</h2>
                <div className="h-[1px] w-12 bg-[#579BB1]/30 mx-auto" />
              </motion.div>

              <div className="space-y-12 max-w-sm mx-auto">
                {[
                  { title: "Akad Nikah", data: WEDDING_DATA.locations.akad },
                  { title: "Resepsi", data: WEDDING_DATA.locations.resepsi }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="gradient-card p-10 rounded-[3rem] border border-[#579BB1]/10 text-center shadow-[0_10px_40px_rgba(87,155,177,0.06)] relative"
                  >
                    <h3 className="font-serif text-2xl mb-8 text-[#579BB1] tracking-wide">{item.title}</h3>
                    <div className="space-y-6 text-sm text-gray-600">
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-gray-800">{item.data.date}</p>
                        <p className="font-medium text-[#579BB1]/90">{item.data.time}</p>
                      </div>
                      <div className="pt-4 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-[#579BB1]/90">
                          <MapPin size={16} />
                          <p className="font-bold text-gray-800 text-[13px]">{item.data.place}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed">{item.data.address}</p>
                        <a href={item.data.mapUrl} target="_blank" className="mt-2 gradient-button px-10 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md transition-all active:scale-95 border-0">Buka Peta</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <DigitalGift onShowToast={showToast} />
            <RSVPForm />

            <footer className="py-40 px-10 text-center bg-off-white border-t border-[#ECE8DD] relative overflow-hidden">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute inset-0 bg-[#579BB1] rounded-full blur-[150px] -z-10"
              />
              <motion.div {...sectionReveal}>
                <p className="font-script text-4xl text-primary mb-6">Terima Kasih</p>
                <h4 className="font-serif text-4xl text-[#579BB1] tracking-[0.2em] uppercase mb-4">{WEDDING_DATA.bride} <br/>& <br/>{WEDDING_DATA.groom}</h4>
                <div className="h-px w-20 bg-[#579BB1]/25 mx-auto mb-4" />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">#TheWeddingOfBilalSandika</p>
              </motion.div>
            </footer>
          </div>
        )}
      </main>

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
