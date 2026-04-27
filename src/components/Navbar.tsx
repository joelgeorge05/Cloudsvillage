import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

import logoImg from '../assets/images/logo.png';
import logo2Img from '../assets/images/logo2.png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const sections = ['home', 'about', 'facilities', 'destinations', 'gallery', 'contact'];
            let current = 'home';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= (element.offsetTop - 150)) {
                    current = section;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            // Adjust offset for fixed navbar
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    const navLinks = [
        { name: "About", id: "about" },
        { name: "Facilities", id: "facilities" },
        { name: "Destinations", id: "destinations" },
        { name: "Gallery", id: "gallery" },
        { name: "Contact Us", id: "contact" }
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
                    <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                        <motion.img
                            src={logoImg}
                            alt="Clouds Village Logo"
                            className={`object-contain drop-shadow-[0_0_15px_rgba(0,163,196,0.6)] transition-all duration-500 ${scrolled ? 'w-24 h-24' : 'w-28 h-28 md:w-40 md:h-40'}`}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 25px rgba(0,163,196,0.9))" }}
                        />
                    </a>
                </motion.div>

                {/* Center/Right: Floating Navigation Pill */}
                <div className={`flex items-center gap-2 md:gap-4 p-1.5 pl-5 rounded-full transition-all duration-700 ease-out border ${scrolled ? 'bg-brand-dark/80 backdrop-blur-3xl border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.4)]' : 'bg-brand-surface/50 backdrop-blur-2xl border-white/5 shadow-2xl'} `}>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((item) => (
                            <a
                                key={item.name}
                                href={`#${item.id}`}
                                onClick={(e) => scrollToSection(e, item.id)}
                                className={`group relative px-4 py-2 text-xs xl:text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap rounded-full hover:bg-white/5 ${activeSection === item.id ? 'text-brand-cyan' : 'text-white/80 hover:text-white'}`}
                            >
                                {item.name}
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-brand-cyan/80 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(0,163,196,0.8)] ${activeSection === item.id ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                            </a>
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
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, 'contact')}
                            className="hidden md:flex relative group overflow-hidden bg-brand-dark border border-brand-cyan/30 text-brand-cyan px-6 py-2 rounded-full font-bold text-xs transition-all hover:text-brand-dark hover:border-transparent shadow-[0_0_15px_rgba(0,163,196,0.1)] hover:shadow-[0_0_25px_rgba(0,163,196,0.4)] whitespace-nowrap"
                        >
                            <span className="relative z-10 flex items-center gap-2">Book Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
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
                                    <a
                                        href={`#${item.id}`}
                                        className={`text-lg md:text-xl font-display font-medium transition-colors flex items-center justify-between group py-3 border-b border-white/5 ${activeSection === item.id ? 'text-brand-cyan' : 'text-white/80 hover:text-brand-cyan'}`}
                                        onClick={(e) => scrollToSection(e, item.id)}
                                    >
                                        {item.name}
                                        <ArrowRight size={18} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-cyan" />
                                    </a>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, 'contact')}
                                    className="w-full flex justify-center bg-gradient-to-r from-brand-cyan to-[#00d4ff] text-brand-dark py-4 rounded-xl font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(0,163,196,0.3)] mt-6 uppercase tracking-wider text-center"
                                >
                                    Reserve Stay
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
