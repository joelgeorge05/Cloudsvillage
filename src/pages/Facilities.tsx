import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';
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
    const [facilities, setFacilities] = useState<GalleryItem[]>(INITIAL_FACILITIES);
    const [activeCategory, setActiveCategory] = useState("All Collections");


    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                // Fetch from Supabase (optional, but we will force local data to show the legacy content)
                const { data, error } = await supabase.from('facilities').select('*').order('created_at', { ascending: false });
                
                // Forcing the use of INITIAL_FACILITIES so the legacy content is visible
                setFacilities(INITIAL_FACILITIES);
            } catch (err) {
                console.error(err);
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
            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-brand-surface pb-20 md:pb-32 overflow-hidden border-y border-white/5 min-h-[100svh] pt-32 md:pt-40"
        >
            {/* Abstract Background Glows */}
            <div className="hidden md:block absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full filter blur-[120px] opacity-40 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-30 pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-12 relative flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                        <span className="text-brand-cyan text-[10px] font-bold tracking-[0.2em] uppercase">Explore The Village</span>
                    </div>
                    <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
                        Facilities <span className="italic text-brand-cyan font-serif">&</span> Experiences
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                        Immerse yourself in our carefully curated amenities designed for ultimate comfort, thrilling adventure, and pure relaxation.
                    </p>
                </div>

                {/* Interactive Category Tabs - Frosted Glass Container */}
                <div className="w-full flex justify-start md:justify-center overflow-x-auto hide-scrollbar mb-16 pb-2 px-2">
                    <div className="flex items-center p-1.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] min-w-max">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`relative px-5 md:px-8 py-2.5 rounded-full font-medium text-[10px] md:text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${activeCategory === category
                                    ? 'text-brand-dark font-bold'
                                    : 'text-white/50 hover:text-white'
                                    }`}
                            >
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-[#48CAE4] rounded-full shadow-[0_0_15px_rgba(0,180,216,0.3)]"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10 block">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredGallery.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                            onClick={() => openLightbox([item.image_url], item.title)}
                            className="relative h-[400px] sm:h-[450px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-brand-cyan/40 hover:shadow-[0_15px_40px_rgba(0,180,216,0.2)] transition-all duration-500"
                        >
                            <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                            />

                            {/* Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                                <div>
                                    {item.badge && (
                                        <span className="inline-block glass bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-3">
                                            {item.badge}
                                        </span>
                                    )}
                                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3 group-hover:text-brand-cyan transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Action row on hover */}
                                    <div className="mt-5 flex items-center gap-2 text-brand-cyan text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        <Maximize2 size={16} /> 
                                        <span className="uppercase tracking-widest text-[10px]">View Image</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

    );
};