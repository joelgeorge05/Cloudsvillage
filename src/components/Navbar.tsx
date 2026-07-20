import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

import logoImg from '../assets/images/logo.webp';
import logo2Img from '../assets/images/logo2.webp';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: "About", path: "/#about" },
        { name: "Facilities", path: "/facilities" },
        { name: "Destinations", path: "/destinations" },
        { name: "Gallery", path: "/gallery" },
        { name: "Contact Us", path: "/contact" }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6 pointer-events-none transition-all duration-500">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

                {/* Left: Main Brand Logo */}
                <motion.div
                    className="flex-shrink-0 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/">
                        <motion.img
                            src={logoImg}
                            alt="Clouds Village Logo"
                            className={`object-contain transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'w-16 h-16 md:w-24 md:h-24' : 'w-20 h-20 md:w-40 md:h-40'}`}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                        />
                    </Link>
                </motion.div>

                {/* Center: Floating Navigation Pill (Links Only) */}
                <div className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 xl:gap-6 px-8 py-3.5 rounded-full transition-all duration-700 ease-out border ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'bg-brand-surface/40 backdrop-blur-lg border-white/10 shadow-2xl hover:bg-brand-surface/50'} `}>
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`group relative px-2 py-1 text-[11px] xl:text-[13px] font-semibold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${location.pathname === item.path ? 'text-brand-cyan drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'text-white/70 hover:text-white'}`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full transition-all duration-300 ${location.pathname === item.path ? 'bg-brand-cyan shadow-[0_0_8px_rgba(212,175,55,1)] opacity-100' : 'bg-white/50 opacity-0 group-hover:opacity-100 group-hover:-bottom-1'}`} />
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Secondary Logo (Optional/Branding) */}
                    <motion.div
                        className={`hidden md:flex items-center justify-center bg-white/95 h-10 md:h-12 px-4 rounded-full shadow-lg border border-white/20 hover:bg-white transition-all cursor-pointer group ${scrolled ? 'opacity-100' : 'opacity-90'}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img
                            src={logo2Img}
                            alt="Clouds Village Special Edition"
                            className="h-5 md:h-7 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </motion.div>

                    {/* Book Now Button */}
                    <Link
                        to="/contact"
                        className="hidden md:flex relative group overflow-hidden bg-brand-cyan text-brand-dark px-7 py-3 rounded-full font-bold text-[11px] xl:text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 whitespace-nowrap"
                    >
                        <span className="relative z-10 flex items-center gap-2">Book Now</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </Link>

                    {/* Mobile Menu Toggle - visible on mobile/tablet */}
                    <button
                        className="lg:hidden w-10 md:w-12 h-10 md:h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan hover:bg-brand-cyan/20 transition-colors pointer-events-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-[110px] left-4 right-4 md:left-6 md:right-6 bg-brand-dark/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                    >
                        <div className="p-6 md:p-8 flex flex-col gap-4">
                            {navLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`text-lg md:text-xl font-display font-medium transition-colors flex items-center justify-between group py-3 border-b border-white/5 ${location.pathname === item.path ? 'text-brand-cyan' : 'text-white/80 hover:text-brand-cyan'}`}
                                    >
                                        {item.name}
                                        <ArrowRight size={18} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-cyan" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link
                                    to="/contact"
                                    className="w-full flex justify-center bg-gradient-to-r from-brand-cyan to-[#e2c275] text-brand-dark py-4 rounded-xl font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-6 uppercase tracking-wider text-center"
                                >
                                    Reserve Stay
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
