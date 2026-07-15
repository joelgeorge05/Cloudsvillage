import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ChevronRight, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router';

import logoImg from '../assets/images/logo.png';

export const Footer = () => {
    const [settings, setSettings] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('settings').select('*').single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    const contactAddress = settings?.contact_address || "Clouds Village Farm Resort, Manjakkunel Farm, Thodupuzha, Idukki, Kerala";
    const contactPhone = settings?.contact_phone || "+91 9645464747, +91 9446506075";
    const contactEmail = settings?.contact_email || "cloudsvillage@gmail.com";
    const contactLocationUrl = settings?.contact_location_url || "https://google.com/maps/place/Clouds+Village+Farm+Resort/@9.9797876,76.8016067,17z";
    const facebookUrl = settings?.facebook_url || "https://www.facebook.com/CloudsVillageResort/";
    const instagramUrl = settings?.instagram_url || "https://www.instagram.com/cloudsvillagefarmresort";
    const youtubeUrl = settings?.youtube_url || "https://www.youtube.com/channel/UCc94gpmGBGYSEpCx8sCWmbA";

    return (
        <footer id="contact-us" className="relative bg-[#050B14] overflow-hidden border-t border-white/5 pt-24 pb-8">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
            <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none transform translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">

                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="relative group cursor-pointer">
                                <div className="absolute inset-0 bg-brand-cyan/30 blur-2xl rounded-full group-hover:bg-brand-cyan/40 transition-colors duration-700" />
                                <img src={logoImg} alt="Clouds Village Logo" className="w-20 h-20 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(0,163,196,0.5)] group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-black text-white text-3xl tracking-widest uppercase mb-1 drop-shadow-md">Clouds Village</span>
                                <span className="text-brand-cyan/80 text-[10px] uppercase tracking-[0.4em] font-bold">Farm Resort & Spa</span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-loose max-w-sm">
                            Escape the ordinary. Experience luxury woven into nature at our exclusive retreat. Where every moment is a memory waiting to be made.
                        </p>
                        <div className="flex gap-4">
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-6">
                        <span className="text-white text-xs font-display font-bold uppercase tracking-[0.2em]">
                            Explore
                        </span>
                        <div className="flex flex-col gap-3">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Facilities", path: "/facilities" },
                                { name: "Destinations", path: "/destinations" },
                                { name: "Gallery", path: "/gallery" },
                                { name: "Contact", path: "/contact" }
                            ].map((link) => (
                                <Link key={link.name} to={link.path} className="group flex items-center gap-3 text-sm text-white/50 hover:text-white transition-all w-fit">
                                    <span className="w-0 h-[1px] bg-brand-cyan group-hover:w-3 transition-all duration-300" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-8 lg:col-span-3 flex flex-col gap-6">
                        <span className="text-white text-xs font-display font-bold uppercase tracking-[0.2em]">
                            Reach Us
                        </span>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href={contactLocationUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-100 opacity-70 transition-opacity group">
                                    <MapPin size={18} className="text-brand-cyan mt-1 shrink-0" />
                                    <span className="text-sm leading-relaxed text-white whitespace-pre-wrap">{contactAddress}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${contactPhone.split(',')[0].trim()}`} className="flex items-center gap-4 hover:opacity-100 opacity-70 transition-opacity group">
                                    <Phone size={18} className="text-brand-cyan shrink-0" />
                                    <span className="text-sm text-white">{contactPhone}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 hover:opacity-100 opacity-70 transition-opacity group">
                                    <Mail size={18} className="text-brand-cyan shrink-0" />
                                    <span className="text-sm text-white">{contactEmail}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Booking */}
                    <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-6">
                        <span className="text-white text-xs font-display font-bold uppercase tracking-[0.2em]">
                            Stay Connected
                        </span>
                        <p className="text-white/50 text-sm leading-relaxed">
                            Subscribe to our newsletter for exclusive offers, updates, and seasonal retreat packages.
                        </p>
                        <form className="relative mt-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all"
                            />
                            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-cyan text-brand-dark flex items-center justify-center hover:scale-105 hover:bg-white transition-all shadow-[0_0_15px_rgba(0,163,196,0.3)]">
                                <Send size={14} className="-ml-0.5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8 pb-4">
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium text-center md:text-left">
                        © {new Date().getFullYear()} CLOUDS VILLAGE RESORT & SPA. ALL RIGHTS RESERVED.
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Link to="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                        Designed for <span className="text-brand-cyan drop-shadow-[0_0_10px_rgba(0,163,196,0.8)]">Luxury</span>
                        <span className="text-white/20">|</span>
                        <span>Dev: <a href="https://www.instagram.com/j_oelgeorge?igsh=MWZ3OWR5dDA4OG5qeA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:text-white transition-colors">Joel</a></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
