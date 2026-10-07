import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Calendar, Phone } from 'lucide-react';

import logoImg from '../assets/images/logo.webp';
import logo2Img from '../assets/images/logo2.webp';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: "Stays", path: "/#stays" },
        { name: "Facilities", path: "/facilities" },
        { name: "Destinations", path: "/destinations" },
        { name: "Gallery", path: "/gallery" },
        { name: "Story", path: "/about" },
        { name: "Contact", path: "/contact" }
    ];

    const handleNavClick = (path: string, e: React.MouseEvent) => {
        if (path === "/#stays") {
            if (location.pathname === "/") {
                e.preventDefault();
                const staysEl = document.getElementById("stays");
                if (staysEl) {
                    staysEl.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    return (
        <>
            {/* ══════════════════════════════════════════════════════════
                ARCHITECTURAL FULL-WIDTH LUXURY HEADER (Aman / Soneva Standard)
            ══════════════════════════════════════════════════════════ */}
            <header 
                className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
                    scrolled 
                        ? 'bg-[#070B19]/90 backdrop-blur-2xl py-3.5 md:py-4 border-b border-brand-cyan/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)]' 
                        : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 md:py-7 border-b border-white/5'
                }`}
            >
                <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-5 xl:px-8 2xl:px-14 flex items-center justify-between">

                    {/* Left: Brand Identity */}
                    <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                        <img
                            src={logoImg}
                            alt="Clouds Village Logo"
                            className="h-8 sm:h-9 md:h-9 xl:h-10 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="hidden sm:flex flex-col">
                            <span 
                                className="text-white text-[16px] xl:text-[18px] 2xl:text-[20px] font-extrabold tracking-[0.18em] uppercase leading-none group-hover:text-brand-cyan-light transition-colors whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Clouds Village
                            </span>
                            <span 
                                className="text-brand-cyan text-[8.5px] xl:text-[9.5px] tracking-[0.32em] uppercase font-bold mt-1.5 whitespace-nowrap hidden xl:block drop-shadow-[0_2px_8px_rgba(0,180,216,0.3)]"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Farm Sanctuary • Idukki
                            </span>
                        </div>
                    </Link>

                    {/* Center: Breathable Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-2.5 shrink-0" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {navLinks.map((item) => {
                            const isActive = item.path === '/#stays'
                                ? (location.pathname === '/' && (!location.hash || location.hash === '#stays'))
                                : location.pathname === item.path;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={(e) => handleNavClick(item.path, e)}
                                    className={`relative px-2 xl:px-2.5 2xl:px-3.5 py-1.5 xl:py-2 text-[11.5px] xl:text-[12.5px] 2xl:text-[13.5px] tracking-[0.14em] xl:tracking-[0.18em] 2xl:tracking-[0.22em] uppercase transition-colors duration-300 font-semibold whitespace-nowrap group ${
                                        isActive
                                            ? 'text-white font-bold'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    
                                    {/* Active Selected Page Animation: Sliding Frosted Cyan Capsule */}
                                    {isActive ? (
                                        <motion.div
                                            layoutId="header-active-pill"
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan/20 via-brand-cyan/25 to-brand-cyan-dark/20 border border-brand-cyan/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,180,216,0.25)]"
                                            transition={{ type: "spring", stiffness: 380, damping: 28 }}
                                        />
                                    ) : (
                                        <span className="absolute inset-0 rounded-full bg-white/[0.04] border border-transparent group-hover:border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Balanced Actions */}
                    <div className="flex items-center gap-2 xl:gap-2.5 2xl:gap-3.5 shrink-0">
                        {/* Manjakunnel Farm Logo */}
                        <div className="hidden lg:flex items-center justify-center hover:scale-105 transition-transform duration-300 shrink-0">
                            <img
                                src={logo2Img}
                                alt="Manjakunnel Integrated Farm"
                                className="h-9 xl:h-10 2xl:h-11 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform duration-300"
                            />
                        </div>

                        {/* Discreet Phone Contact Button */}
                        <a
                            href="tel:+919645464747"
                            aria-label="Call Reception"
                            title="Call Reception: +91 9645464747"
                            className="hidden xl:flex w-8.5 h-8.5 rounded-full items-center justify-center bg-white/[0.06] border border-white/10 hover:border-brand-cyan/40 hover:bg-brand-cyan/10 text-brand-cyan hover:text-white transition-all duration-300 shrink-0"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <Phone size={13} className="text-brand-cyan" />
                        </a>

                        {/* Signature "Book Stay" CTA */}
                        <Link
                            to="/booking"
                            style={{ fontFamily: "var(--font-nav)" }}
                            className="relative group overflow-hidden flex items-center gap-1.5 px-3.5 xl:px-4 2xl:px-5 py-2 xl:py-2.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-cyan-dark text-brand-dark font-bold text-[10.5px] xl:text-xs tracking-[0.14em] xl:tracking-[0.18em] uppercase shadow-[0_0_20px_rgba(0,180,216,0.35)] hover:shadow-[0_0_35px_rgba(0,180,216,0.7)] hover:scale-105 transition-all duration-300 shrink-0 whitespace-nowrap"
                        >
                            <Calendar size={13} className="text-brand-dark shrink-0" />
                            <span className="whitespace-nowrap">Book Stay</span>
                        </Link>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10 text-white hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
                            aria-label="Toggle Navigation Menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer with Deep Midnight Sapphire Atmosphere */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#070B19]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 pt-32 lg:hidden"
                    >
                        {/* Ambient Background Cyan Glows */}
                        <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-cyan/15 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-10 left-0 w-72 h-72 bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />

                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="flex items-center justify-between pb-4 border-b border-brand-cyan/20">
                                <span className="text-brand-cyan text-[10px] tracking-[0.35em] uppercase font-bold">
                                    Sanctuary Navigation
                                </span>
                                <span className="text-white/40 text-[10px] tracking-widest uppercase">
                                    Vannappuram, Idukki
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {navLinks.map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.04 + 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={(e) => {
                                                handleNavClick(item.path, e);
                                                setIsOpen(false);
                                            }}
                                            className="font-serif text-3xl text-white/90 hover:text-brand-cyan flex items-center justify-between py-2.5 border-b border-white/5 transition-colors group"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            <span className="group-hover:translate-x-2 transition-transform">{item.name}</span>
                                            <ArrowUpRight size={20} className="text-brand-cyan/50 group-hover:text-brand-cyan transition-colors" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Drawer Bottom Info */}
                        <div className="flex flex-col gap-4 pt-6 border-t border-brand-cyan/20 relative z-10">
                            <div className="flex items-center justify-between text-xs text-white/70">
                                <span>Reservations Desk</span>
                                <a href="tel:+919645464747" className="text-brand-cyan font-bold tracking-wider">+91 9645464747</a>
                            </div>
                            <Link
                                to="/booking"
                                onClick={() => setIsOpen(false)}
                                style={{ fontFamily: "var(--font-nav)" }}
                                className="w-full py-4 rounded-full bg-gradient-to-r from-brand-cyan to-brand-cyan-light text-brand-dark font-bold text-xs tracking-[0.2em] uppercase text-center shadow-[0_0_30px_rgba(0,180,216,0.45)]"
                            >
                                Reserve Your Stay Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
