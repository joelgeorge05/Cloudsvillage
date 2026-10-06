import React, { useState, useEffect } from 'react';
import { 
    Facebook, 
    Instagram, 
    Youtube, 
    MapPin, 
    Phone, 
    Mail, 
    ArrowUp, 
    ArrowUpRight,
    Calendar,
    MessageCircle,
    Send,
    Check,
    Code2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router';

import logoImg from '../assets/images/logo.webp';
import logo2Img from '../assets/images/logo2.webp';

export const Footer = () => {
    const [settings, setSettings] = useState<any>(null);
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await supabase.from('settings').select('*').single();
                if (data) setSettings(data);
            } catch (err) {
                // fallback to solid defaults
            }
        };
        fetchSettings();
    }, []);

    const contactAddress = settings?.contact_address || "Clouds Village Farm Resort, Manjakunnel Farm, Vannappuram, Thodupuzha, Idukki, Kerala - 685607";
    const contactPhone = settings?.contact_phone || "+91 9645464747, +91 9446506075";
    const contactEmail = settings?.contact_email || "cloudsvillage@gmail.com";
    const contactLocationUrl = settings?.contact_location_url || "https://share.google/DB1mdQaBldvZ9oumC";
    const facebookUrl = settings?.facebook_url || "https://www.facebook.com/CloudsVillageResort/";
    const instagramUrl = settings?.instagram_url || "https://www.instagram.com/cloudsvillagefarmstay/";
    const youtubeUrl = settings?.youtube_url || "https://www.youtube.com/channel/UCc94gpmGBGYSEpCx8sCWmbA";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer id="contact-us" className="relative bg-[#060914] text-white overflow-hidden border-t border-brand-cyan/20">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-cyan-dark/10 rounded-full blur-[120px] pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════
                TOP CONCIERGE & DIRECT BOOKING STRIP
            ══════════════════════════════════════════════════════════ */}
            <div className="border-b border-white/10 bg-[#080D1D]/60 backdrop-blur-xl">
                <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3" style={{ fontFamily: "var(--font-nav)" }}>
                        <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        <span className="text-xs uppercase tracking-[0.22em] text-white/90 font-semibold">
                            Sanctuary Reservations Open
                        </span>
                        <span className="hidden sm:inline text-white/30">•</span>
                        <span className="hidden sm:inline text-xs tracking-[0.2em] uppercase text-brand-cyan-light font-medium">
                            Vannappuram, Idukki
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0" style={{ fontFamily: "var(--font-nav)" }}>
                        <a
                            href="https://wa.me/919645464747?text=Hello%20Clouds%20Village,%20I%20would%20like%20to%20inquire%20about%20a%20stay."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-brand-cyan/40 text-[11px] tracking-[0.2em] uppercase text-white font-semibold transition-all duration-300"
                        >
                            <MessageCircle size={13} className="text-brand-cyan" />
                            <span>WhatsApp Inquiries</span>
                        </a>

                        <Link
                            to="/booking"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-cyan-dark text-brand-dark font-bold text-[11px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,180,216,0.35)] hover:shadow-[0_0_30px_rgba(0,180,216,0.6)] hover:scale-105 transition-all duration-300"
                        >
                            <Calendar size={13} className="text-brand-dark" />
                            <span>Book Direct</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                MAIN DIRECTORY GRID
            ══════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pt-10 sm:pt-12 pb-8 sm:pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-6 sm:pb-8">

                    {/* Column 1: Brand & Heritage (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-4.5">
                        <Link to="/" className="flex items-center gap-3.5 group w-fit">
                            <img
                                src={logoImg}
                                alt="Clouds Village Logo"
                                className="h-10 sm:h-11 md:h-12 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="flex flex-col">
                                <span 
                                    className="text-white text-lg sm:text-xl tracking-[0.2em] font-medium uppercase leading-none group-hover:text-brand-cyan-light transition-colors"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Clouds Village
                                </span>
                                <span 
                                    className="text-brand-cyan-light/80 text-[9px] tracking-[0.35em] uppercase font-semibold mt-1"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Farm Sanctuary • Idukki
                                </span>
                            </div>
                        </Link>

                        <p 
                            className="text-white/70 text-xs sm:text-[13px] leading-relaxed font-light max-w-sm"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            An authentic 15-acre organic farm sanctuary nestled in the mist-veiled Western Ghats of Kerala. Living spring rock pools, vernacular wooden verandahs, and unhurried natural stillness.
                        </p>

                        {/* Manjakunnel Farm Heritage Partner Card */}
                        <div 
                            className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 max-w-sm hover:border-brand-cyan/30 transition-colors"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <div className="shrink-0">
                                <img
                                    src={logo2Img}
                                    alt="Manjakunnel Integrated Farm"
                                    className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-white/50 tracking-[0.25em] uppercase font-semibold">
                                    Heritage Partner
                                </span>
                                <span className="text-xs text-white tracking-wider font-semibold">
                                    Manjakunnel Integrated Farm
                                </span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-0.5">
                            <a 
                                href={facebookUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300"
                            >
                                <Facebook size={16} />
                            </a>
                            <a 
                                href={instagramUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300"
                            >
                                <Instagram size={16} />
                            </a>
                            <a 
                                href={youtubeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="YouTube"
                                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/10 transition-all duration-300"
                            >
                                <Youtube size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Experiences (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-3.5">
                        <span 
                            className="text-brand-cyan text-xs font-bold uppercase tracking-[0.25em]"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Experiences
                        </span>
                        <div className="flex flex-col gap-2.5 sm:gap-3" style={{ fontFamily: "var(--font-nav)" }}>
                            {[
                                { name: "Heritage Cottages", path: "/#stays" },
                                { name: "Rock Spring Pools", path: "/facilities" },
                                { name: "Farm Trails", path: "/facilities" },
                                { name: "Nearby Peaks", path: "/destinations" },
                                { name: "Visual Archive", path: "/gallery" },
                                { name: "Farm-to-Table", path: "/facilities" }
                            ].map((item) => (
                                <Link 
                                    key={item.name} 
                                    to={item.path} 
                                    className="text-xs uppercase tracking-[0.16em] text-white/70 hover:text-brand-cyan-light transition-colors font-medium py-0.5 w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Sanctuary Links (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-3.5">
                        <span 
                            className="text-brand-cyan text-xs font-bold uppercase tracking-[0.25em]"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Sanctuary
                        </span>
                        <div className="flex flex-col gap-2.5 sm:gap-3" style={{ fontFamily: "var(--font-nav)" }}>
                            {[
                                { name: "Home Sanctuary", path: "/" },
                                { name: "Our Story", path: "/about" },
                                { name: "Facilities", path: "/facilities" },
                                { name: "Excursions", path: "/destinations" },
                                { name: "Guest Gallery", path: "/gallery" },
                                { name: "Direct Booking", path: "/booking" },
                                { name: "Directions", path: "/contact" }
                            ].map((item) => (
                                <Link 
                                    key={item.name} 
                                    to={item.path} 
                                    className="text-xs uppercase tracking-[0.16em] text-white/70 hover:text-brand-cyan-light transition-colors font-medium py-0.5 w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Contact & Highland Journal (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-4.5">
                        <span 
                            className="text-brand-cyan text-xs font-bold uppercase tracking-[0.25em]"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Reservations & Visit
                        </span>

                        <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm text-white/80 font-light">
                            <li>
                                <a 
                                    href={contactLocationUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group flex items-start gap-2.5 hover:text-brand-cyan-light transition-colors"
                                >
                                    <MapPin size={15} className="text-brand-cyan mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                    <span 
                                        className="leading-relaxed text-xs text-white/70 group-hover:text-white/95"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        {contactAddress}
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href={`tel:${contactPhone.split(',')[0].trim()}`} 
                                    className="group flex items-center gap-2.5 hover:text-brand-cyan-light transition-colors"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <Phone size={14} className="text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs tracking-wider font-semibold text-white/85 group-hover:text-white">
                                        {contactPhone}
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href={`mailto:${contactEmail}`} 
                                    className="group flex items-center gap-2.5 hover:text-brand-cyan-light transition-colors"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    <Mail size={14} className="text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs text-white/85 group-hover:text-white">
                                        {contactEmail}
                                    </span>
                                </a>
                            </li>
                        </ul>

                        {/* Highland Journal Newsletter */}
                        <div className="pt-1">
                            <span 
                                className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold block mb-1.5"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Highland Journal
                            </span>
                            <form onSubmit={handleSubscribe} className="relative max-w-sm">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    required
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                    className="w-full bg-white/[0.04] border border-white/10 focus:border-brand-cyan/60 rounded-full px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none transition-colors pr-10"
                                />
                                <button
                                    type="submit"
                                    aria-label="Subscribe"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-cyan text-brand-dark flex items-center justify-center hover:bg-brand-cyan-light transition-colors"
                                >
                                    {subscribed ? <Check size={12} className="text-brand-dark" /> : <Send size={10} className="-ml-0.5 text-brand-dark" />}
                                </button>
                            </form>
                            {subscribed && (
                                <span 
                                    className="text-[11px] text-brand-cyan-light mt-1.5 block font-medium"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Thank you. You are on our private dispatch list.
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                {/* ══════════════════════════════════════════════════════════
                    ARCHITECTURAL BOTTOM BAR & COPYRIGHT
                ══════════════════════════════════════════════════════════ */}
                <div className="pt-6 sm:pt-7 pb-2 border-t border-white/[0.08]">
                    {/* Tier 1: Utility Navigation & Artisan Signature */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-5 border-b border-white/[0.04]">
                        
                        {/* Left: Sanctuary Ethics & Legal Links */}
                        <nav 
                            aria-label="Legal & Sanctuary Policies"
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[11px] sm:text-xs text-white/50 tracking-[0.2em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            <Link to="#" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link>
                            <span className="text-brand-cyan/30 select-none">•</span>
                            <Link to="#" className="hover:text-brand-cyan transition-colors">Terms of Stay</Link>
                            <span className="text-brand-cyan/30 select-none">•</span>
                            <Link to="#" className="hover:text-brand-cyan transition-colors">Sanctuary Ethics</Link>
                            <span className="text-brand-cyan/30 select-none">•</span>
                            <Link to="/destinations" className="hover:text-brand-cyan transition-colors">Highland Guide</Link>
                        </nav>

                        {/* Right: Signature Developer Credit & Back to Top */}
                        <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
                            {/* Redesigned Artisan Developer Signature Capsule (Pulse-Free, Quiet Luxury) */}
                            <a
                                href="https://www.instagram.com/j_oelgeorge?igsh=MWZ3OWR5dDA4OG5qeA=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/dev relative inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-brand-cyan/40 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(0,180,216,0.2)] transition-all duration-300 cursor-pointer whitespace-nowrap"
                                aria-label="Portfolio of Joel George"
                            >
                                {/* Static Crafted Artisan Monogram Icon */}
                                <Code2 size={12} className="text-brand-cyan/70 group-hover/dev:text-brand-cyan transition-colors duration-300 shrink-0" />
                                
                                <span 
                                    className="text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase text-white/45 font-light group-hover/dev:text-white/65 transition-colors whitespace-nowrap"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Developed by
                                </span>

                                {/* Stylized Developer Name */}
                                <span 
                                    className="text-[10.5px] sm:text-[11.5px] tracking-[0.16em] uppercase font-semibold text-white/90 group-hover/dev:text-brand-cyan-light transition-colors duration-300 whitespace-nowrap"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Joel George
                                </span>

                                {/* Minimal Floating Action Arrow */}
                                <ArrowUpRight 
                                    size={12} 
                                    className="text-white/35 group-hover/dev:text-brand-cyan group-hover/dev:translate-x-0.5 group-hover/dev:-translate-y-0.5 transition-all duration-300 shrink-0" 
                                />
                            </a>

                            {/* Hairline Divider */}
                            <span className="w-[1px] h-4 bg-white/10 hidden sm:block" />

                            {/* Refined Back to Top Button */}
                            <button
                                onClick={scrollToTop}
                                className="group flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand-cyan/40 text-white/50 hover:text-white transition-all duration-300 text-[10px] font-semibold tracking-[0.2em] uppercase cursor-pointer"
                                style={{ fontFamily: "var(--font-nav)" }}
                                aria-label="Back to top"
                            >
                                <span className="group-hover:text-brand-cyan transition-colors">Top</span>
                                <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-brand-cyan group-hover:bg-brand-cyan/15 flex items-center justify-center transition-all duration-300">
                                    <ArrowUp size={11} className="text-white/60 group-hover:text-brand-cyan group-hover:-translate-y-0.5 transition-transform duration-300" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Tier 2: Heritage Copyright & Geographic Origins */}
                    <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-white/40 font-light" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        <div className="text-center sm:text-left tracking-wide">
                            © {new Date().getFullYear()} <span className="text-white/70 font-medium">Clouds Village Farm Sanctuary</span>. All rights reserved.
                        </div>
                        <div className="text-center sm:text-right text-[11px] text-white/35 tracking-wide">
                            Manjakunnel Farm, Vannappuram, Thodupuzha, Idukki, Kerala — 685607
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};
