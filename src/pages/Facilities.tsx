import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { INITIAL_FACILITIES } from '../data/initialData';
import { resolveAssetUrl, handleImageFallback } from '../utils/assetResolver';

export interface GalleryItem {
    id: string | number;
    title: string;
    description: string;
    image_url: string;
    category: string;
    badge?: string;
}

export const CATEGORIES = [
    "All Features", 
    "Accommodations", 
    "Natural Pools & Water", 
    "Farm Experiences", 
    "Dining", 
    "Events & Celebrations", 
    "Facilities"
];

export const Facilities = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [facilities, setFacilities] = useState<GalleryItem[]>(() =>
        INITIAL_FACILITIES.map(item => ({
            ...item,
            image_url: resolveAssetUrl(item.image_url, item.title)
        }))
    );
    const [activeCategory, setActiveCategory] = useState("All Features");

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const { data } = await supabase.from('facilities').select('*').order('created_at', { ascending: false });
                if (data && data.length > 0) {
                    // Filter out non-attractive generic office features (e.g. WiFi, Business Centre)
                    const attractiveDbItems = data.filter((item: any) => {
                        const titleLower = (item.title || '').toLowerCase();
                        return !titleLower.includes('wifi') && !titleLower.includes('business');
                    });

                    // Merge while strictly preserving curated luxury features, rich descriptions & gallery photos
                    const merged = INITIAL_FACILITIES.map(curated => {
                        const dbMatch = attractiveDbItems.find((d: any) => 
                            d.title?.trim().toLowerCase() === curated.title?.trim().toLowerCase()
                        );
                        return {
                            ...curated,
                            ...(dbMatch || {}),
                            // Guarantee valid high-resolution asset URL
                            image_url: resolveAssetUrl(dbMatch?.image_url || curated.image_url, curated.title)
                        };
                    });

                    // Append any newly added custom resort facilities from the DB
                    const customDbItems = attractiveDbItems
                        .filter((d: any) => !INITIAL_FACILITIES.some(c => c.title.toLowerCase() === d.title?.toLowerCase()))
                        .map((d: any) => ({
                            ...d,
                            image_url: resolveAssetUrl(d.image_url, d.title)
                        }));

                    setFacilities([...merged, ...customDbItems]);
                } else {
                    setFacilities(INITIAL_FACILITIES.map(item => ({
                        ...item,
                        image_url: resolveAssetUrl(item.image_url, item.title)
                    })));
                }
            } catch (err) {
                console.error("Using local curated initial data:", err);
                setFacilities(INITIAL_FACILITIES.map(item => ({
                    ...item,
                    image_url: resolveAssetUrl(item.image_url, item.title)
                })));
            }
        };
        fetchFacilities();
    }, []);

    // Category Counts calculation
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {
            "All Features": facilities.length,
        };
        facilities.forEach((item) => {
            counts[item.category] = (counts[item.category] || 0) + 1;
        });
        return counts;
    }, [facilities]);

    const filteredGallery = useMemo(() => {
        if (activeCategory === "All Features" || activeCategory === "All Collections") return facilities;
        return facilities.filter((item) => item.category === activeCategory);
    }, [activeCategory, facilities]);

    return (
        <section className="relative bg-brand-dark pb-24 md:pb-36 overflow-hidden min-h-[100svh] pt-24 sm:pt-28 md:pt-32 lg:pt-36">
            {/* High-Performance Vector Radial Glows (Zero GPU blur passes during scroll) */}
            <div 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(0, 180, 216, 0.12) 0%, rgba(3, 4, 94, 0.05) 50%, transparent 70%)' }}
            />
            <div 
                className="absolute bottom-1/4 right-0 w-[800px] h-[500px] pointer-events-none opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(72, 202, 228, 0.1) 0%, transparent 65%)' }}
            />

            {/* Dynamic Full-Width Container that synchronizes across all screen aspect ratios */}
            <div className="w-full max-w-[2200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                
                {/* Responsive Header: Compact, majestic & balanced */}
                <div className="text-center mb-8 sm:mb-12 flex flex-col items-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4 sm:mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        <span 
                            className="text-brand-cyan text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            The Sanctuary Experiences • Idukki
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-white mb-4 font-light tracking-tight drop-shadow-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Facilities <span className="italic font-normal opacity-90 text-brand-cyan">&</span> Details
                    </h1>

                    <p className="text-white/65 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                        Immerse yourself in our carefully curated amenities designed for ultimate comfort, thrilling mountain adventure, and pure highland tranquility.
                    </p>
                </div>

                {/* Dynamic Category Pill Bar with Item Counters */}
                <div className="w-full flex justify-center mb-8 sm:mb-12">
                    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0B1226]/80 border border-white/10 max-w-full overflow-x-auto hide-scrollbar shadow-2xl">
                        {CATEGORIES.map((category) => {
                            const isSelected = activeCategory === category;
                            const count = categoryCounts[category] || 0;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`relative px-3.5 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs tracking-[0.12em] uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                                        isSelected 
                                            ? 'text-brand-dark bg-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.35)]' 
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <span>{category}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${
                                        isSelected 
                                            ? 'bg-black/15 text-brand-dark font-bold' 
                                            : 'bg-white/10 text-white/50'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* DYNAMIC SCREEN-SYNCHRONIZED GRID LAYOUT */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* 1 ITEM: Panoramic Full-Width Spotlight Card */}
                        {filteredGallery.length === 1 && (
                            <div className="w-full">
                                {filteredGallery.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => openLightbox([item.image_url], item.title)}
                                        className="group relative rounded-3xl overflow-hidden border border-white/15 bg-brand-surface hover:border-brand-cyan/40 transition-all duration-500 cursor-pointer shadow-2xl min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 transform-gpu"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            loading="eager"
                                            decoding="async"
                                            onError={handleImageFallback}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-50% to-black/20 group-hover:from-black/98 transition-colors duration-500" />
                                        
                                        {/* Top Badges (High-performance solid tints, 0 GPU blur passes) */}
                                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className="inline-flex items-center bg-[#070B19]/90 border border-brand-cyan/40 text-brand-cyan text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow-md"
                                                    style={{ fontFamily: "var(--font-nav)" }}
                                                >
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="w-11 h-11 rounded-full bg-black/70 border border-white/25 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                                <Maximize2 size={18} />
                                            </div>
                                        </div>

                                        {/* Bottom Narrative */}
                                        <div className="relative z-10 max-w-3xl">
                                            <h2 
                                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-light drop-shadow-md group-hover:text-brand-cyan transition-colors duration-300 leading-tight"
                                                style={{ fontFamily: "var(--font-display)" }}
                                            >
                                                {item.title}
                                            </h2>
                                            <p className="text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6">
                                                {item.description}
                                            </p>
                                            <div 
                                                className="inline-flex items-center gap-2 text-brand-cyan text-xs sm:text-sm font-semibold tracking-widest uppercase group-hover:translate-x-1 transition-transform duration-300"
                                                style={{ fontFamily: "var(--font-nav)" }}
                                            >
                                                <span>Expand Gallery Showcase</span>
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 2 or 3 ITEMS: Balanced Panoramic Split Rows */}
                        {(filteredGallery.length === 2 || filteredGallery.length === 3) && (
                            <div className={`grid grid-cols-1 ${filteredGallery.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 lg:gap-8`}>
                                {filteredGallery.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        onClick={() => openLightbox([item.image_url], item.title)}
                                        className="group relative rounded-3xl overflow-hidden border border-white/10 bg-brand-surface hover:border-brand-cyan/40 transition-all duration-500 cursor-pointer shadow-xl h-[420px] sm:h-[460px] lg:h-[500px] flex flex-col justify-end p-6 sm:p-8 transform-gpu"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            loading="eager"
                                            decoding="async"
                                            onError={handleImageFallback}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-50% to-black/20 group-hover:from-black/98 transition-colors duration-500" />
                                        
                                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className="inline-flex items-center bg-[#070B19]/90 border border-brand-cyan/30 text-brand-cyan text-[10px] font-semibold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm"
                                                    style={{ fontFamily: "var(--font-nav)" }}
                                                >
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan/40 group-hover:scale-110 transition-all duration-300 shadow-md">
                                                <Maximize2 size={16} />
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h3 
                                                className="text-2xl sm:text-3xl lg:text-4xl text-white mb-3 font-light tracking-wide group-hover:text-brand-cyan transition-colors drop-shadow-md leading-tight"
                                                style={{ fontFamily: "var(--font-display)" }}
                                            >
                                                {item.title}
                                            </h3>
                                            <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-4">
                                                {item.description}
                                            </p>
                                            <div 
                                                className="flex items-center gap-2 text-brand-cyan text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                                style={{ fontFamily: "var(--font-nav)" }}
                                            >
                                                <span>View In Lightbox</span>
                                                <ArrowRight size={13} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 4+ ITEMS: Dynamic Screen-Synchronized Bento Grid with GPU Layer Isolation */}
                        {filteredGallery.length >= 4 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-rows-[280px] sm:auto-rows-[310px] md:auto-rows-[330px] lg:auto-rows-[350px] 2xl:auto-rows-[380px] gap-4 sm:gap-5 lg:gap-6 grid-flow-dense">
                                {filteredGallery.map((item, index) => {
                                    // Assign rhythmic bento box spans when viewing All Features
                                    let spanClass = "col-span-1 row-span-1";
                                    if (activeCategory === "All Features" || activeCategory === "All Collections") {
                                        if (index === 0) {
                                            spanClass = "sm:col-span-2 lg:col-span-2 sm:row-span-2"; // Featured 1: Natural Rock Spring Pool
                                        } else if (index === 2) {
                                            spanClass = "sm:col-span-2 xl:col-span-2 sm:row-span-1"; // Wide Panoramic 1: Moonlit Lawn Banquet (gal2)
                                        } else if (index === 5) {
                                            spanClass = "sm:col-span-2 lg:col-span-2 sm:row-span-2"; // Featured 2: 15-Acre Spice Plantation Trail (pic1)
                                        } else if (index === 6) {
                                            spanClass = "sm:col-span-2 xl:col-span-2 sm:row-span-1"; // Wide Panoramic 2: Estate Welcome Gateway (gal1)
                                        } else if (index === 11) {
                                            spanClass = "sm:col-span-2 lg:col-span-2 sm:row-span-2"; // Featured 3: Open-Air Gala Celebrations Pavilion (gal4)
                                        }
                                    }

                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => openLightbox([item.image_url], item.title)}
                                            style={{ contentVisibility: 'auto', containIntrinsicSize: '350px' }}
                                            className={`relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-brand-surface hover:border-brand-cyan/40 transition-all duration-500 shadow-lg transform-gpu ${spanClass}`}
                                        >
                                            {/* Photo with Hardware-Accelerated Smooth Ken Burns Hover */}
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                loading={index < 5 ? "eager" : "lazy"}
                                                decoding="async"
                                                onError={handleImageFallback}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            {/* High-contrast multi-stop luxury gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-50% to-black/15 group-hover:from-black/98 transition-colors duration-500" />

                                            {/* Top Metadata Badges (High-Performance Solid Tints) */}
                                            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between z-10 pointer-events-none">
                                                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                    <span 
                                                        className="inline-flex items-center bg-[#070B19]/90 border border-brand-cyan/30 text-brand-cyan text-[9px] sm:text-[10px] font-semibold px-2.5 sm:px-3 py-1 rounded-full tracking-widest uppercase shadow-sm"
                                                        style={{ fontFamily: "var(--font-nav)" }}
                                                    >
                                                        {item.category}
                                                    </span>
                                                </div>

                                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan/40 group-hover:scale-110 transition-all duration-300 shadow-md">
                                                    <Maximize2 size={14} />
                                                </div>
                                            </div>

                                            {/* Bottom Title & Description */}
                                            <div className="absolute inset-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end z-10">
                                                <h3 
                                                    className="text-xl sm:text-2xl lg:text-3xl text-white mb-1.5 sm:mb-2 font-light tracking-wide group-hover:text-brand-cyan transition-colors drop-shadow-md leading-snug"
                                                    style={{ fontFamily: "var(--font-display)" }}
                                                >
                                                    {item.title}
                                                </h3>

                                                <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-2 max-w-xl">
                                                    {item.description}
                                                </p>

                                                <div 
                                                    className="flex items-center gap-1.5 text-brand-cyan text-[11px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                                    style={{ fontFamily: "var(--font-nav)" }}
                                                >
                                                    <span>View Gallery</span>
                                                    <ArrowRight size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};