import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, Camera, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { INITIAL_GALLERY } from '../data/initialData';
import { resolveAssetUrl, handleImageFallback } from '../utils/assetResolver';

export const Gallery = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [images, setImages] = useState<any[]>(() =>
        INITIAL_GALLERY.map(item => ({
            ...item,
            url: resolveAssetUrl(item.url, item.title)
        }))
    );
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
                if (data && data.length > 0 && !error) {
                    const resolved = data.map((item: any) => ({
                        ...item,
                        url: resolveAssetUrl(item.url, item.title)
                    }));
                    setImages(resolved);
                }
            } catch (err) {
                console.warn("DB error, fallback to local data");
            }
        };
        fetchImages();
    }, []);

    const categories = ['All', 'Sanctuary', 'Spring Pool', 'Highlands', 'Stays'];

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: images.length };
        categories.forEach((cat) => {
            if (cat !== 'All') {
                counts[cat] = images.filter((img) => img.category?.toLowerCase().includes(cat.toLowerCase())).length;
            }
        });
        return counts;
    }, [images]);

    const filteredImages = useMemo(() => {
        if (activeFilter === 'All') return images;
        return images.filter((img) => {
            if (!img.category) return true;
            return img.category.toLowerCase().includes(activeFilter.toLowerCase());
        });
    }, [activeFilter, images]);

    return (
        <section id="gallery" className="bg-brand-dark pt-24 sm:pt-28 md:pt-32 pb-24 md:pb-36 min-h-[100svh] relative overflow-hidden">
            {/* Ambient Background Radial Glows */}
            <div 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(197, 168, 128, 0.1) 0%, rgba(3, 4, 94, 0.05) 50%, transparent 70%)' }}
            />

            {/* Dynamic Full-Width Container synchronized with screen ratios */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                
                {/* Responsive Header: Compact, majestic & balanced */}
                <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-4 sm:mb-5">
                        <Camera size={13} className="text-[#C5A880]" />
                        <span 
                            className="text-[#C5A880] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Visual Chronicles • Clouds Village
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-light text-white leading-tight mb-4 tracking-tight drop-shadow-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Moments Captured <br className="hidden sm:inline" />
                        <span className="italic font-normal gradient-title">In the Mist</span>
                    </h1>

                    <p className="text-white/65 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
                        An uncurated glimpse into morning fog across cardamom fields, cold spring waters, and starlit campfire nights.
                    </p>
                </div>

                {/* Filter Tabs with Counters */}
                <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0B1226]/80 border border-white/10 max-w-full shadow-2xl">
                        {categories.map((cat) => {
                            const isSelected = activeFilter === cat;
                            const count = categoryCounts[cat] ?? 0;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`relative px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs tracking-[0.14em] uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                                        isSelected
                                            ? 'bg-[#C5A880] text-[#0B0E14] font-bold shadow-[0_0_20px_rgba(197,168,128,0.35)]'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <span>{cat}</span>
                                    {count > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                            isSelected ? 'bg-black/20 text-[#0B0E14] font-bold' : 'bg-white/10 text-white/50'
                                        }`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Screen-Synchronized Masonry Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 auto-rows-[250px] sm:auto-rows-[270px] lg:auto-rows-[300px] 2xl:auto-rows-[340px] grid-flow-dense"
                    >
                        {filteredImages.map((item, index) => {
                            let spanClass = 'col-span-1 row-span-1';
                            if (index % 7 === 0) spanClass = 'sm:col-span-2 sm:row-span-2';
                            else if (index % 5 === 0) spanClass = 'sm:col-span-2 sm:row-span-1';

                            return (
                                <div
                                    key={item.id || index}
                                    onClick={() => openLightbox([item.url], item.title || "Clouds Village Moment")}
                                    style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}
                                    className={`relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group border border-white/10 bg-brand-surface shadow-xl transform-gpu ${spanClass}`}
                                >
                                    {item.type === 'video' ? (
                                        <video 
                                            src={item.url} 
                                            className="w-full h-full object-cover" 
                                            muted 
                                            loop 
                                            onMouseOver={e => e.currentTarget.play()} 
                                            onMouseOut={e => e.currentTarget.pause()} 
                                        />
                                    ) : (
                                        <img
                                            src={item.url}
                                            alt={item.title || "Clouds Village"}
                                            onError={handleImageFallback}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading={index < 6 ? "eager" : "lazy"}
                                            decoding="async"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-10">
                                        <h4 
                                            className="text-lg sm:text-xl lg:text-2xl text-white font-medium drop-shadow-md group-hover:text-[#C5A880] transition-colors"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {item.title}
                                        </h4>
                                    </div>

                                    <div className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                                        <ZoomIn size={16} />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};