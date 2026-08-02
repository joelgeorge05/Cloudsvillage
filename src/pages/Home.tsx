import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Waves, Compass, Landmark, Star, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

import npool1 from '../assets/images/npool1.webp';
import npool3 from '../assets/images/npool3.webp';
import npool4 from '../assets/images/npool4.webp';
import npool5 from '../assets/images/npool5.webp';
import npool6 from '../assets/images/npool6.webp';
import npool7 from '../assets/images/npool7.webp';
import heritage1 from '../assets/images/heritage1.webp';
import pic1 from '../assets/images/pic1.webp';

export const Home = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [settings, setSettings] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const previewImages = [npool1, pic1, heritage1, npool3];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage(prev => (prev + 1) % previewImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const fetchSettings = async () => {
            const { data } = await supabase.from('settings').select('*').single();
            if (data) setSettings(data);
        };
        fetchSettings();

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const heroSubtitle = settings?.hero_subtitle || "Escape the ordinary. Experience luxury woven into nature at our exclusive farm retreat in Kerala's heart.";
    const bgVideo = settings?.bg_video_url || "/CLOUDS VILLAGE DAY.mp4";

    const amenities = [
        { icon: Waves, label: settings?.amenity1_label || "Natural Pool", desc: settings?.amenity1_desc || "Crystal Clear", images: [npool1, npool3, npool4, npool5, npool6, npool7] },
        { icon: Compass, label: settings?.amenity2_label || "Safari", desc: settings?.amenity2_desc || "Wild Encounters", images: [] },
        { icon: Landmark, label: settings?.amenity3_label || "Heritage", desc: settings?.amenity3_desc || "Local Culture", images: [heritage1, pic1] },
    ];

    const stats = [
        { value: "15+", label: "Acres" },
        { value: "100%", label: "Organic" },
        { value: "4.9★", label: "Rating" },
    ];

    return (
        <section ref={sectionRef} className="relative min-h-[100svh] flex items-center justify-center overflow-x-clip">

            {/* ── Parallax Background ── */}
            <motion.div className="absolute inset-0 z-0" style={{ y: isMobile ? 0 : bgY }}>
                {isMobile ? (
                    <img src={npool1} alt="Clouds Village" className="w-full h-full object-cover scale-110" />
                ) : (
                    <video
                        key={bgVideo}
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover scale-110"
                        poster={npool1}
                    >
                        <source src={bgVideo} type="video/mp4" />
                    </video>
                )}

                {/* Layered gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50" />

                {/* Subtle grain */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
                />
            </motion.div>

            {/* ── Main Content ── */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-12 md:pt-40 md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center min-h-[100svh]"
                style={{ y: isMobile ? 0 : contentY, opacity }}
            >
                {/* LEFT: Text column */}
                <div className="flex flex-col items-start">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={11} className="text-brand-cyan fill-brand-cyan" />
                            ))}
                        </div>
                        <span className="text-brand-cyan text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Kerala's Finest Farm Resort</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="mb-4"
                    >
                        <h1 className="font-serif text-[3.2rem] sm:text-7xl md:text-8xl text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                            Clouds
                        </h1>
                        <h1 className="font-serif text-[3.2rem] sm:text-7xl md:text-8xl text-gradient italic font-light leading-[1.1] tracking-normal drop-shadow-2xl pb-4">
                            Village
                        </h1>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-[2px] bg-gradient-to-r from-brand-cyan to-transparent mb-4"
                    />

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-white/70 text-base md:text-lg font-light max-w-md mb-6 leading-relaxed"
                    >
                        {heroSubtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.65 }}
                        className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto"
                    >
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-cyan text-brand-dark font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0, 180, 216,0.4)] hover:shadow-[0_0_50px_rgba(0, 180, 216,0.7)] transition-all duration-500 hover:-translate-y-0.5"
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            Book Your Stay
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#gallery"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/80 font-bold text-sm tracking-wider uppercase hover:bg-white/5 hover:border-white/40 hover:text-white transition-all duration-300"
                        >
                            View Gallery
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex items-center gap-8"
                    >
                        {stats.map((stat, i) => (
                            <React.Fragment key={stat.label}>
                                <div className="flex flex-col">
                                    <span className="font-display font-bold text-2xl md:text-3xl text-white">{stat.value}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">{stat.label}</span>
                                </div>
                                {i < stats.length - 1 && <div className="w-[1px] h-8 bg-white/10" />}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT: Floating image cards — desktop only */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="hidden md:flex flex-col gap-3 items-end relative"
                >
                    {/* Main rotating preview image — stacked card design */}
                    <div className="relative w-full max-w-[420px] h-[300px]">

                        {/* Background stacked cards for depth */}
                        <div className="absolute inset-0 top-3 left-3 rounded-[1.8rem] bg-brand-cyan/10 border border-brand-cyan/20 md:backdrop-blur-sm" />
                        <div className="absolute inset-0 top-1.5 left-1.5 rounded-[1.9rem] bg-white/5 border border-white/10" />

                        {/* Gradient border wrapper */}
                        <div className="absolute inset-0 rounded-[2rem] p-[1.5px] z-10"
                            style={{ background: 'linear-gradient(135deg, rgba(0, 180, 216,0.8) 0%, rgba(255,255,255,0.05) 40%, rgba(0, 180, 216,0.4) 70%, rgba(72, 202, 228,0.6) 100%)' }}
                        >
                            {/* Main image card */}
                            <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden bg-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.8)]">

                                {/* Images */}
                                {previewImages.map((img, i) => (
                                    <motion.img
                                        key={i}
                                        src={img}
                                        alt="Resort preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: i === activeImage ? 1 : 0, scale: i === activeImage ? 1 : 1.05 }}
                                        transition={{ duration: 1 }}
                                    />
                                ))}

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/20" />

                                {/* Animated shine sweep */}
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 2 }}
                                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-10"
                                />

                                {/* Bottom info bar */}
                                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between z-20">
                                    <div className="flex flex-col">
                                        <span className="text-white font-display font-bold text-sm">Clouds Village</span>
                                        <span className="text-brand-cyan/80 text-[9px] font-bold tracking-[0.2em] uppercase">Idukki · Kerala</span>
                                    </div>
                                    {/* Dot indicators */}
                                    <div className="flex gap-1.5 items-center">
                                        {previewImages.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImage(i)}
                                                className={`rounded-full transition-all duration-300 ${i === activeImage ? 'w-5 h-1.5 bg-brand-cyan shadow-[0_0_6px_rgba(0, 180, 216,0.8)]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Photo counter — top right */}
                                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-dark/70 md:backdrop-blur-md border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                                    <span className="text-white/80 text-[9px] font-bold tracking-widest">{activeImage + 1}/{previewImages.length}</span>
                                </div>
                            </div>
                        </div>



                        {/* Ambient glow behind card */}
                        <div className="absolute inset-4 rounded-[2rem] bg-brand-cyan/10 blur-2xl -z-10 pointer-events-none" />
                    </div>{/* end outer wrapper */}


                    {/* Amenity floating pills */}
                    <div className="flex flex-col gap-2 w-full max-w-[400px]">
                        {amenities.map((item) => (
                            <motion.div
                                key={item.label}
                                onClick={() => item.images.length > 0 && openLightbox(item.images, item.label)}
                                whileHover={{ x: -4, scale: 1.02 }}
                                className="flex items-center gap-4 px-5 py-3 rounded-2xl glass bg-brand-dark/30 border border-white/8 cursor-pointer group"
                            >
                                <div className="w-9 h-9 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-300 shrink-0">
                                    <item.icon size={16} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <span className="block text-white text-sm font-medium">{item.label}</span>
                                    <span className="block text-brand-cyan/60 text-[9px] font-bold tracking-[0.2em] uppercase">{item.desc}</span>
                                </div>
                                {item.images.length > 0 && (
                                    <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Mobile amenity pills */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex md:hidden flex-col gap-3 w-full -mt-4"
                >
                    {amenities.map((item) => (
                        <div
                            key={item.label}
                            onClick={() => item.images.length > 0 && openLightbox(item.images, item.label)}
                            className="flex items-center gap-4 px-5 py-3.5 rounded-2xl glass bg-brand-dark/30 border border-white/8 cursor-pointer"
                        >
                            <div className="w-9 h-9 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                                <item.icon size={16} strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="block text-white text-sm font-medium">{item.label}</span>
                                <span className="block text-brand-cyan/60 text-[9px] font-bold tracking-[0.2em] uppercase">{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-white/30 text-[9px] font-bold tracking-[0.25em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    className="text-white/30"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
};
