import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import logoImg from '../assets/images/logo.png';
import logo2Img from '../assets/images/logo2.png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "About", path: "/about" },
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
                            className={`object-contain drop-shadow-[0_0_15px_rgba(0,163,196,0.6)] transition-all duration-500 ${scrolled ? 'w-24 h-24' : 'w-28 h-28 md:w-40 md:h-40'}`}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 25px rgba(0,163,196,0.9))" }}
                        />
                    </Link>
                </motion.div>

                {/* Center/Right: Floating Navigation Pill */}
                <div className={`flex items-center gap-2 md:gap-4 p-2 pl-6 rounded-full transition-all duration-500 ease-out border ${scrolled ? 'bg-brand-dark/90 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'bg-brand-surface/70 backdrop-blur-lg border-white/5 shadow-xl'} `}>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`group relative px-4 py-2 text-xs xl:text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap rounded-full hover:bg-white/5 ${location.pathname === item.path ? 'text-brand-cyan' : 'text-white/80 hover:text-white'}`}
                            >
                                {item.name}
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-brand-cyan/80 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(0,163,196,0.8)] ${location.pathname === item.path ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions inside Pill */}
                    <div className="flex items-center gap-2 md:gap-3 pl-0 lg:pl-4 lg:border-l border-white/10">
                        {/* Secondary Logo */}
                        <motion.div
                            className="hidden sm:flex items-center justify-center bg-white/95 h-9 md:h-11 px-3 md:px-4 rounded-full shadow-inner border border-white/20 hover:bg-white transition-all cursor-pointer group"
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
                            className="hidden md:flex relative group overflow-hidden bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan px-5 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all hover:text-brand-dark shadow-[0_0_15px_rgba(0,163,196,0.2)] hover:shadow-[0_0_25px_rgba(0,163,196,0.5)] whitespace-nowrap"
                        >
                            <span className="relative z-10 flex items-center gap-2">Book Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
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
                                        onClick={() => setIsOpen(false)}
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
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex justify-center bg-gradient-to-r from-brand-cyan to-[#00d4ff] text-brand-dark py-4 rounded-xl font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(0,163,196,0.3)] mt-6 uppercase tracking-wider"
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
