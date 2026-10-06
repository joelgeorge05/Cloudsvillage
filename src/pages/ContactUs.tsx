import React, { useState, useEffect } from 'react';
import { 
    Coffee, 
    ArrowRight, 
    CheckCircle2, 
    Phone, 
    Mail, 
    MapPin, 
    Sparkles, 
    Calendar, 
    User, 
    Users, 
    BedDouble, 
    MessageCircle, 
    ShieldCheck, 
    Clock,
    Instagram,
    ArrowUpRight
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';

export const ContactUs = () => {
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [bookingRoomType, setBookingRoomType] = useState('Heritage Plantation Cottage');
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await supabase.from('settings').select('*').single();
                if (data) setSettings(data);
            } catch (err) {
                // fallback
            }
        };
        fetchSettings();
    }, []);

    const contactSubtitle = settings?.contact_subtitle || "Ready for your highland escape? Select your dates, guests, and preferred room style. Our concierge desk will confirm availability promptly.";
    const contactLocationUrl = settings?.contact_location_url || "https://share.google/DB1mdQaBldvZ9oumC";
    const instagramUrl = settings?.instagram_url || "https://www.instagram.com/cloudsvillagefarmstay/";

    return (
        <section className="bg-brand-dark text-[#F5F5F0] pt-24 sm:pt-28 md:pt-32 pb-24 md:pb-36 min-h-[100svh] relative overflow-hidden">
            {/* Ambient Sapphire & Cyan Aurora Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] bg-brand-cyan/[0.07] rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
            
            {/* Luminous Top Horizon Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

            {/* Dynamic Full-Width Architectural Container */}
            <div className="w-full max-w-[1700px] 2xl:max-w-[2000px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 xl:gap-20 items-start w-full">
                    
                    {/* Left Column: Concierge Narrative & Privileges */}
                    <div className="w-full lg:w-5/12 flex flex-col items-start pt-2">
                        
                        {/* Prestigious Eyebrow Pill */}
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-brand-cyan/[0.14] via-brand-cyan/[0.05] to-transparent border border-brand-cyan/35 mb-6 shadow-[0_0_20px_rgba(0,180,216,0.18)] backdrop-blur-xl max-w-full">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan shadow-[0_0_8px_#00B4D8]" />
                            </span>
                            <span 
                                className="text-cyan-200 text-[9.5px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.22em] uppercase whitespace-nowrap"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Concierge Desk <span className="text-brand-cyan/40 mx-1 sm:mx-1.5">•</span> Direct Reservations
                            </span>
                            <Sparkles size={11} className="text-brand-cyan ml-0.5 shrink-0 hidden xs:inline-block" />
                        </div>

                        {/* Display Headline */}
                        <h1 
                            className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white mb-6 font-bold leading-[1.08] tracking-tight drop-shadow-xl"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Plan Your{' '}
                            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan-light to-brand-cyan drop-shadow-[0_0_35px_rgba(0,180,216,0.6)]">
                                Retreat
                            </span>
                        </h1>

                        {/* Description */}
                        <p 
                            className="text-slate-300 text-sm sm:text-base lg:text-[17px] font-light leading-relaxed mb-7 max-w-lg tracking-wide"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            {contactSubtitle}
                        </p>

                        {/* Curated Direct Booking Privileges Card */}
                        <div className="w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#0C1630]/85 via-[#081126]/90 to-[#050B1A]/95 border border-brand-cyan/25 p-5 sm:p-6 mb-7 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                            {/* Ambient Top Glow Line */}
                            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent" />
                            <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-cyan/[0.08] rounded-full blur-[50px] pointer-events-none" />

                            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-[0_0_12px_rgba(0,180,216,0.25)]">
                                        <ShieldCheck size={15} />
                                    </div>
                                    <span 
                                        className="text-white text-xs sm:text-[12.5px] font-semibold tracking-[0.16em] uppercase"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        Direct Sanctuary Privileges
                                    </span>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan-light text-[10px] font-medium tracking-wider uppercase">
                                    Complimentary
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-cyan/30 hover:bg-brand-cyan/[0.04] transition-all">
                                    <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0">
                                        <Coffee size={13} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-white text-xs font-medium truncate">Artisan Breakfast</span>
                                        <span className="text-white/50 text-[10.5px] font-light truncate">Organic daily harvest</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-cyan/30 hover:bg-brand-cyan/[0.04] transition-all">
                                    <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0">
                                        <Sparkles size={13} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-white text-xs font-medium truncate">Spring Rock Pool</span>
                                        <span className="text-white/50 text-[10.5px] font-light truncate">Private natural waters</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-cyan/30 hover:bg-brand-cyan/[0.04] transition-all">
                                    <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0">
                                        <Clock size={13} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-white text-xs font-medium truncate">Priority Check-In</span>
                                        <span className="text-white/50 text-[10.5px] font-light truncate">Flexible early arrival</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-cyan/30 hover:bg-brand-cyan/[0.04] transition-all">
                                    <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan shrink-0">
                                        <CheckCircle2 size={13} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-white text-xs font-medium truncate">Spice Trail Walk</span>
                                        <span className="text-white/50 text-[10.5px] font-light truncate">15-acre guided tour</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Direct Concierge Contact Links */}
                        <div className="flex flex-col gap-3 w-full max-w-lg">
                            {/* Phone & WhatsApp Combined Luxury Card */}
                            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#0C1630]/80 to-[#070E22]/90 border border-white/10 hover:border-brand-cyan/30 transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg">
                                <a 
                                    href="tel:+919645464747"
                                    className="flex items-center gap-3 group/call flex-1 min-w-0"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover/call:bg-brand-cyan group-hover/call:text-brand-dark transition-all duration-300 shrink-0 shadow-[0_0_12px_rgba(0,180,216,0.2)]">
                                        <Phone size={15} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">Concierge Desk (24/7)</span>
                                        <span 
                                            className="text-white group-hover/call:text-brand-cyan-light font-semibold text-sm sm:text-[15px] tracking-wide transition-colors"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        >
                                            +91 96454 64747
                                        </span>
                                    </div>
                                </a>

                                <a 
                                    href="https://wa.me/919645464747?text=Hello%20Clouds%20Village,%20I%20would%20like%20to%20inquire%20about%20a%20private%20retreat."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/15 border border-emerald-400/35 hover:border-emerald-300 hover:bg-emerald-500/30 text-emerald-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs font-semibold shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] group/wa"
                                >
                                    <MessageCircle size={15} className="group-hover/wa:scale-110 transition-transform" />
                                    <span>WhatsApp Concierge</span>
                                </a>
                            </div>

                            {/* Email Card */}
                            <a 
                                href="mailto:cloudsvillage@gmail.com"
                                className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#0C1630]/80 to-[#070E22]/90 border border-white/10 hover:border-brand-cyan/35 transition-all flex items-center justify-between gap-3 shadow-lg group/mail"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover/mail:bg-brand-cyan group-hover/mail:text-brand-dark transition-all duration-300 shrink-0 shadow-[0_0_12px_rgba(0,180,216,0.2)]">
                                        <Mail size={15} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">Official Inquiries</span>
                                        <span 
                                            className="text-brand-cyan-light group-hover/mail:text-white font-medium text-xs sm:text-sm tracking-wide transition-colors truncate"
                                            style={{ fontFamily: "'Outfit', sans-serif" }}
                                        >
                                            cloudsvillage@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className="text-white/40 group-hover/mail:text-brand-cyan group-hover/mail:translate-x-1 transition-all duration-300 pr-1">
                                    <ArrowRight size={15} />
                                </div>
                            </a>

                            {/* Location & Instagram Navigation Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {/* Google Maps Card */}
                                <a
                                    href={contactLocationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0C1630]/80 to-[#070E22]/90 border border-white/10 hover:border-brand-cyan/35 transition-all flex items-center justify-between gap-2.5 shadow-lg group/loc"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-8 h-8 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover/loc:bg-brand-cyan group-hover/loc:text-brand-dark transition-all duration-300 shrink-0 shadow-[0_0_10px_rgba(0,180,216,0.2)]">
                                            <MapPin size={14} />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9.5px] uppercase tracking-wider text-white/50 font-medium">Location</span>
                                            <span 
                                                className="text-white group-hover/loc:text-brand-cyan-light font-medium text-xs tracking-wide truncate"
                                                style={{ fontFamily: "'Outfit', sans-serif" }}
                                            >
                                                Google Maps
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={14} className="text-white/40 group-hover/loc:text-brand-cyan shrink-0 transition-transform group-hover/loc:translate-x-0.5 group-hover/loc:-translate-y-0.5" />
                                </a>

                                {/* Instagram Card */}
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0C1630]/80 to-[#070E22]/90 border border-white/10 hover:border-pink-500/40 transition-all flex items-center justify-between gap-2.5 shadow-lg group/insta"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover/insta:bg-gradient-to-tr group-hover/insta:from-amber-500 group-hover/insta:via-rose-500 group-hover/insta:to-purple-600 group-hover/insta:text-white transition-all duration-300 shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                                            <Instagram size={14} />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9.5px] uppercase tracking-wider text-white/50 font-medium">Follow Us</span>
                                            <span 
                                                className="text-white group-hover/insta:text-pink-300 font-medium text-xs tracking-wide truncate"
                                                style={{ fontFamily: "'Outfit', sans-serif" }}
                                            >
                                                Instagram
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={14} className="text-white/40 group-hover/insta:text-pink-400 shrink-0 transition-transform group-hover/insta:translate-x-0.5 group-hover/insta:-translate-y-0.5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Architectural Reservation Pavilion */}
                    <div className="w-full lg:w-7/12">
                        <div className="relative rounded-3xl p-6 sm:p-9 lg:p-11 bg-gradient-to-b from-[#0B142B]/95 via-[#081024]/95 to-[#060B1A]/98 border border-brand-cyan/25 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden">
                            
                            {/* Luminous Top Rim Light */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/80 to-transparent" />
                            <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-cyan/[0.08] rounded-full blur-[80px] pointer-events-none" />

                            {bookingStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center relative z-10">
                                    <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan mb-6 shadow-[0_0_30px_rgba(0,180,216,0.35)]">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-3xl text-white mb-3 font-normal" style={{ fontFamily: "var(--font-display)" }}>
                                        Inquiry Received
                                    </h3>
                                    <p className="text-white/70 max-w-sm mb-6 font-light text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        Thank you. Our reservations desk will review your dates and contact you within a few hours.
                                    </p>
                                    <button
                                        onClick={() => setBookingStatus('idle')}
                                        className="px-8 py-3 rounded-full border border-brand-cyan/40 text-brand-cyan-light text-xs uppercase tracking-[0.18em] font-semibold hover:bg-brand-cyan/10 transition-colors"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Submit Another Request
                                    </button>
                                </div>
                            ) : (
                                <form 
                                    className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 relative z-10"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setBookingStatus('sending');
                                        const formElement = e.currentTarget;
                                        const formData = new FormData(formElement);
                                        const name = (formData.get('user_name') as string) || '';
                                        const phone = (formData.get('user_phone') as string) || '';
                                        const email = (formData.get('user_email') as string) || '';
                                        const checkIn = (formData.get('check_in') as string) || '';
                                        const checkOut = (formData.get('check_out') as string) || '';
                                        const roomType = (formData.get('room_type') as string) || bookingRoomType;
                                        const guests = (formData.get('guests') as string) || '';

                                        // 1. Persist directly to Supabase bookings table
                                        try {
                                            const { error: dbError } = await supabase.from('bookings').insert([{
                                                name,
                                                email,
                                                phone,
                                                date: checkIn,
                                                message: `Stay Dates: ${checkIn} to ${checkOut} | Accommodation: ${roomType} | Party Size: ${guests}`,
                                                status: 'pending'
                                            }]);
                                            if (dbError) {
                                                console.warn('Supabase booking record notice:', dbError.message);
                                            }
                                        } catch (dbErr) {
                                            console.warn('Supabase connection warning:', dbErr);
                                        }

                                        // 2. Dispatch via EmailJS (optional notification)
                                        try {
                                            await emailjs.sendForm(
                                                'service_clouds_village',
                                                'template_booking',
                                                formElement,
                                                'user_public_key'
                                            );
                                        } catch {
                                            // Graceful fallback
                                        }

                                        setBookingStatus('success');
                                        formElement.reset();
                                    }}
                                >
                                    {/* Section 01: Guest Particulars */}
                                    <div className="md:col-span-2">
                                        <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                                            <h4 
                                                className="text-brand-cyan text-xs font-bold uppercase tracking-[0.24em]"
                                                style={{ fontFamily: "var(--font-nav)" }}
                                            >
                                                01 • Guest Information
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Full Name */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                            <input 
                                                type="text" 
                                                name="user_name" 
                                                required 
                                                placeholder="e.g. Alex Morgan" 
                                                className="w-full bg-[#060A17]/80 border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all" 
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                            <input 
                                                type="tel" 
                                                name="user_phone" 
                                                required 
                                                placeholder="+91 96454 64747" 
                                                className="w-full bg-[#060A17]/80 border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all" 
                                            />
                                        </div>
                                    </div>

                                    {/* Email Address */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                            <input 
                                                type="email" 
                                                name="user_email" 
                                                required 
                                                placeholder="alex@example.com" 
                                                className="w-full bg-[#060A17]/80 border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all" 
                                            />
                                        </div>
                                    </div>

                                    {/* Section 02: Stay & Suite Preferences */}
                                    <div className="md:col-span-2 mt-3">
                                        <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                                            <h4 
                                                className="text-brand-cyan text-xs font-bold uppercase tracking-[0.24em]"
                                                style={{ fontFamily: "var(--font-nav)" }}
                                            >
                                                02 • Stay Preferences
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Check In Date */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Check In Date *
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                name="check_in" 
                                                required 
                                                className="w-full bg-[#060A17]/80 border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 px-4 text-sm text-white [color-scheme:dark] outline-none transition-all" 
                                            />
                                        </div>
                                    </div>

                                    {/* Check Out Date */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Check Out Date *
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                name="check_out" 
                                                required 
                                                className="w-full bg-[#060A17]/80 border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 px-4 text-sm text-white [color-scheme:dark] outline-none transition-all" 
                                            />
                                        </div>
                                    </div>

                                    {/* Accommodation */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Accommodation Style *
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="room_type"
                                                value={bookingRoomType}
                                                onChange={(e) => setBookingRoomType(e.target.value)}
                                                className="w-full bg-[#060A17] border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 px-4 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Heritage Plantation Cottage">Heritage Plantation Cottage</option>
                                                <option value="Luxury Mountain Suite">Luxury Mountain Suite</option>
                                                <option value="Highland Villa / Dormitory">Highland Villa / Group Dormitory</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/70 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em]">
                                            Party Size *
                                        </label>
                                        <div className="relative">
                                            <select 
                                                name="guests" 
                                                defaultValue="2 Adults"
                                                className="w-full bg-[#060A17] border border-white/15 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40 rounded-xl py-3.5 px-4 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="1 Guest">1 Guest</option>
                                                <option value="2 Adults">2 Adults (Couple)</option>
                                                <option value="3 Guests">3 Guests</option>
                                                <option value="4 Guests">4 Guests (Family)</option>
                                                <option value="5+ Guests">Group / Reunion (5+ Guests)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grand Submit CTA Button */}
                                    <div className="md:col-span-2 mt-4">
                                        <button
                                            type="submit"
                                            disabled={bookingStatus === 'sending'}
                                            className="w-full py-4.5 rounded-xl bg-gradient-to-r from-brand-cyan via-[#00B4D8] to-brand-cyan-light text-brand-dark font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,180,216,0.45)] hover:shadow-[0_0_50px_rgba(0,180,216,0.75)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            <span>
                                                {bookingStatus === 'sending' ? 'Transmitting Sanctuary Request...' : 'Submit Booking Inquiry'}
                                            </span>
                                            <ArrowRight size={15} />
                                        </button>

                                        {/* Reassurance Footer */}
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 text-[10.5px] text-white/50 font-light">
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck size={13} className="text-emerald-400" />
                                                <span>Zero Booking Fee • Direct Estate Guarantee</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={13} className="text-brand-cyan" />
                                                <span>Prompt Confirmation Within 2 Hours</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
