import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Waves, Compass, Landmark } from 'lucide-react';
import { supabase } from '../lib/supabase';

import npool1 from '../assets/images/npool1.jpeg';
import npool2 from '../assets/images/npool2.jpeg';
import npool3 from '../assets/images/npool3.jpeg';
import npool4 from '../assets/images/npool4.jpeg';
import npool5 from '../assets/images/npool5.jpeg';
import npool6 from '../assets/images/npool6.jpeg';
import npool7 from '../assets/images/npool7.jpeg';
import heritage1 from '../assets/images/heritage1.jpeg';
import heritage2 from '../assets/images/heritage2.jpeg';

export const Home = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('settings').select('*').single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    const heroTitle = settings?.hero_title || "Clouds";
    const heroTitleItalic = settings?.hero_title_italic || "Village";
    const heroSubtitle = settings?.hero_subtitle || "Escape the ordinary. Experience luxury woven into nature at our exclusive retreat.";
    const bgVideo = settings?.bg_video_url || "/CLOUDS VILLAGE DAY.mp4";

    return (
        <section className="relative min-h-[100svh] md:h-[90vh] md:min-h-[700px] flex items-center justify-center overflow-hidden py-24 md:py-0">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <motion.video
                    key={bgVideo}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={bgVideo} type="video/mp4" />
                </motion.video>
                {/* Multi-stop cinematic gradient for better text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark opacity-90" />

                {/* Film Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-20 md:mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="h-[1px] w-12 bg-brand-cyan/50" />
                    <span className="text-brand-cyan text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase">Welcome to Paradise</span>
                    <div className="h-[1px] w-12 bg-brand-cyan/50" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] text-white leading-[0.9] mb-4 md:mb-8 drop-shadow-2xl tracking-tighter"
                >
                    {heroTitle} <span className="text-gradient italic font-light tracking-normal pr-4">{heroTitleItalic}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/80 text-[15px] sm:text-lg md:text-2xl font-light max-w-2xl mb-8 md:mb-12 shadow-black drop-shadow-md tracking-wide"
                >
                    {heroSubtitle}
                </motion.p>

                {/* Amenities Highlights Float - Stylish Redesign */}
                <div className="flex flex-col items-center mt-12 gap-8 w-full z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 w-full"
                    >
                        {[
                            { icon: Waves, label: "Natural Pool", desc: "Crystal Clear", images: [npool1, npool2, npool3, npool4, npool5, npool6, npool7] },
                            { icon: Compass, label: "Safari", desc: "Wild Encounters" },
                            { icon: Landmark, label: "Heritage", desc: "Local Culture", images: [heritage1, heritage2] },
                        ].map((item, idx) => (
                            <div
                                key={item.label}
                                onClick={() => item.images && openLightbox(item.images, item.label)}
                                className="group relative px-6 md:px-8 py-3 rounded-full glass bg-brand-dark/20 border border-white/5 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-brand-dark/40 hover:border-brand-cyan/30 transition-all duration-700 cursor-pointer flex items-center gap-4 hover:-translate-y-1 overflow-hidden w-full sm:w-auto min-w-[200px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/10 to-brand-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/70 group-hover:scale-105 group-hover:text-brand-cyan transition-all duration-500">
                                    <item.icon size={20} strokeWidth={1} />
                                </div>

                                <div className="relative z-10 text-left border-l border-white/10 pl-4 group-hover:border-brand-cyan/30 transition-colors duration-500">
                                    <span className="block text-white/90 font-sans font-light text-sm tracking-wide group-hover:text-white transition-colors duration-300">{item.label}</span>
                                    <span className="block text-brand-cyan/60 text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1"
                >
                    <div className="w-1 h-2 bg-brand-cyan rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};
