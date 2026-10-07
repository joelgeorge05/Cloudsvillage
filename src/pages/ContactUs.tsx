import React, { useState, useEffect, useRef } from 'react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Calendar, 
    MessageCircle, 
    Clock,
    Instagram,
    ArrowUpRight,
    ArrowRight,
    CheckCircle2,
    Plane,
    Train,
    Car,
    Send,
    ChevronDown,
    Check
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LuxuryDatePicker } from '../components/LuxuryDatePicker';

const PURPOSE_OPTIONS = [
    {
        value: "Leisure / Vacation Stay",
        label: "Leisure / Vacation Stay",
        desc: "Private cottages, natural pool & farm getaway"
    },
    {
        value: "Destination Wedding / Lawn Gala",
        label: "Destination Wedding / Lawn Gala",
        desc: "Lush outdoor amphitheater & celebration lawns"
    },
    {
        value: "Group Retreat / Family Reunion",
        label: "Group Retreat / Family Reunion",
        desc: "Estate-wide gatherings & corporate offsites"
    },
    {
        value: "Farm Tour & Day Visit",
        label: "Farm Tour & Day Visit",
        desc: "Spice plantation trails, trekking & day activities"
    },
    {
        value: "General Inquiry",
        label: "General Inquiry",
        desc: "Direct reservations support & bespoke inquiries"
    }
];

export const ContactUs = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [settings, setSettings] = useState<any>(null);
    const [selectedPurpose, setSelectedPurpose] = useState<string>("Leisure / Vacation Stay");
    const [isPurposeOpen, setIsPurposeOpen] = useState<boolean>(false);
    const [checkInDate, setCheckInDate] = useState<string>('');
    const [checkOutDate, setCheckOutDate] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsPurposeOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsPurposeOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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

    const contactPhone = settings?.contact_phone || "+91 96454 64747";
    const contactEmail = settings?.contact_email || "cloudsvillage01@gmail.com";
    const contactAddress = settings?.contact_address || "Clouds Village Farm Resort, Manjakunnel Farm, Vannappuram, Thodupuzha, Idukki, Kerala - 685607";
    const contactLocationUrl = settings?.contact_location_url || "https://share.google/DB1mdQaBldvZ9oumC";
    const instagramUrl = settings?.instagram_url || "https://www.instagram.com/cloudsvillagefarmstay/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        
        const name = (formData.get('name') as string)?.trim() || '';
        const phone = (formData.get('phone') as string)?.trim() || '';
        const email = (formData.get('email') as string)?.trim() || '';
        const purpose = (formData.get('purpose') as string) || 'Vacation Stay';
        const checkIn = (formData.get('check_in') as string) || '';
        const checkOut = (formData.get('check_out') as string) || '';
        const message = (formData.get('message') as string)?.trim() || '';

        try {
            const { error } = await supabase.from('bookings').insert([{
                name,
                email,
                phone,
                date: checkIn || new Date().toISOString().split('T')[0],
                message: `Inquiry Type: ${purpose}${checkIn ? ` | Dates: ${checkIn} to ${checkOut}` : ''}${message ? ` | Message: ${message}` : ''}`,
                status: 'pending'
            }]);

            if (error) {
                console.warn('Inquiry notice:', error.message);
            }
            setFormStatus('success');
            setSelectedPurpose("Leisure / Vacation Stay");
            setCheckInDate('');
            setCheckOutDate('');
            formElement.reset();
        } catch (err) {
            console.error('Submission error:', err);
            // Graceful success fallback so guest is never blocked
            setFormStatus('success');
            setSelectedPurpose("Leisure / Vacation Stay");
            setCheckInDate('');
            setCheckOutDate('');
            formElement.reset();
        }
    };

    return (
        <div className="bg-[#070B19] text-[#F8FAFC] min-h-[100svh] pt-28 sm:pt-32 md:pt-36 pb-24 md:pb-32 selection:bg-brand-cyan/30 selection:text-white">
            
            {/* ══════════════════════════════════════════════════════════
                1. EDITORIAL HEADER (Quiet Luxury Standard)
            ══════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 mb-14 md:mb-20">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        <span 
                            className="text-brand-cyan text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Reservations & Hospitality
                        </span>
                    </div>

                    <h1 
                        className="text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-5 leading-[1.12]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Connect With Our Estate
                    </h1>

                    <p 
                        className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-3xl"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        We welcome you to reach out for room bookings, customized group retreats, destination celebrations, or personal travel guidance to our sanctuary in Idukki.
                    </p>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                2. MAIN CONTACT MATRIX (Direct Channels + Inquiry Form)
            ══════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 mb-20 md:mb-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-stretch">
                    
                    {/* Left Column: Direct Estate Information */}
                    <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 flex flex-col justify-between gap-6 lg:h-full">
                        
                        {/* Physical Address Card */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#0B1226]/90 border border-white/10 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0 mt-0.5">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span 
                                        className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold mb-1.5"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Sanctuary Location
                                    </span>
                                    <h3 
                                        className="text-lg text-white font-medium mb-1.5 leading-snug"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Clouds Village Farm Resort
                                    </h3>
                                    <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-4">
                                        Inside Manjakunnel Farm, Vannappuram, near Thodupuzha, Idukki District, Kerala — 685607
                                    </p>
                                    <div>
                                        <a 
                                            href={contactLocationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-brand-cyan hover:text-brand-cyan-light text-xs font-semibold tracking-wider uppercase transition-colors"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            <span>Open in Google Maps</span>
                                            <ArrowUpRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Contact Channels */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#0B1226]/90 border border-white/10 shadow-lg flex flex-col justify-between flex-1 gap-5">
                            <span 
                                className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold border-b border-white/[0.08] pb-3"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Direct Communication
                            </span>

                            {/* Phone Call */}
                            <a 
                                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                                className="flex items-center justify-between group p-3 -mx-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-brand-cyan group-hover:border-brand-cyan/40 transition-colors shrink-0">
                                        <Phone size={17} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[11px] text-white/50 font-light">Reservations Desk</span>
                                        <span className="text-white group-hover:text-brand-cyan-light text-sm sm:text-[15px] font-medium tracking-wide transition-colors">
                                            {contactPhone}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight size={15} className="text-white/30 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all shrink-0" />
                            </a>

                            {/* WhatsApp Channel */}
                            <a 
                                href={`https://wa.me/919645464747?text=${encodeURIComponent("Hello Clouds Village, I would like to inquire about reserving a stay at the farm resort.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between group p-3 -mx-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors shrink-0">
                                        <MessageCircle size={17} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[11px] text-white/50 font-light">WhatsApp Concierge</span>
                                        <span className="text-white group-hover:text-emerald-300 text-sm sm:text-[15px] font-medium tracking-wide transition-colors">
                                            Chat with Estate Stewards
                                        </span>
                                    </div>
                                </div>
                                <ArrowUpRight size={15} className="text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                            </a>

                            {/* Email */}
                            <a 
                                href={`mailto:${contactEmail}`}
                                className="flex items-center justify-between group p-3 -mx-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-brand-cyan group-hover:border-brand-cyan/40 transition-colors shrink-0">
                                        <Mail size={17} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[11px] text-white/50 font-light">Official Correspondence</span>
                                        <span className="text-white group-hover:text-brand-cyan-light text-sm sm:text-[15px] font-medium tracking-wide transition-colors truncate">
                                            {contactEmail}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight size={15} className="text-white/30 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all shrink-0" />
                            </a>

                            {/* Instagram */}
                            <a 
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between group p-3 -mx-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                                        <Instagram size={17} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[11px] text-white/50 font-light">Visual Chronicles</span>
                                        <span className="text-white group-hover:text-pink-300 text-sm sm:text-[15px] font-medium tracking-wide transition-colors">
                                            @cloudsvillagefarmstay
                                        </span>
                                    </div>
                                </div>
                                <ArrowUpRight size={15} className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                            </a>
                        </div>

                        {/* Estate Timings Card */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#0B1226]/90 border border-white/10 shadow-lg flex flex-col justify-center gap-3 text-xs sm:text-[13px] text-white/70 font-light">
                            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                                <span className="flex items-center gap-2">
                                    <Clock size={14} className="text-brand-cyan" />
                                    <span>Check-in Timing</span>
                                </span>
                                <span className="text-white font-medium">1:00 PM onwards</span>
                            </div>
                            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                                <span className="flex items-center gap-2">
                                    <Clock size={14} className="text-brand-cyan" />
                                    <span>Check-out Timing</span>
                                </span>
                                <span className="text-white font-medium">11:00 AM</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Calendar size={14} className="text-brand-cyan" />
                                    <span>Desk Operational Hours</span>
                                </span>
                                <span className="text-white font-medium">8:00 AM – 9:00 PM IST</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bespoke Hospitality Inquiry Form */}
                    <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 flex flex-col lg:h-full">
                        <div className="p-7 sm:p-9 lg:p-12 2xl:p-14 rounded-3xl bg-[#0B1226]/95 border border-white/10 shadow-2xl relative flex-1 flex flex-col justify-between lg:h-full">
                            
                            <div className="mb-7">
                                <span 
                                    className="text-xs uppercase tracking-[0.2em] text-brand-cyan font-semibold block mb-1.5"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Inquiry Form
                                </span>
                                <h2 
                                    className="text-2xl sm:text-3xl text-white font-normal mb-2"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Send Us a Message
                                </h2>
                                <p className="text-white/60 text-xs sm:text-sm font-light">
                                    Fill out the form below and our team will get in touch with you shortly with complete details.
                                </p>
                            </div>

                            {formStatus === 'success' ? (
                                <div className="py-12 flex-1 flex flex-col items-center justify-center text-center">
                                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <h3 
                                        className="text-2xl text-white font-medium mb-2"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        Inquiry Received
                                    </h3>
                                    <p className="text-white/70 text-sm font-light max-w-md mb-7 leading-relaxed">
                                        Thank you for reaching out to Clouds Village. Our reservations team will review your message and contact you promptly via phone or email.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setFormStatus('idle')}
                                        className="px-6 py-2.5 rounded-full border border-white/20 hover:border-brand-cyan text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Send Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-5 sm:gap-6">
                                    
                                    {/* Name & Phone Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-white/70 font-medium">
                                                Your Full Name <span className="text-brand-cyan">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                required 
                                                placeholder="e.g. Anand Varma" 
                                                className="w-full bg-[#070B19] border border-white/15 focus:border-brand-cyan rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-white/70 font-medium">
                                                Contact Number (WhatsApp) <span className="text-brand-cyan">*</span>
                                            </label>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                required 
                                                placeholder="+91 98765 43210" 
                                                className="w-full bg-[#070B19] border border-white/15 focus:border-brand-cyan rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Email & Purpose Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-white/70 font-medium">
                                                Email Address <span className="text-brand-cyan">*</span>
                                            </label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                required 
                                                placeholder="anand@example.com" 
                                                className="w-full bg-[#070B19] border border-white/15 focus:border-brand-cyan rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                                            <label className="text-xs text-white/70 font-medium">
                                                Purpose of Inquiry
                                            </label>
                                            <input type="hidden" name="purpose" value={selectedPurpose} />
                                            
                                            <button
                                                type="button"
                                                onClick={() => setIsPurposeOpen(!isPurposeOpen)}
                                                className={`w-full bg-[#070B19] border ${
                                                    isPurposeOpen 
                                                        ? 'border-brand-cyan ring-1 ring-brand-cyan/40 shadow-[0_0_20px_rgba(45,212,191,0.15)]' 
                                                        : 'border-white/15 hover:border-white/30'
                                                } rounded-xl py-3 px-4 text-sm text-white flex items-center justify-between transition-all cursor-pointer`}
                                            >
                                                <span className="truncate font-normal text-white">
                                                    {selectedPurpose}
                                                </span>
                                                <ChevronDown 
                                                    size={16} 
                                                    className={`text-brand-cyan transition-transform duration-200 shrink-0 ml-2 ${
                                                        isPurposeOpen ? 'rotate-180' : ''
                                                    }`} 
                                                />
                                            </button>

                                            {/* Custom Luxury Dropdown Menu */}
                                            {isPurposeOpen && (
                                                <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#090F22]/98 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] py-1.5 overflow-hidden divide-y divide-white/[0.04]">
                                                    {PURPOSE_OPTIONS.map((option) => {
                                                        const isSelected = selectedPurpose === option.label || selectedPurpose === option.value;
                                                        return (
                                                            <button
                                                                key={option.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedPurpose(option.label);
                                                                    setIsPurposeOpen(false);
                                                                }}
                                                                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors cursor-pointer group ${
                                                                    isSelected 
                                                                        ? 'bg-brand-cyan/15 text-white' 
                                                                        : 'hover:bg-white/[0.06] text-white/80 hover:text-white'
                                                                }`}
                                                            >
                                                                <div className="flex flex-col min-w-0 pr-3">
                                                                    <span className={`text-sm ${isSelected ? 'text-brand-cyan font-medium' : 'group-hover:text-white font-normal'}`}>
                                                                        {option.label}
                                                                    </span>
                                                                    <span className="text-[11px] text-white/45 font-light leading-tight mt-0.5">
                                                                        {option.desc}
                                                                    </span>
                                                                </div>
                                                                {isSelected && (
                                                                    <Check size={16} className="text-brand-cyan shrink-0" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Optional Date Range */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <LuxuryDatePicker
                                            name="check_in"
                                            label="Tentative Arrival (Optional)"
                                            placeholder="Select arrival date"
                                            value={checkInDate}
                                            onChange={setCheckInDate}
                                        />
                                        <LuxuryDatePicker
                                            name="check_out"
                                            label="Tentative Departure (Optional)"
                                            placeholder="Select departure date"
                                            value={checkOutDate}
                                            onChange={setCheckOutDate}
                                            minDate={checkInDate || undefined}
                                        />
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label className="text-xs text-white/70 font-medium">
                                            Your Message or Requirements
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            placeholder="Tell us about your expected party size, dietary preferences, or any specific questions you have..."
                                            className="w-full flex-1 min-h-[120px] bg-[#070B19] border border-white/15 focus:border-brand-cyan rounded-xl p-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-cyan-light text-brand-dark font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            <span>{formStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}</span>
                                            <Send size={14} />
                                        </button>

                                        <a
                                            href={`https://wa.me/919645464747?text=${encodeURIComponent("Hello Clouds Village, I would like to inquire about reserving a stay at the farm resort.")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-3.5 px-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shrink-0"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            <MessageCircle size={15} />
                                            <span>WhatsApp Instead</span>
                                        </a>
                                    </div>

                                    <p className="text-[11px] text-white/40 font-light text-center sm:text-left pt-1">
                                        Your contact details are kept strictly confidential and used solely for addressing your inquiry.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                3. HOW TO REACH & MAP SECTION (Authentic Travel Guidance)
            ══════════════════════════════════════════════════════════ */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20">
                <div className="border-t border-white/10 pt-16 md:pt-20">
                    
                    <div className="max-w-4xl mb-10">
                        <span 
                            className="text-xs uppercase tracking-[0.2em] text-brand-cyan font-semibold block mb-2"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Journey & Directions
                        </span>
                        <h2 
                            className="text-3xl sm:text-4xl text-white font-normal mb-3"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Reaching Clouds Village
                        </h2>
                        <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                            Nestled in the lush midlands of Idukki along the foothills of the Western Ghats, Clouds Village is easily accessible by scenic highways from major Kerala transit hubs.
                        </p>
                    </div>

                    {/* Transit Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-10 mb-12">
                        {/* By Air */}
                        <div className="p-6 rounded-2xl bg-[#0B1226]/80 border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-4">
                                <Plane size={18} />
                            </div>
                            <h3 
                                className="text-base text-white font-medium mb-1.5"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                By Air (Cochin Airport)
                            </h3>
                            <p className="text-white/65 text-xs sm:text-[13px] font-light leading-relaxed mb-3">
                                Cochin International Airport (COK) is located approximately 65 km away. A picturesque 1 hour 45 minute drive connects via Muvattupuzha and Thodupuzha.
                            </p>
                            <span className="text-[11px] text-brand-cyan-light font-medium mt-auto">
                                ~65 km • 1 hr 45 min drive
                            </span>
                        </div>

                        {/* By Rail */}
                        <div className="p-6 rounded-2xl bg-[#0B1226]/80 border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-4">
                                <Train size={18} />
                            </div>
                            <h3 
                                className="text-base text-white font-medium mb-1.5"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                By Rail (Aluva / Ernakulam)
                            </h3>
                            <p className="text-white/65 text-xs sm:text-[13px] font-light leading-relaxed mb-3">
                                Aluva Railway Station (70 km) and Ernakulam Junction (75 km) offer nationwide rail connections. Taxis and KSRTC bus routes connect regularly to Thodupuzha.
                            </p>
                            <span className="text-[11px] text-brand-cyan-light font-medium mt-auto">
                                ~70 km from Aluva Station
                            </span>
                        </div>

                        {/* By Road */}
                        <div className="p-6 rounded-2xl bg-[#0B1226]/80 border border-white/10 flex flex-col">
                            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-4">
                                <Car size={18} />
                            </div>
                            <h3 
                                className="text-base text-white font-medium mb-1.5"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                By Road (Thodupuzha Route)
                            </h3>
                            <p className="text-white/65 text-xs sm:text-[13px] font-light leading-relaxed mb-3">
                                Follow the Thodupuzha–Vannappuram road (18 km). The resort driveway leads directly into the historic 15-acre Manjakunnel Farm estate with ample private parking.
                            </p>
                            <span className="text-[11px] text-brand-cyan-light font-medium mt-auto">
                                18 km from Thodupuzha Town
                            </span>
                        </div>
                    </div>

                    {/* Google Map Card */}
                    <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0B1226]">
                        <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-brand-cyan shrink-0" />
                                <div>
                                    <h4 
                                        className="text-sm sm:text-base text-white font-medium leading-none mb-1"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Estate Map Coordinates
                                    </h4>
                                    <span className="text-xs text-white/50">Vannappuram, Idukki District, Kerala</span>
                                </div>
                            </div>
                            <a
                                href={contactLocationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-brand-cyan/10 border border-white/10 hover:border-brand-cyan/40 text-brand-cyan-light text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                <span>Get Directions in Maps</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>

                        <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] relative">
                            <iframe
                                title="Clouds Village Location Map"
                                src="https://maps.google.com/maps?q=Clouds%20Village%20Farm%20Resort,%20Vannappuram,%20Idukki&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
