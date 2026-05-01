import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Facilities } from './pages/Facilities';
import { Destinations } from './pages/Destinations';
import { Gallery } from './pages/Gallery';
import { ContactUs } from './pages/ContactUs';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { GalleryManager } from './pages/admin/GalleryManager';
import { DestinationManager } from './pages/admin/DestinationManager';
import { FacilityManager } from './pages/admin/FacilityManager';
import { HomeManager } from './pages/admin/HomeManager';
import { BookingManager } from './pages/admin/BookingManager';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  // Lightbox State (shared across components through props)
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [lightboxDirection, setLightboxDirection] = useState(0);

  const openLightbox = (images: string[], title: string) => {
    setLightboxImages(images);
    setLightboxIndex(0);
    setLightboxTitle(title);
    setLightboxDirection(0);
    setLightboxOpen(true);
  };

  const nextLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxDirection(1);
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevLightboxImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxDirection(-1);
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const PublicSite = () => (
    <div className="min-h-screen bg-brand-dark flex flex-col font-sans selection:bg-brand-cyan/30 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <section id="home"><Home openLightbox={openLightbox} /></section>
        <section id="about"><About /></section>
        <section id="facilities"><Facilities openLightbox={openLightbox} /></section>
        <section id="destinations"><Destinations /></section>
        <section id="gallery"><Gallery openLightbox={openLightbox} /></section>
        <section id="contact"><ContactUs /></section>
      </main>
      <Footer />
    </div>
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><GalleryManager /></ProtectedRoute>} />
        <Route path="/admin/destinations" element={<ProtectedRoute><DestinationManager /></ProtectedRoute>} />
        <Route path="/admin/facilities" element={<ProtectedRoute><FacilityManager /></ProtectedRoute>} />
        <Route path="/admin/home" element={<ProtectedRoute><HomeManager /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><BookingManager /></ProtectedRoute>} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Lightbox Modal */}
      <AnimatePresence>
        {
          lightboxOpen && lightboxImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md flex items-center justify-center pointer-events-auto"
              onClick={() => setLightboxOpen(false)}
            >
              {/* Top Bar with Title & Counter */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex flex-col">
                  <span className="text-brand-cyan font-bold tracking-[0.2em] text-xs uppercase mb-1">Gallery Overview</span>
                  <h3 className="font-display text-white text-2xl md:text-3xl font-bold">{lightboxTitle}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center justify-center px-4 py-2 rounded-full glass bg-white/10 text-white font-medium text-sm border border-white/20">
                    {lightboxIndex + 1} <span className="text-white/40 mx-2">/</span> {lightboxImages.length}
                  </div>
                  <button
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {lightboxImages.length > 1 && (
                <>
                  <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 z-50"
                    onClick={(e) => { e.stopPropagation(); prevLightboxImage(e); }}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 z-50"
                    onClick={(e) => { e.stopPropagation(); nextLightboxImage(e); }}
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              <motion.div
                className="relative w-full max-w-6xl px-4 md:px-24 h-[80vh] flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence initial={false} custom={lightboxDirection} mode="popLayout">
                  <motion.img
                    key={lightboxIndex}
                    src={lightboxImages[lightboxIndex]}
                    custom={lightboxDirection}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? 800 : dir < 0 ? -800 : 0,
                        opacity: 0,
                        scale: 0.9,
                      }),
                      center: {
                        zIndex: 1,
                        x: 0,
                        opacity: 1,
                        scale: 1,
                      },
                      exit: (dir: number) => ({
                        zIndex: 0,
                        x: dir < 0 ? 800 : dir > 0 ? -800 : 0,
                        opacity: 0,
                        scale: 0.9,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.4 }
                    }}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-auto"
                    alt={`${lightboxTitle} Image ${lightboxIndex + 1}`}
                  />
                </AnimatePresence>

                <div className="absolute bottom-[-3rem] left-0 right-0 flex justify-center gap-3">
                  {lightboxImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxDirection(idx > lightboxIndex ? 1 : -1);
                        setLightboxIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === lightboxIndex ? 'w-10 bg-brand-cyan shadow-[0_0_10px_rgba(0,163,196,0.8)]' : 'w-3 bg-white/30 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
}

export default App;
