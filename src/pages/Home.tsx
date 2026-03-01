import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Waves, Compass, Landmark } from 'lucide-react';

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
    return (
        <section className="relative min-h-[100svh] md:h-[90vh] md:min-h-[700px] flex items-center justify-center overflow-hidden py-32 md:py-0">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <motion.video
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.currentTime = 0;
                        video.play();
                    }}
                >
                    <source src="/CLOUDS VILLAGE DAY.mp4" type="video/mp4" />
                </motion.video>
                {/* Multi-stop gradient for better text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark" />
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
                    className="font-display font-bold text-5xl md:text-8xl lg:text-9xl text-white leading-[1] mb-6 drop-shadow-2xl"
                >
                    Clouds <span className="text-gradient">Village</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/90 text-lg md:text-2xl font-light max-w-2xl mb-12 drop-shadow-md"
                >
                    Escape the ordinary. Experience luxury woven into nature at our exclusive retreat.
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
                                className="group relative px-6 py-4 rounded-full glass bg-brand-dark/40 border border-white/10 backdrop-blur-2xl shadow-2xl hover:bg-brand-dark/60 transition-all cursor-pointer flex items-center gap-5 hover:-translate-y-2 overflow-hidden w-full sm:w-auto min-w-[220px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/20 to-brand-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                                <div className="relative z-10 w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-500 shadow-[inset_0_0_15px_rgba(0,163,196,0.3)]">
                                    <item.icon size={22} strokeWidth={1.5} />
                                </div>

                                <div className="relative z-10 text-left">
                                    <span className="block text-white font-display font-medium text-lg leading-tight group-hover:text-brand-cyan transition-colors duration-300">{item.label}</span>
                                    <span className="block text-brand-cyan/70 text-[9px] font-bold tracking-[0.2em] uppercase mt-1">{item.desc}</span>
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
