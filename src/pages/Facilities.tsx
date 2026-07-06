import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { INITIAL_FACILITIES } from '../data/initialData';

export interface GalleryItem {
    id: string | number;
    title: string;
    description: string;
    image_url: string;
    category: string;
    badge?: string;
}

export const CATEGORIES = ["All Collections", "Accommodations", "Facilities", "Dining", "Wellness", "Activities"];

export const Facilities = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [facilities, setFacilities] = useState<GalleryItem[]>([]);
    const [activeCategory, setActiveCategory] = useState("All Collections");

    useEffect(() => {
        const fetchFacilities = async () => {
            const { data } = await supabase.from('facilities').select('*').order('created_at', { ascending: false });
            if (data && data.length > 0) {
                setFacilities(data);
            } else {
                setFacilities(INITIAL_FACILITIES);
            }
        };
        fetchFacilities();
    }, []);

    const filteredGallery = activeCategory === "All Collections"
        ? facilities
        : facilities.filter(item => item.category === activeCategory);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-brand-surface py-20 md:py-32 overflow-hidden border-y border-white/5 min-h-[100svh] pt-24 md:pt-32 mt-16 md:mt-20"
        >
            {/* Abstract Background Glows */}
            <div className="hidden md:block absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full filter blur-[120px] opacity-40 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-30 pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass bg-brand-cyan/5 border border-brand-cyan/20 mb-6 md:mb-8"
                    >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-cyan animate-pulse" />
                        <span className="text-brand-cyan text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Signature Spaces</span>
                    </motion.div>

                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white mb-4 md:mb-6 drop-shadow-2xl">
                        Facilities <span className="text-white/30 italic font-light">&</span> Experiences
                    </h2>
                    <p className="text-white/50 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        Immerse yourself in our carefully curated amenities designed for ultimate comfort, thrilling adventure, and pure relaxation.
                    </p>
                </div>

                {/* Interactive Category Carousel Tabs */}
                <div className="flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-3 md:gap-5 mb-12 md:mb-16 pb-4 px-2 snap-x">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`snap-center shrink-0 px-6 md:px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-500 border relative overflow-hidden group ${activeCategory === category
                                ? 'text-brand-dark border-brand-cyan shadow-[0_0_20px_rgba(0,163,196,0.3)]'
                                : 'text-white/40 border-white/5 bg-white/[0.02] hover:border-white/20 hover:text-white hover:bg-white/5 hover:-translate-y-1'
                                }`}
                        >
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-gradient-to-r from-brand-cyan/80 via-[#00d4ff]/80 to-brand-cyan/80 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 block">{category}</span>
                        </button>
                    ))}
                </div>

                {/* Immersive Responsive Grid Showcase */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredGallery.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-brand-surface/30 backdrop-blur-xl hover:border-brand-cyan/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,163,196,0.15)] flex flex-col h-[480px]"
                            >
                                {/* Image showcase container */}
                                <div className="relative h-64 overflow-hidden shrink-0">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                    />
                                    {/* Glass gradient protection overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-85" />
                                    
                                    {/* Category badge */}
                                    <div className="absolute bottom-4 left-6 bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                                        {item.category}
                                    </div>
                                    
                                    {/* Action badges */}
                                    {item.badge && (
                                        <div className="absolute top-4 left-6 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#E5C158] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158] animate-pulse" />
                                            {item.badge}
                                        </div>
                                    )}

                                    {/* Floating Zoom overlay button */}
                                    <button
                                        onClick={() => openLightbox([item.image_url], item.title)}
                                        className="absolute top-4 right-6 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-brand-dark hover:scale-110 cursor-pointer"
                                        title="View Fullscreen"
                                    >
                                        <Maximize2 size={16} />
                                    </button>
                                </div>

                                {/* Details / Card Body */}
                                <div className="p-8 flex flex-col justify-between flex-grow bg-brand-surface/20">
                                    <div className="space-y-3">
                                        <h3 className="font-display font-bold text-2xl text-white group-hover:text-brand-cyan transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-light">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Bottom interactive row */}
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                        <button
                                            onClick={() => openLightbox([item.image_url], item.title)}
                                            className="text-brand-cyan text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors cursor-pointer group-hover:underline decoration-brand-cyan underline-offset-4"
                                        >
                                            Explore Gallery
                                        </button>
                                        
                                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-brand-cyan group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/10 transition-all duration-500">
                                            <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
};
