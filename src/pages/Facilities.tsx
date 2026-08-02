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
                <div className="text-center mb-16 md:mb-24 relative">


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
                                ? 'text-brand-dark border-brand-cyan shadow-[0_0_20px_rgba(0, 180, 216,0.3)]'
                                : 'text-white/40 border-white/5 bg-white/[0.02] hover:border-white/20 hover:text-white hover:bg-white/5 hover:-translate-y-1'
                                }`}
                        >
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-gradient-to-r from-brand-cyan/80 via-[#48CAE4]/80 to-brand-cyan/80 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 block">{category}</span>
                        </button>
                    ))}
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