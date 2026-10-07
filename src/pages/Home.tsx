import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Calendar, Users, ArrowRight, ArrowUpRight, Star, ChevronLeft, ChevronRight,
    ChevronDown, Check, Droplets, TreePine, Flame, Compass, Maximize2, CheckCircle2, MapPin,
    MessageCircle, Sparkles, BedDouble, Trees, Eye, UtensilsCrossed
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Local High-Res Photography
import npool1 from '../assets/images/npool1.webp';
import npool3 from '../assets/images/npool3.webp';
import heritage1 from '../assets/images/heritage1.webp';
import heritage2 from '../assets/images/heritage2.webp';
import suite1 from '../assets/images/suite1.webp';
import dormitory from '../assets/images/dormitory.webp';
import pic1 from '../assets/images/pic1.webp';
import pic3 from '../assets/images/pic3.webp';
import pic4 from '../assets/images/pic4.webp';
import pic5 from '../assets/images/pic5.webp';
import kottappara from '../assets/destinations/Kottappara.webp';
import kattadikadavu from '../assets/destinations/Kattadikadavu.webp';
import thommankuthu from '../assets/destinations/Thommankuthu.webp';
import campfireNight from '../assets/images/campfire_night.webp';

export const Home = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [settings, setSettings] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('2');
    const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
    const guestDropdownRef = useRef<HTMLDivElement>(null);

    const guestOptions = [
        {
            value: "1",
            label: "1 Guest",
            desc: "Solo Traveler Retreat",
            badge: "Solo"
        },
        {
            value: "2",
            label: "2 Guests (Couple)",
            desc: "Ideal for Couples & Duos",
            badge: "Couple"
        },
        {
            value: "4",
            label: "4 Guests (Family Suite)",
            desc: "Spacious Family Sanctuary",
            badge: "Family"
        },
        {
            value: "8",
            label: "5–12 Guests (Villa Group)",
            desc: "Whole Villa & Group Gathering",
            badge: "Group"
        }
    ];

    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return 'Select Date';
        try {
            const [y, m, d] = dateStr.split('-');
            if (!y || !m || !d) return dateStr;
            const date = new Date(Number(y), Number(m) - 1, Number(d));
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
                setGuestDropdownOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setGuestDropdownOpen(false);
            }
        };
        if (guestDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [guestDropdownOpen]);

    const heroSlides = [
        {
            image: npool1,
            eyebrow: "The Living Spring",
            title: "Natural Rock Pool",
            caption: "Fresh mountain stream waters filtered continuously by natural stone.",
            tag: "Pure Mineral Spring"
        },
        {
            image: heritage1,
            eyebrow: "Vernacular Craft",
            title: "Heritage Cottages",
            caption: "Traditional Kerala timber architecture nestled under deep forest canopies.",
            tag: "Authentic Farmstay"
        },
        {
            image: kottappara,
            eyebrow: "Idukki Highlands",
            title: "Where Clouds Gather",
            caption: "Untamed mountain vistas and cool mist rolling across the plantation ridge.",
            tag: "2,400 ft Elevation"
        },
        {
            image: pic1,
            eyebrow: "Agrarian Heritage",
            title: "15-Acre Spice Sanctuary",
            caption: "Cardamom, Tellicherry black pepper, and fruit groves grown organically.",
            tag: "Manjakunnel Estate"
        }
    ];

    // Auto-advance hero carousel every 6.5s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6500);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('settings').select('*').single();
            if (data) setSettings(data);
        };
        fetchSettings();

        // Default dates
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setCheckIn(tomorrow.toISOString().split('T')[0]);

        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);
        setCheckOut(dayAfter.toISOString().split('T')[0]);
    }, []);

    const getSpecIcon = (spec: string) => {
        const s = spec.toLowerCase();
        if (s.includes('guest')) return <Users size={12} className="text-brand-cyan" />;
        if (s.includes('bed')) return <BedDouble size={12} className="text-brand-cyan" />;
        if (s.includes('verandah') || s.includes('deck')) return <Trees size={12} className="text-brand-cyan" />;
        if (s.includes('view') || s.includes('stream')) return <Eye size={12} className="text-brand-cyan" />;
        if (s.includes('tub') || s.includes('pool')) return <Droplets size={12} className="text-brand-cyan" />;
        if (s.includes('fire') || s.includes('campfire')) return <Flame size={12} className="text-brand-cyan" />;
        return <Sparkles size={12} className="text-brand-cyan" />;
    };

    const accommodations = [
        {
            id: 'heritage',
            title: 'Heritage Plantation Cottage',
            tagline: 'Kerala Vernacular Architecture',
            desc: 'Traditional wood-and-stone cottage nestled under the forest canopy. Features a private lounging verandah and open-air rain shower.',
            specs: ['2 Guests', 'King Bed', 'Forest Verandah', 'Mountain Stream View'],
            image: heritage1,
            images: [heritage1, heritage2, pic1]
        },
        {
            id: 'suite',
            title: 'Luxury Mountain Suite',
            tagline: 'Panoramic Glass & Mist Views',
            desc: 'Contemporary suite perched on the estate ridge with floor-to-ceiling glass offering uninterrupted vistas of the Western Ghats.',
            specs: ['4 Guests', '2 Queen Beds', 'Private Deck', 'Soaking Tub'],
            image: suite1,
            images: [suite1, pic4, npool1]
        },
        {
            id: 'villa',
            title: 'Highland Plantation Villa',
            tagline: 'Estate Retreat for Groups',
            desc: 'A spacious estate home equipped with dedicated living quarters, open dining, and private campfire clearing amidst pepper groves.',
            specs: ['Up to 12 Guests', 'Multiple Bedrooms', 'Private Dining', 'Exclusive Campfire'],
            image: dormitory,
            images: [dormitory, pic1, heritage1]
        }
    ];

    const signatureExperiences = [
        {
            title: 'Natural Mountain Rock Pool',
            subtitle: 'Living Spring Water',
            desc: 'Carved directly into natural stone and continuously refreshed by cold mountain streams from the Idukki hills.',
            image: npool1,
            icon: Droplets,
            images: [npool1, npool3]
        },
        {
            title: '15-Acre Organic Spice Trails',
            subtitle: 'Farm-to-Senses Tour',
            desc: 'Wander through flourishing plantations of green cardamom, tellicherry black pepper, nutmeg, cloves, and tropical fruit trees.',
            image: pic1,
            icon: TreePine,
            images: [pic1, pic4]
        },
        {
            title: 'Campfire & Night Safari',
            subtitle: 'Under Western Ghats Stars',
            desc: 'Gather around the roaring fire under misty skies, followed by a guided night walk through the quiet plantation trails.',
            image: campfireNight,
            icon: Flame,
            images: [campfireNight, heritage2]
        },
        {
            title: 'Surrounding Highlands',
            subtitle: 'Kattadikadavu & Waterfalls',
            desc: 'Minutes away from scenic viewpoints like Kattadikadavu, Kottappara mist peaks, and Thommankuthu 7-step falls.',
            image: kottappara,
            icon: Compass,
            images: [kottappara, kattadikadavu]
        },
        {
            title: 'Farm-to-Table Dining',
            subtitle: 'Organic Estate Flavors',
            desc: 'Savor authentic Kerala delicacies prepared with native spices, farm-fresh produce, and traditional wood-fired culinary recipes.',
            image: pic5,
            icon: UtensilsCrossed,
            images: [pic5, pic3]
        }
    ];

    const testimonials = [
        {
            quote: "The natural rock pool alone is worth the journey. Absolute silence, crisp mountain air, and authentic meals made from farm-harvested produce.",
            author: "Dr. Anirudh Menon",
            location: "Kochi, Kerala",
            stay: "Stayed at Luxury Mountain Suite"
        },
        {
            quote: "An extraordinary hidden sanctuary. Waking up to mist rolling over the spice trees while sipping black coffee on the verandah was unforgettable.",
            author: "Pooja & Rohan Sharma",
            location: "Bengaluru",
            stay: "Stayed at Heritage Cottage"
        },
        {
            quote: "Our entire extended family stayed for 3 days. The children spent hours in the rock pool, and the evening campfire was magical.",
            author: "Mathews George",
            location: "Dubai, UAE",
            stay: "Stayed at Highland Villa"
        }
    ];

    const renderHeroTitle = (titleText?: string) => {
        const raw = (titleText || 'Clouds Village').trim();
        const words = raw.split(/\s+/);
        if (words.length > 1) {
            const lastWord = words.pop();
            const mainPart = words.join(' ');
            return (
                <>
                    <span className="font-light tracking-tight">{mainPart}</span>{' '}
                    <span className="font-serif italic font-normal tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4DF] via-[#F3E5AB] to-[#C5A880] drop-shadow-[0_0_35px_rgba(212,175,55,0.45)]">
                        {lastWord}
                    </span>
                </>
            );
        }
        return <span>{raw}</span>;
    };

    return (
        <div className="relative bg-[#0B0E14] text-[#F5F5F0] selection:bg-[#C5A880]/30 selection:text-white">
            
            {/* ══════════════════════════════════════════════════════════
                1. CURATED HERO PHOTO CAROUSEL (Quiet Luxury)
            ══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[100svh] flex flex-col justify-between pt-36 md:pt-44 pb-12 px-6 md:px-12 overflow-hidden">
                
                {/* Full-Bleed Carousel Background */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence initial={false} mode="sync">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={heroSlides[currentSlide].image}
                                alt={heroSlides[currentSlide].title}
                                className="w-full h-full object-cover filter brightness-[0.62] contrast-[1.06]"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Quiet Luxury Gradient & Atmospheric Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-black/70 pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0E14]/30 to-[#0B0E14]/85 pointer-events-none" />
                    
                    {/* Ethereal Warm Amber-Gold Ambient Radial Glow behind Centerpiece */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-[#C5A880]/[0.08] rounded-full blur-[140px] pointer-events-none" />
                </div>

                {/* Hero Centered Editorial Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto">
                    
                    {/* Refined Heritage Eyebrow Capsule (Warm Champagne Gold Accents) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/60 hover:bg-black/75 border border-[#C5A880]/30 hover:border-[#C5A880]/60 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] mb-6 sm:mb-8 transition-all duration-300 max-w-[94vw]"
                    >
                        <span className="flex items-center gap-1.5 text-[#E6CA92] shrink-0">
                            <MapPin size={11} className="text-[#E6CA92] drop-shadow-[0_0_6px_rgba(230,202,146,0.8)] shrink-0" />
                            <span 
                                className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.28em] uppercase font-semibold text-white/95 whitespace-nowrap"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Manjakunnel Farm
                            </span>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#C5A880]/60 shrink-0" />
                        <span 
                            className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.28em] uppercase text-[#E6CA92]/95 font-light whitespace-nowrap"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Vannappuram, Idukki
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.6rem] tracking-tight leading-[0.92] text-white font-light mb-6 sm:mb-7 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {renderHeroTitle(settings?.hero_title)}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-white/85 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-9 tracking-wide drop-shadow-md"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        {settings?.hero_subtitle || 'An untamed 15-acre organic farm sanctuary in the mountains of Kerala. Living spring rock pools, heritage timber cottages, and unhurried stillness.'}
                    </motion.p>

                    {/* High-Craft Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 mb-10 sm:mb-12"
                    >
                        <Link
                            to="/booking"
                            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-brand-cyan via-[#00B4D8] to-brand-cyan-light text-brand-dark font-bold text-xs sm:text-[12.5px] tracking-[0.22em] uppercase shadow-[0_0_35px_rgba(0,180,216,0.45)] hover:shadow-[0_0_55px_rgba(0,180,216,0.7)] hover:scale-[1.03] transition-all duration-300"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <Calendar size={13} className="text-brand-dark/80 group-hover:scale-110 transition-transform duration-300" />
                            <span>Reserve Your Stay</span>
                            <ArrowUpRight size={13} className="text-brand-dark/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </Link>
                        <a
                            href="#stays"
                            className="group inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/40 hover:bg-white/[0.08] border border-white/20 hover:border-[#C5A880]/50 text-white font-medium text-xs sm:text-[12.5px] tracking-[0.22em] uppercase backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(197,168,128,0.25)] hover:scale-[1.03] transition-all duration-300"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <Compass size={14} className="text-[#E6CA92] group-hover:rotate-45 transition-transform duration-500" />
                            <span>Explore Accommodations</span>
                        </a>
                    </motion.div>

                    {/* Curated Slide Controller Capsule */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="inline-flex items-center gap-3 sm:gap-5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/55 hover:bg-black/70 border border-white/15 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300"
                    >
                        {/* Prev Button */}
                        <button 
                            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 hover:border-[#C5A880]/60 flex items-center justify-center text-white/60 hover:text-[#E6CA92] hover:bg-[#C5A880]/10 transition-all duration-300 cursor-pointer"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={15} />
                        </button>

                        {/* Active Slide Name & Indicator */}
                        <div className="flex items-center gap-2.5 sm:gap-3 px-1 sm:px-2">
                            <span 
                                className="hidden sm:inline-block text-[11px] uppercase tracking-[0.2em] font-medium text-white/80"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                {heroSlides[currentSlide].title}
                            </span>
                            <span className="hidden sm:inline-block text-white/20 select-none">•</span>
                            
                            {/* Segmented Progress Bars */}
                            <div className="flex items-center gap-1.5">
                                {heroSlides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`transition-all duration-500 rounded-full cursor-pointer ${
                                            idx === currentSlide 
                                                ? 'w-7 sm:w-8 h-1 bg-[#C5A880] shadow-[0_0_10px_rgba(197,168,128,0.85)]' 
                                                : 'w-2 h-1 bg-white/25 hover:bg-white/50'
                                        }`}
                                        aria-label={`Slide ${idx + 1}: ${heroSlides[idx].title}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Slide Counter */}
                        <span className="tracking-widest font-mono text-[10.5px] sm:text-[11px] text-white/70 font-medium">
                            0{currentSlide + 1} <span className="text-white/30">/</span> 0{heroSlides.length}
                        </span>

                        {/* Next Button */}
                        <button 
                            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 hover:border-[#C5A880]/60 flex items-center justify-center text-white/60 hover:text-[#E6CA92] hover:bg-[#C5A880]/10 transition-all duration-300 cursor-pointer"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </motion.div>
                </div>

                {/* ══════════════════════════════════════════════════════════
                    CHECK-AVAILABILITY BOOKING BAR (Blue System)
                ══════════════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative z-20 w-full max-w-5xl mx-auto mt-6"
                >
                    <div className="bg-[#0B1226]/95 backdrop-blur-2xl rounded-2xl p-3 sm:p-3.5 border border-brand-cyan/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,180,216,0.12)]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 items-center">
                            
                            {/* Check In */}
                            <div className="relative group h-[64px] flex flex-col justify-center px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer shadow-sm">
                                <span 
                                    className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-semibold flex items-center gap-1.5 mb-1"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <Calendar size={11} className="text-brand-cyan/80" /> Check In
                                </span>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-medium text-sm tracking-wide">
                                        {formatDateDisplay(checkIn)}
                                    </span>
                                    <Calendar size={14} className="text-brand-cyan/50 group-hover:text-brand-cyan transition-colors shrink-0" />
                                </div>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 [color-scheme:dark]"
                                    aria-label="Check-in date"
                                />
                            </div>

                            {/* Check Out */}
                            <div className="relative group h-[64px] flex flex-col justify-center px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer shadow-sm">
                                <span 
                                    className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-semibold flex items-center gap-1.5 mb-1"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <Calendar size={11} className="text-brand-cyan/80" /> Check Out
                                </span>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-medium text-sm tracking-wide">
                                        {formatDateDisplay(checkOut)}
                                    </span>
                                    <Calendar size={14} className="text-brand-cyan/50 group-hover:text-brand-cyan transition-colors shrink-0" />
                                </div>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 [color-scheme:dark]"
                                    aria-label="Check-out date"
                                />
                            </div>

                            {/* Guests Custom Dropdown */}
                            <div ref={guestDropdownRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setGuestDropdownOpen((prev) => !prev)}
                                    className="w-full h-[64px] flex flex-col justify-center px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-cyan/40 text-left transition-all duration-300 focus:outline-none cursor-pointer group shadow-sm"
                                    aria-haspopup="listbox"
                                    aria-expanded={guestDropdownOpen}
                                >
                                    <span 
                                        className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-semibold flex items-center gap-1.5 mb-1"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        <Users size={11} className="text-brand-cyan/80" /> Guests
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium text-sm tracking-wide truncate pr-1">
                                            {guestOptions.find(opt => opt.value === guests)?.label || `${guests} Guests`}
                                        </span>
                                        <ChevronDown 
                                            size={14} 
                                            className={`text-brand-cyan/50 transition-transform duration-300 ${guestDropdownOpen ? 'rotate-180 text-brand-cyan' : 'group-hover:text-brand-cyan'} shrink-0`} 
                                        />
                                    </div>
                                </button>

                                {/* Custom Floating Luxury Dropdown Menu */}
                                <AnimatePresence>
                                    {guestDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.96 }}
                                            transition={{ duration: 0.18, ease: "easeOut" }}
                                            className="absolute bottom-full mb-2.5 left-0 right-0 sm:right-auto sm:w-[320px] bg-[#080D1D]/95 backdrop-blur-2xl border border-brand-cyan/35 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,180,216,0.18)] z-50"
                                            role="listbox"
                                        >
                                            <div className="px-3 py-2 border-b border-white/10 mb-1.5 flex items-center justify-between">
                                                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-bold">
                                                    Select Guest Count
                                                </span>
                                                <span className="text-[9px] uppercase tracking-[0.16em] text-white/40">
                                                    Sanctuary Stay
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                {guestOptions.map((opt) => {
                                                    const isSelected = opt.value === guests;
                                                    return (
                                                        <button
                                                            key={opt.value}
                                                            type="button"
                                                            onClick={() => {
                                                                setGuests(opt.value);
                                                                setGuestDropdownOpen(false);
                                                            }}
                                                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                                                                isSelected 
                                                                    ? 'bg-brand-cyan/15 border border-brand-cyan/40 text-white shadow-sm' 
                                                                    : 'hover:bg-white/[0.06] border border-transparent text-white/80 hover:text-white'
                                                            }`}
                                                            role="option"
                                                            aria-selected={isSelected}
                                                        >
                                                            <div className="flex flex-col pr-2">
                                                                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                                                                    {opt.label}
                                                                </span>
                                                                <span className="text-[10px] text-white/50 tracking-wider">
                                                                    {opt.desc}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2 shrink-0">
                                                                <span className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border ${
                                                                    isSelected 
                                                                        ? 'bg-brand-cyan/20 border-brand-cyan/50 text-brand-cyan-light font-bold' 
                                                                        : 'bg-white/[0.03] border-white/10 text-white/40'
                                                                }`}>
                                                                    {opt.badge}
                                                                </span>
                                                                {isSelected && (
                                                                    <div className="w-4 h-4 rounded-full bg-brand-cyan text-brand-dark flex items-center justify-center">
                                                                        <Check size={11} strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Action Button */}
                            <Link
                                to={`/booking?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`}
                                className="w-full h-[64px] rounded-xl bg-gradient-to-r from-brand-cyan via-[#00B4D8] to-brand-cyan-light text-brand-dark font-bold text-xs tracking-[0.22em] uppercase flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(0,180,216,0.35)] hover:shadow-[0_0_35px_rgba(0,180,216,0.6)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                <span>Check Availability</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                2. THE SANCTUARY OVERVIEW & KEY STATS
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-24 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left: Editorial Narrative */}
                    <div className="lg:col-span-7 flex flex-col">
                        <span className="text-brand-cyan text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">
                            Estate Philosophy
                        </span>
                        <h2 
                            className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.08] mb-7 tracking-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {settings?.about_title || 'Authentic Farm Stay'}, <br />
                            <span className="italic font-bold gradient-cyan">
                                {settings?.about_subtitle || 'Untouched by Time'}
                            </span>
                        </h2>

                        <div className="space-y-4 sm:space-y-5 text-slate-300 text-sm sm:text-base md:text-[16px] font-light leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {settings?.about_content ? (
                                <p>{settings.about_content}</p>
                            ) : (
                                <>
                                    <p>
                                        Clouds Village is nestled within the historic 15-acre <strong className="text-white font-medium">Manjakunnel Farm</strong> in Vannappuram, near Thodupuzha. Rooted in traditional agrarian values, our highland estate is embraced by undulating spice plantation hills, untouched forest canopies, and living mountain streams flowing year-round from the Western Ghats.
                                    </p>
                                    <p>
                                        Here, luxury is redefined by the unhurried rhythms of nature. Wander through flourishing groves of green cardamom, tellicherry black pepper, nutmeg, cocoa, and tropical fruit orchards. Immerse yourself in cold mountain springs feeding our private natural rock pools, and savor wholesome farm-to-table cuisine prepared with organic produce harvested straight from the fertile highland soil.
                                    </p>
                                    <p className="text-white/85 text-xs sm:text-sm italic border-l-2 border-brand-cyan/70 pl-4 py-2 bg-white/[0.02] rounded-r-xl">
                                        "No city clamor, no artificial rush — just cool mountain mist, the fragrant aroma of spices, and genuine agrarian tranquility."
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Experiential Highlight Chips */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-2">
                            {[
                                { icon: TreePine, label: '15-Acre Spice Groves' },
                                { icon: Droplets, label: 'Natural Spring Rock Pool' },
                                { icon: Sparkles, label: 'Farm-to-Table Gastronomy' },
                                { icon: MapPin, label: 'Vannappuram Highlands' }
                            ].map((item, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-brand-cyan/30 text-white/80 text-[11px] font-medium tracking-wide transition-colors">
                                    <item.icon size={12} className="text-brand-cyan" />
                                    {item.label}
                                </span>
                            ))}
                        </div>

                        {/* Four Key Pillars */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/10">
                            {[
                                { value: settings?.about_stat1_value || "15+", label: settings?.about_stat1_label || "Acres Plantation" },
                                { value: settings?.about_stat2_value || "100%", label: settings?.about_stat2_label || "Spring Water" },
                                { value: "0%", label: "City Noise" },
                                { value: "4.9★", label: "Guest Satisfaction" }
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span 
                                        className="text-3xl sm:text-4xl font-light text-white mb-1"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E9E98] font-medium">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Asymmetric Photo Montage */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl h-[460px] group">
                            <img
                                src={heritage1}
                                alt="Clouds Village Heritage Cottage"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="text-brand-cyan text-[10px] font-semibold tracking-[0.25em] uppercase block mb-1">
                                    Vernacular Architecture
                                </span>
                                <h3 className="text-2xl text-white font-serif" style={{ fontFamily: "var(--font-display)" }}>
                                    Kerala Wooden Verandahs
                                </h3>
                            </div>
                        </div>

                        {/* Floating Second Card */}
                        <div 
                            className="hidden sm:block absolute -bottom-10 -left-10 z-20 w-56 h-56 rounded-2xl overflow-hidden border-2 border-[#0B0E14] shadow-2xl group cursor-pointer"
                            onClick={() => openLightbox([npool1], "Natural Spring Pool")}
                        >
                            <img
                                src={npool1}
                                alt="Living Spring Rock Pool"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                            <div className="absolute bottom-3 left-3 right-3 text-center">
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    Natural Rock Pool
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                3. CURATED ACCOMMODATIONS (THE STAYS)
            ══════════════════════════════════════════════════════════ */}
            <section id="stays" className="py-24 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-[#0E121A] border-y border-white/5 relative">
                <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto">
                    
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-brand-cyan text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">
                                Private Accommodations
                            </span>
                            <h2 
                                className="text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Cottages & <span className="italic font-bold gradient-cyan">Suites</span>
                            </h2>
                        </div>
                        <p className="text-[#9E9E98] text-sm md:text-base font-light max-w-md">
                            Designed to frame nature. Every room opens directly to lush spice trails with private balconies and unhindered mountain panoramas.
                        </p>
                    </div>

                    {/* Accommodations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {accommodations.map((room) => (
                            <div
                                key={room.id}
                                className="rounded-[2.2rem] overflow-hidden flex flex-col group bg-gradient-to-b from-[#0B1226]/95 via-[#090E1E]/95 to-[#060914] border border-white/10 hover:border-brand-cyan/45 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,180,216,0.18)] hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={room.image}
                                        alt={room.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1226] via-transparent to-transparent opacity-90" />
                                    
                                    {/* Expand Lightbox Button */}
                                    <button
                                        onClick={() => openLightbox(room.images, room.title)}
                                        className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand-cyan hover:text-brand-dark"
                                        aria-label="View photo gallery"
                                    >
                                        <Maximize2 size={14} />
                                    </button>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                                    {/* Eyebrow Tagline */}
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,180,216,0.9)]" />
                                        <span 
                                            className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.22em] uppercase text-brand-cyan-light"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            {room.tagline}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 
                                        className="text-2xl sm:text-[25px] text-white font-normal mb-3 group-hover:text-brand-cyan-light transition-colors duration-300 leading-snug tracking-tight"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {room.title}
                                    </h3>

                                    {/* Description */}
                                    <p 
                                        className="text-white/65 text-xs sm:text-[13px] font-light leading-relaxed mb-6 line-clamp-3"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        {room.desc}
                                    </p>

                                    {/* Architectural Spec Micro-Pills */}
                                    <div className="grid grid-cols-2 gap-2 mb-7 pt-5 border-t border-white/[0.08]">
                                        {room.specs.map((spec) => (
                                            <div 
                                                key={spec} 
                                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-white/10 transition-colors"
                                            >
                                                <div className="w-5 h-5 rounded-lg bg-brand-cyan/10 flex items-center justify-center shrink-0">
                                                    {getSpecIcon(spec)}
                                                </div>
                                                <span 
                                                    className="text-[11px] text-white/80 font-medium tracking-wide truncate"
                                                    style={{ fontFamily: "var(--font-nav)" }}
                                                >
                                                    {spec}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Luxury Action Bar: Reserve Button */}
                                    <div className="mt-auto pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                                        <div className="flex flex-col">
                                            <span 
                                                className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan-light font-semibold"
                                                style={{ fontFamily: "var(--font-nav)" }}
                                            >
                                                Sanctuary Living
                                            </span>
                                            <span className="text-[11px] text-white/50 font-light tracking-wide">
                                                Rates on Request
                                            </span>
                                        </div>

                                        <Link
                                            to={`/booking?room=${room.id}`}
                                            className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-cyan via-[#00B4D8] to-brand-cyan-light text-brand-dark font-bold text-[11px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,180,216,0.35)] hover:shadow-[0_0_30px_rgba(0,180,216,0.65)] hover:scale-105 active:scale-[0.98] transition-all duration-300 shrink-0 cursor-pointer"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            <span>Reserve Stay</span>
                                            <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                4. SIGNATURE RESORT EXPERIENCES
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 relative">
                    {/* Ambient glow behind heading */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[110px] pointer-events-none -z-10" />

                    {/* Architectural Eyebrow Capsule */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-brand-cyan/25 backdrop-blur-md mb-6 shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_6px_#00B4D8]" />
                        <span 
                            className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-cyan-light"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Signature Encounters
                        </span>
                        <span className="text-white/20 select-none">•</span>
                        <span 
                            className="text-[9.5px] font-medium tracking-[0.22em] uppercase text-white/50"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Farm & Highlands
                        </span>
                    </div>

                    {/* Headline with poetic phrasing and balanced line break */}
                    <h2 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-white font-bold leading-[1.08] mb-6 tracking-tight drop-shadow-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Every Day, <br className="hidden sm:inline" />
                        <span className="italic font-bold gradient-cyan drop-shadow-md">An Untamed Chapter</span>
                    </h2>

                    {/* Editorial Subtitle */}
                    <p 
                        className="text-white/70 text-sm sm:text-base md:text-[17px] font-light leading-relaxed max-w-2xl mx-auto"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Clouds Village is more than a sanctuary stay. It is an unhurried immersion into living mountain springs, organic spice plantations, and natural Western Ghats stillness.
                    </p>
                </div>

                {/* Experiences Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {signatureExperiences.map((exp, idx) => {
                        const Icon = exp.icon;
                        const isFeatured = idx === 0;
                        return (
                            <div
                                key={exp.title}
                                onClick={() => openLightbox(exp.images, exp.title)}
                                className={`relative rounded-[2rem] overflow-hidden group cursor-pointer border border-brand-cyan/20 ${
                                    isFeatured ? 'md:col-span-2 h-[440px]' : 'h-[440px]'
                                }`}
                            >
                                <img
                                    src={exp.image}
                                    alt={exp.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-[#070B19]/40 to-transparent" />
                                
                                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                                    <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mb-4 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-colors duration-500 shadow-[0_0_15px_rgba(0,180,216,0.3)]">
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-brand-cyan-light text-[10px] font-semibold tracking-[0.2em] uppercase mb-1">
                                        {exp.subtitle}
                                    </span>
                                    <h3 
                                        className="text-2xl sm:text-3xl text-white font-normal mb-3"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {exp.title}
                                    </h3>
                                    <p className="text-white/70 text-sm font-light leading-relaxed max-w-md">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                5. HIGHLAND DESTINATIONS PREVIEW
            ══════════════════════════════════════════════════════════ */}
            {/* ══════════════════════════════════════════════════════════
                5. HIGHLAND DESTINATIONS PREVIEW (Waterfall Showcase)
            ══════════════════════════════════════════════════════════ */}
            <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 bg-[#080E1E] border-t border-brand-cyan/15 relative overflow-hidden">
                {/* Subtle Ambient Background Water Glow */}
                <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-brand-cyan/[0.04] rounded-full blur-[140px] pointer-events-none" />

                <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
                    
                    {/* Left Column: Narrative, Badges & CTA */}
                    <div className="lg:col-span-5 flex flex-col items-start relative">
                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-cyan/[0.06] rounded-full blur-[100px] pointer-events-none" />
                        
                        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4 sm:mb-5">
                            <Compass size={12} className="text-brand-cyan" />
                            <span 
                                className="text-brand-cyan text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Explore Idukki & Beyond
                            </span>
                        </div>

                        <h2 
                            className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white font-bold leading-[1.12] mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] tracking-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Surrounded by{' '}
                            <br className="hidden sm:inline" />
                            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan-light to-brand-cyan drop-shadow-[0_0_35px_rgba(0,180,216,0.6)]">
                                Waterfalls & Peaks
                            </span>
                        </h2>

                        <p 
                            className="text-slate-300 text-base lg:text-[17px] font-light leading-relaxed mb-8 tracking-wide"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Vannappuram is strategically located within easy reach of Kerala's most iconic trekking peaks and cascading falls, with Munnar and Vagamon ideal for day explorations.
                        </p>

                        {/* Location Distance Pills */}
                        <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs font-medium text-white/80 mb-10">
                            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-brand-cyan/30 transition-colors">
                                Kattadikadavu (8 km)
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan-light font-semibold shadow-[0_0_15px_rgba(0,180,216,0.15)] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                                Thommankuthu Falls (14 km)
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-brand-cyan/30 transition-colors">
                                Kottappara Peak (12 km)
                            </span>
                            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-brand-cyan/30 transition-colors">
                                Munnar (58 km)
                            </span>
                        </div>

                        {/* CTA Link */}
                        <Link
                            to="/destinations"
                            className="group inline-flex items-center gap-4 px-8 py-4.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-cyan-light text-brand-dark text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,180,216,0.25)]"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <span>Explore Nearby Destinations</span>
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Right Column: Architectural Waterfall Showcase Image Card */}
                    <div className="lg:col-span-7 w-full">
                        <div 
                            className="relative group overflow-hidden rounded-3xl lg:rounded-[2.5rem] border border-brand-cyan/25 hover:border-brand-cyan/50 bg-[#0B1226] shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-500 cursor-pointer"
                            onClick={() => openLightbox([thommankuthu], "Thommankuthu Seven-Step Waterfall • 14 km from Clouds Village")}
                        >
                            {/* Waterfall Photography Container */}
                            <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] lg:h-[440px] xl:h-[500px] 2xl:h-[560px] overflow-hidden">
                                <img
                                    src={thommankuthu}
                                    alt="Thommankuthu Seven-Step Waterfall near Clouds Village"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.05]"
                                />

                                {/* Multi-Stop Vignette & Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/30 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#080E1E]/40 via-transparent to-transparent hidden lg:block" />

                                {/* Floating Top-Right Lightbox / Fullscreen Trigger */}
                                <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                                    <div className="w-10 h-10 rounded-full bg-[#080D1D]/80 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-brand-cyan group-hover:border-brand-cyan/50 flex items-center justify-center transition-all duration-300 shadow-lg">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>

                                {/* Floating Bottom Badge / Caption Info */}
                                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                    <div className="bg-[#080D1D]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl max-w-md">
                                        <div className="flex items-center gap-2 mb-1.5 text-brand-cyan">
                                            <MapPin size={13} />
                                            <span 
                                                className="text-[10px] tracking-[0.25em] uppercase font-bold text-brand-cyan"
                                                style={{ fontFamily: "var(--font-nav)" }}
                                            >
                                                14 KM • 30 MIN DRIVE
                                            </span>
                                        </div>
                                        <h3 
                                            className="text-lg sm:text-xl font-medium text-white tracking-wide mb-1"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            Thommankuthu Seven-Step Waterfall
                                        </h3>
                                        <p className="text-white/60 text-xs font-light leading-relaxed line-clamp-2">
                                            A series of 7 cascading wilderness waterfalls with crystalline pools, ancient caves, and lush forest trekking trails.
                                        </p>
                                    </div>

                                    {/* Action Link inside Card */}
                                    <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-cyan/15 backdrop-blur-md border border-brand-cyan/30 text-brand-cyan-light text-[11px] font-semibold tracking-[0.16em] uppercase group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-300">
                                        <span>View Photograph</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                6. GUEST TESTIMONIALS (Trust & Authenticity)
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="flex items-center justify-center gap-1 mb-4 text-brand-cyan">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={15} fill="currentColor" />
                        ))}
                    </div>
                    <h2 
                        className="text-4xl sm:text-5xl text-white font-bold mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Guest Reflections
                    </h2>
                    <span className="text-brand-cyan-light/70 text-xs tracking-[0.25em] uppercase">
                        Unfiltered Stories from the Highlands
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="glass-card rounded-[2rem] p-8 md:p-10 flex flex-col justify-between bg-[#0B1226]/80 border border-brand-cyan/20">
                            <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-8 italic">
                                "{t.quote}"
                            </p>
                            <div className="pt-6 border-t border-white/5">
                                <h4 className="text-white font-medium text-sm">{t.author}</h4>
                                <span className="text-[#9E9E98] text-xs block">{t.location}</span>
                                <span className="text-brand-cyan text-[10px] uppercase tracking-wider font-semibold mt-1 block">
                                    {t.stay}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
                7. FINAL RESERVATION INVITATION (Cottage in the Clouds)
            ══════════════════════════════════════════════════════════ */}
            <section className="relative py-8 sm:py-12 md:py-14 px-3 sm:px-6 md:px-8 lg:px-12 bg-brand-dark overflow-hidden">
                {/* Ambient Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-cyan/15 rounded-full blur-[130px] pointer-events-none" />

                {/* Grand Architectural Luxury Card (Viewport-Optimized Proportions) */}
                <div className="w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto relative rounded-3xl sm:rounded-[2.25rem] lg:rounded-[2.75rem] overflow-hidden border border-white/15 bg-[#060A16] shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
                    
                    {/* Atmospheric Scenic Background Photo */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={kottappara}
                            alt="Highland clouds and mist rolling over Western Ghats"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] scale-105"
                        />
                        {/* Layered Multi-Stop Dark Vignette Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060A16] via-[#060A16]/80 to-[#060A16]/55" />
                        <div className="absolute inset-0 bg-radial-at-c from-brand-cyan/10 via-transparent to-black/60 pointer-events-none" />
                        
                        {/* Delicate Luminous Horizon Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent" />
                    </div>

                    {/* Content Hub Inside the Pavilion */}
                    <div className="relative z-10 px-4 sm:px-8 md:px-12 py-10 sm:py-12 md:py-14 flex flex-col items-center text-center max-w-4xl mx-auto">
                        
                        {/* Prestigious Eyebrow Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 text-brand-cyan mb-4 sm:mb-5 backdrop-blur-md shadow-[0_0_15px_rgba(0,180,216,0.2)]">
                            <Sparkles size={11} className="text-brand-cyan" />
                            <span 
                                className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.25em] uppercase"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Private Sanctuary Reservations • Idukki Highlands
                            </span>
                        </div>

                        {/* Majestic Display Headline (Compact Proportions) */}
                        <h2 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] text-white font-bold mb-3 sm:mb-4 leading-[1.12] tracking-tight drop-shadow-xl"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {settings?.contact_title ? (
                                settings.contact_title
                            ) : (
                                <>
                                    Your Cottage in the Clouds <br />
                                    <span className="italic font-bold gradient-cyan">Is Waiting For You</span>
                                </>
                            )}
                        </h2>

                        {/* Editorial Description */}
                        <p className="text-white/80 text-xs sm:text-sm md:text-[15px] font-light leading-relaxed mb-5 sm:mb-6 max-w-lg mx-auto">
                            {settings?.contact_subtitle || 'Escape the city rush. Step into 15 pristine acres of organic spice groves, living mountain spring rock pools, and handcrafted Kerala timber verandahs. A secluded highland haven where time gently stands still.'}
                        </p>

                        {/* Refined Estate Privileges */}
                        <div 
                            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 mb-6 sm:mb-7 text-[10px] sm:text-[10.5px] text-white/75 uppercase tracking-[0.18em]"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            {[
                                "15-Acre Organic Estate",
                                "Living Spring Rock Pools",
                                "Direct Rate Guarantee",
                                "24/7 Personal Concierge"
                            ].map((privilege, pIdx) => (
                                <div key={pIdx} className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0" />
                                    <span>{privilege}</span>
                                </div>
                            ))}
                        </div>

                        {/* Dual Action CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mb-6">
                            <Link
                                to="/booking"
                                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-cyan via-[#00B4D8] to-brand-cyan-light text-brand-dark font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(0,180,216,0.45)] hover:shadow-[0_0_40px_rgba(0,180,216,0.7)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group cursor-pointer"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                <span>Reserve Your Stay Now</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <a
                                href="https://wa.me/919645464747?text=Hello%20Clouds%20Village,%20I%20would%20like%20to%20inquire%20about%20a%20private%20cottage%20stay."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-brand-cyan/50 text-white font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-300 group cursor-pointer shadow-sm"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                <MessageCircle size={14} className="text-brand-cyan group-hover:scale-110 transition-transform" />
                                <span>WhatsApp Concierge</span>
                            </a>
                        </div>

                        {/* Micro Reassurance Footer */}
                        <div className="pt-4 border-t border-white/10 w-full max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-[10px] font-light">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                                <span>Instant Confirmation • Direct Privileges</span>
                            </div>
                            <a 
                                href="tel:+919645464747"
                                className="hover:text-brand-cyan transition-colors tracking-wider"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Concierge: +91 9645464747
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};
