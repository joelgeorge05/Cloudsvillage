import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, Compass, Navigation } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { INITIAL_ATTRACTIONS } from '../data/initialData';

export interface Attraction {
    id: string | number;
    title: string;
    subtitle?: string;
    category?: string;
    description: string;
    image_url: string;
    distance: string;
    best_time?: string;
    trek_level?: string;
    highlights?: string[];
    tips?: string;
    map_link: string;
}

const CATEGORIES = ['All', 'Viewpoints & Treks', 'Waterfalls', 'Highland Escapes'] as const;

const CinematicAttractionCard: React.FC<{ attraction: Attraction; index: number }> = ({ attraction, index }) => {
    const isEven = index % 2 === 0;

    return (
        <article 
            style={{ contentVisibility: 'auto', containIntrinsicSize: '650px' }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-24 w-full mb-20 sm:mb-28 lg:mb-36 transform-gpu`}
        >
            {/* Image Side */}
            <div className="w-full lg:w-7/12 relative group overflow-hidden rounded-3xl lg:rounded-[2.5rem] h-[340px] sm:h-[440px] lg:h-[520px] xl:h-[580px] 2xl:h-[640px] border border-white/10 bg-brand-surface shadow-2xl">
                <img
                    src={attraction.image_url}
                    alt={attraction.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Luxury gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/25 to-transparent group-hover:via-transparent transition-colors duration-500" />
                
                {/* Number overlay */}
                <div 
                    className="absolute right-6 -bottom-6 font-serif text-[8rem] sm:text-[11rem] lg:text-[13rem] 2xl:text-[15rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* Distance & Category Badges on Image for Mobile */}
                <div className="absolute top-5 left-5 lg:hidden z-10 flex flex-wrap items-center gap-2">
                    <div 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-cyan/30 bg-[#070B19]/90 text-brand-cyan text-[10px] font-bold tracking-[0.22em] uppercase shadow-lg"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        <MapPin size={11} className="text-brand-cyan" />
                        <span>{attraction.distance}</span>
                    </div>
                    {attraction.category && (
                        <div 
                            className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-medium tracking-[0.2em] uppercase shadow-lg"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <span>{attraction.category}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-5/12 flex flex-col items-start px-2 sm:px-4 lg:px-6">
                
                {/* Desktop Distance & Category Header */}
                <div className="hidden lg:flex items-center gap-3 mb-4 flex-wrap">
                    <div 
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-cyan/30 bg-[#070B19]/90 text-brand-cyan shadow-sm"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        <MapPin size={12} className="text-brand-cyan" />
                        <span className="text-[11px] font-bold tracking-[0.25em] uppercase">{attraction.distance}</span>
                    </div>

                    {attraction.category && (
                        <span 
                            className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-[10px] font-medium tracking-[0.2em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            {attraction.category}
                        </span>
                    )}
                </div>
                
                {/* Subtitle / Poetic Tagline */}
                {attraction.subtitle && (
                    <span 
                        className="text-brand-cyan text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-2 block"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        {attraction.subtitle}
                    </span>
                )}

                {/* Destination Title */}
                <h2 
                    className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-white mb-4 sm:mb-6 font-light leading-tight drop-shadow-md"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {attraction.title}
                </h2>
                
                {/* Rich Narrative Paragraph */}
                <p className="text-white/75 text-sm sm:text-base leading-relaxed font-light mb-6 max-w-xl">
                    {attraction.description}
                </p>

                {/* Field Notes (Best Time & Trail Grade) */}
                {(attraction.best_time || attraction.trek_level) && (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6">
                        {attraction.best_time && (
                            <div className="flex flex-col">
                                <span 
                                    className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-semibold mb-1"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Optimal Timing
                                </span>
                                <span className="text-white/90 text-xs sm:text-sm font-light">
                                    {attraction.best_time}
                                </span>
                            </div>
                        )}
                        {attraction.trek_level && (
                            <div className="flex flex-col">
                                <span 
                                    className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-semibold mb-1"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Trail Profile
                                </span>
                                <span className="text-white/90 text-xs sm:text-sm font-light">
                                    {attraction.trek_level}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Key Signature Highlights */}
                {attraction.highlights && attraction.highlights.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                        <span 
                            className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Highlights:
                        </span>
                        {attraction.highlights.map((highlight, hIdx) => (
                            <span key={hIdx} className="inline-flex items-center text-xs text-white/70 font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/80 mr-2 shrink-0" />
                                {highlight}
                            </span>
                        ))}
                    </div>
                )}

                {/* Sanctuary Concierge Note */}
                {attraction.tips && (
                    <div className="w-full bg-white/[0.02] border-l-2 border-brand-cyan/70 pl-4 py-3 mb-7 rounded-r-xl">
                        <span 
                            className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-bold block mb-1"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Sanctuary Insider Note
                        </span>
                        <p className="text-white/65 text-xs font-light leading-relaxed italic">
                            "{attraction.tips}"
                        </p>
                    </div>
                )}

                {/* Dual Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                    <a
                        href={attraction.map_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-brand-dark text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        <span>Open in Google Maps</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                        href={`https://wa.me/919645464747?text=${encodeURIComponent(`Hi Clouds Village Concierge, I would like guidance on planning an excursion to ${attraction.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 hover:border-brand-cyan/30 bg-white/[0.03] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        <Compass size={13} className="text-brand-cyan/80" />
                        <span>Ask Concierge</span>
                    </a>
                </div>
            </div>
        </article>
    );
};

export const Destinations = () => {
    const [attractions, setAttractions] = useState<Attraction[]>(INITIAL_ATTRACTIONS);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const { data, error } = await supabase.from('destinations').select('*').order('created_at', { ascending: false });
                if (data && data.length > 0 && !error) {
                    const mergedData = data.map(dbItem => {
                        const localMatch = INITIAL_ATTRACTIONS.find(local => local.title === dbItem.title || local.id === dbItem.id);
                        return {
                            ...localMatch,
                            ...dbItem,
                            image_url: (!dbItem.image_url || !dbItem.image_url.startsWith('http')) && localMatch ? localMatch.image_url : dbItem.image_url,
                            subtitle: dbItem.subtitle || localMatch?.subtitle,
                            category: dbItem.category || localMatch?.category,
                            best_time: dbItem.best_time || localMatch?.best_time,
                            trek_level: dbItem.trek_level || localMatch?.trek_level,
                            highlights: dbItem.highlights || localMatch?.highlights,
                            tips: dbItem.tips || localMatch?.tips,
                        };
                    });
                    // Robust deduplication by normalized title so every destination appears exactly once
                    const seen = new Set<string>();
                    const deduplicatedData = mergedData.filter(item => {
                        const normalizedTitle = (item.title || '').trim().toLowerCase();
                        if (!normalizedTitle || seen.has(normalizedTitle)) return false;
                        seen.add(normalizedTitle);
                        return true;
                    });

                    // Order matching curated INITIAL_ATTRACTIONS sequence, followed by any custom additions
                    const sortedData = deduplicatedData.sort((a, b) => {
                        const idxA = INITIAL_ATTRACTIONS.findIndex(init => init.title.toLowerCase() === a.title.toLowerCase());
                        const idxB = INITIAL_ATTRACTIONS.findIndex(init => init.title.toLowerCase() === b.title.toLowerCase());
                        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                        if (idxA !== -1) return -1;
                        if (idxB !== -1) return 1;
                        return 0;
                    });

                    setAttractions(sortedData);
                }
            } catch (err) {
                console.warn("DB error, fallback to local data");
            }
        };
        fetchAttractions();
    }, []);

    const filteredAttractions = selectedCategory === 'All' 
        ? attractions 
        : attractions.filter(attr => attr.category === selectedCategory);

    return (
        <section id="destinations" className="bg-brand-dark pt-24 sm:pt-28 md:pt-32 pb-24 md:pb-36 min-h-[100svh] overflow-hidden relative">
            {/* Ambient Background Radial Glows */}
            <div 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(0, 180, 216, 0.12) 0%, rgba(3, 4, 94, 0.05) 50%, transparent 70%)' }}
            />

            {/* Dynamic Full-Width Container synchronized with screen ratios */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                
                {/* Premium Centered Header */}
                <div className="text-center mb-10 sm:mb-14 md:mb-16 flex flex-col items-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4 sm:mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        <span 
                            className="text-brand-cyan text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Highland Field Guide • Idukki Surroundings
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-white mb-4 font-light tracking-tight drop-shadow-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Explore the <span className="italic font-normal opacity-90 text-brand-cyan">Highlands</span>
                    </h1>

                    <p className="text-white/65 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
                        Discover the breathtaking terrain surrounding Clouds Village. From hidden cloud-bed viewpoints and wild multi-tiered forest waterfalls to historic tea estates, nature's finest sanctuaries are just a short journey away.
                    </p>

                    {/* Architectural Category Filter Tabs */}
                    <div 
                        className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            const count = cat === 'All' 
                                ? attractions.length 
                                : attractions.filter(a => a.category === cat).length;

                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 sm:px-5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                                        isSelected
                                            ? 'bg-brand-cyan text-brand-dark shadow-[0_0_20px_rgba(0,180,216,0.4)]'
                                            : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                                    }`}
                                >
                                    <span>{cat}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                                        isSelected ? 'bg-brand-dark/20 text-brand-dark font-extrabold' : 'bg-white/10 text-white/50'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cinematic Alternating Destinations List */}
                <div className="flex flex-col">
                    <AnimatePresence mode="popLayout">
                        {filteredAttractions.map((attr, idx) => (
                            <CinematicAttractionCard key={attr.id} attraction={attr} index={idx} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};