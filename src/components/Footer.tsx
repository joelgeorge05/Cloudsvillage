import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/logo.png';

export const Footer = () => {
    return (
        <footer id="contact-us" className="relative bg-brand-dark overflow-hidden border-t border-white/5 pt-20 pb-10">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
            <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full filter blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full filter blur-[80px] pointer-events-none transform translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand - takes 5 cols on lg */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6 pr-0 lg:pr-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-cyan/20 blur-xl rounded-full" />
                                <img src={logoImg} alt="Clouds Village Logo" className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,163,196,0.5)]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-white text-2xl tracking-widest uppercase mb-1 drop-shadow-md">Clouds Village</span>
                                <span className="text-brand-cyan/70 text-[10px] uppercase tracking-[0.3em] font-bold">Farm Resort & Spa</span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-md">
                            Escape the ordinary. Experience luxury woven into nature at our exclusive retreat. Where every moment is a memory waiting to be made.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="https://www.facebook.com/CloudsVillageResort/" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-[0_0_15px_rgba(0,163,196,0.1)] hover:shadow-[0_0_20px_rgba(0,163,196,0.5)]">
                                <div className="absolute inset-0 bg-[#1877F2] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                                <Facebook size={20} className="relative z-10 group-hover:text-white transition-colors" />
                            </a>
                            <a href="https://www.instagram.com/cloudsvillagefarmresort?igsh=cTQyc2pjYXpqZzZ6" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-[0_0_15px_rgba(0,163,196,0.1)] hover:shadow-[0_0_20px_rgba(255,0,128,0.4)]">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                                <Instagram size={20} className="relative z-10 group-hover:text-white transition-colors" />
                            </a>
                            <a href="https://www.youtube.com/channel/UCc94gpmGBGYSEpCx8sCWmbA" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-[0_0_15px_rgba(0,163,196,0.1)] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                                <div className="absolute inset-0 bg-[#FF0000] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                                <Youtube size={20} className="relative z-10 group-hover:text-white transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Details - takes 4 cols */}
                    <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6 order-2 lg:order-none">
                        <span className="text-white text-lg font-display font-medium relative inline-block mb-2 uppercase tracking-wider">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-brand-cyan" />
                        </span>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a href="https://google.com/maps/place/Clouds+Village+Farm+Resort/@9.9797876,76.8016067,17z/data=!4m9!3m8!1s0x3b07c1e777b0f6a7:0x5794954071fa596e!5m2!4m1!1i2!8m2!3d9.9807612!4d76.8032541!16s%2Fg%2F11gy5zdslv?entry=tts&g_ep=EgoyMDI1MDkwMy4wIPu8ASoASAFQAw%3D%3D&skid=0a7d89ea-06e3-4f0f-8224-e26089b0ce57" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 -ml-3 rounded-xl hover:bg-white/5 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan group-hover:scale-110 transition-all shadow-inner">
                                        <MapPin size={18} className="text-brand-cyan group-hover:text-brand-dark transition-colors" />
                                    </div>
                                    <span className="text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors mt-1">Clouds Village Farm Resort,<br />Manjakkunel Farm, Thodupuzha,<br />Idukki, Kerala</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+919645464747" className="flex items-center gap-4 p-3 -ml-3 rounded-xl hover:bg-white/5 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan group-hover:scale-110 transition-all shadow-inner">
                                        <Phone size={18} className="text-brand-cyan group-hover:text-brand-dark transition-colors" />
                                    </div>
                                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">+91 9645464747, +91 9446506075</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:cloudsvillage@gmail.com" className="flex items-center gap-4 p-3 -ml-3 rounded-xl hover:bg-white/5 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan group-hover:scale-110 transition-all shadow-inner">
                                        <Mail size={18} className="text-brand-cyan group-hover:text-brand-dark transition-colors" />
                                    </div>
                                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">cloudsvillage@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-6 order-1 lg:order-none">
                        <span className="text-white text-lg font-display font-medium relative inline-block mb-2 uppercase tracking-wider">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-brand-cyan" />
                        </span>
                        <div className="flex flex-col gap-4">
                            {[
                                { name: "About", path: "/about" },
                                { name: "Facilities", path: "/facilities" },
                                { name: "Destinations", path: "/destinations" },
                                { name: "Gallery", path: "/gallery" },
                                { name: "Privacy Policy", path: "#" },
                                { name: "Terms of Service", path: "#" }
                            ].map((link) => (
                                <Link key={link.name} to={link.path} className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all w-fit">
                                    <ChevronRight size={14} className="text-brand-cyan opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 pb-4">
                    <div className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium text-center md:text-left">
                        © {new Date().getFullYear()} CLOUDS VILLAGE RESORT & SPA. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-widest font-bold">
                        Designed for <span className="text-brand-cyan drop-shadow-[0_0_10px_rgba(0,163,196,0.8)]">Luxury</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
