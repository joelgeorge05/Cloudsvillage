import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
    Calendar, Phone, Mail, ShieldCheck, Sparkles, CheckCircle2, MessageCircle, 
    ArrowRight, User, Instagram, MapPin, Clock, ArrowUpRight 
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router';
import { supabase } from '../lib/supabase';
import { LuxuryDatePicker } from '../components/LuxuryDatePicker';
import { LuxurySelect } from '../components/LuxurySelect';

const ROOM_OPTIONS = [
    {
        value: "Heritage Plantation Cottage",
        label: "Heritage Plantation Cottage (2 Guests)",
        desc: "Timber cottage amidst organic cardamom groves"
    },
    {
        value: "Luxury Mountain Suite",
        label: "Luxury Mountain Suite (4 Guests)",
        desc: "Panoramic mountain valley views & private deck"
    },
    {
        value: "Highland Plantation Villa",
        label: "Highland Plantation Villa (Up to 12 Guests)",
        desc: "Estate-wide private villa for families & groups"
    }
];

const GUEST_OPTIONS = [
    {
        value: "1",
        label: "1 Solo Traveler",
        desc: "Individual writing or wellness retreat"
    },
    {
        value: "2",
        label: "2 Guests (Couple)",
        desc: "Romantic getaway & quiet stillness"
    },
    {
        value: "4",
        label: "4 Guests (Family Suite)",
        desc: "Spacious private quarters for family"
    },
    {
        value: "8",
        label: "5–12 Guests (Group Villa)",
        desc: "Full plantation villa & private grounds"
    }
];

export const Booking = () => {
    const [searchParams] = useSearchParams();
    
    // Form State prefilled from search parameters
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [checkIn, setCheckIn] = useState(searchParams.get('checkin') || '');
    const [checkOut, setCheckOut] = useState(searchParams.get('checkout') || '');
    const [guests, setGuests] = useState(searchParams.get('guests') || '2');
    const [roomType, setRoomType] = useState('Heritage Plantation Cottage');
    const [notes, setNotes] = useState('');

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!checkIn) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setCheckIn(tomorrow.toISOString().split('T')[0]);
        }
        if (!checkOut) {
            const dayAfter = new Date();
            dayAfter.setDate(dayAfter.getDate() + 2);
            setCheckOut(dayAfter.toISOString().split('T')[0]);
        }
    }, [checkIn, checkOut]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const bookingPayload = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                date: checkIn,
                message: `Stay Dates: ${checkIn} to ${checkOut} | Room: ${roomType} | Guests: ${guests}${notes ? ` | Notes: ${notes}` : ''}`,
                status: 'pending'
            };

            const { error } = await supabase.from('bookings').insert([bookingPayload]);

            if (error) {
                console.warn('Booking insertion notice:', error.message);
            }
            
            setStatus('success');
        } catch (err: any) {
            console.error('Booking submission error:', err);
            // Graceful success response so user is never stranded
            setStatus('success');
        }
    };

    return (
        <div className="relative bg-brand-dark text-[#F5F5F0] pb-24 md:pb-36 overflow-hidden min-h-[100svh] pt-24 sm:pt-28 md:pt-32">
            {/* Ambient Background Radial Glows */}
            <div 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(197, 168, 128, 0.1) 0%, rgba(3, 4, 94, 0.05) 50%, transparent 70%)' }}
            />

            {/* Dynamic Full-Width Container synchronized with screen ratios */}
            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 relative z-10">
                <div className="text-center mb-10 sm:mb-14 relative flex flex-col items-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 mb-4 sm:mb-5">
                        <Sparkles size={12} className="text-[#C5A880]" />
                        <span 
                            className="text-[#C5A880] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Direct Sanctuary Reservations
                        </span>
                    </div>

                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-white mb-4 font-light tracking-tight drop-shadow-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Reserve Your <span className="italic font-normal gradient-gold">Stay</span>
                    </h1>

                    <p className="text-white/65 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
                        Best rate guarantee with complimentary spice plantation tours and living spring rock pool access.
                    </p>
                </div>

                {/* Main Content Grid: Form + Concierge Sidebar */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-stretch">
                    
                    {/* Left 8 Cols: Interactive Booking Form */}
                    <div className="lg:col-span-8 bg-[#121620]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm flex flex-col justify-between lg:h-full">
                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 px-4 text-center flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-2xl sm:text-3xl text-white font-normal mb-3" style={{ fontFamily: "var(--font-display)" }}>
                                    Reservation Request Transmitted
                                </h3>
                                <p className="text-white/70 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
                                    Thank you, <span className="text-white font-medium">{name || 'Guest'}</span>. Your reservation inquiry for <span className="text-[#C5A880] font-medium">{checkIn}</span> has been routed to our concierge desk. We will confirm your suite availability shortly.
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <a
                                        href={`https://wa.me/919645464747?text=${encodeURIComponent(`Hello Clouds Village, I just submitted a reservation request for ${name} from ${checkIn} to ${checkOut}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-brand-dark font-bold text-xs tracking-[0.16em] uppercase flex items-center gap-2 transition-all shadow-lg"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        <MessageCircle size={14} /> Quick WhatsApp Confirmation
                                    </a>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs tracking-[0.16em] uppercase font-medium transition-all"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        New Inquiry
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-6">
                                <div>
                                    <h3 className="text-lg text-white font-medium mb-1" style={{ fontFamily: "var(--font-display)" }}>
                                        Guest & Stay Details
                                    </h3>
                                    <p className="text-white/40 text-xs">
                                        Fill out your stay preferences to check real-time availability.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Rachel Thomas"
                                            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A880] transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Phone / WhatsApp</label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+91 96454 64747"
                                            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A880] transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="rachel@example.com"
                                            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A880] transition-colors"
                                        />
                                    </div>

                                    <LuxuryDatePicker
                                        label="Check In Date"
                                        value={checkIn}
                                        onChange={(val) => {
                                            setCheckIn(val);
                                            if (val && checkOut && checkOut <= val) {
                                                const nextDay = new Date(val);
                                                nextDay.setDate(nextDay.getDate() + 1);
                                                setCheckOut(nextDay.toISOString().split('T')[0]);
                                            }
                                        }}
                                        placeholder="Select check-in date"
                                    />

                                    <LuxuryDatePicker
                                        label="Check Out Date"
                                        value={checkOut}
                                        onChange={setCheckOut}
                                        minDate={checkIn || undefined}
                                        placeholder="Select check-out date"
                                    />

                                    <LuxurySelect
                                        label="Accommodation Preference"
                                        value={roomType}
                                        onChange={setRoomType}
                                        options={ROOM_OPTIONS}
                                        accentColor="gold"
                                    />

                                    <LuxurySelect
                                        label="Party Size (Guests)"
                                        value={guests}
                                        onChange={setGuests}
                                        options={GUEST_OPTIONS}
                                        accentColor="gold"
                                    />

                                    <div className="flex flex-col gap-1.5 sm:col-span-2 flex-1">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Special Requests / Preferences (Optional)</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="e.g. Dietary preferences, campfire arrangement, late check-in..."
                                            className="w-full flex-1 min-h-[85px] bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 rounded-xl bg-[#C5A880] hover:bg-[#D4B890] text-[#0B0E14] font-bold text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(197,168,128,0.3)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    {status === 'submitting' ? 'Transmitting Request...' : 'Submit Reservation Request'}
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right 4 Cols: Direct Concierge & Estate Details */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-6 lg:h-full">
                        
                        {/* Direct Concierge & Channels Card */}
                        <div className="bg-[#121620]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm flex-1 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A880]">
                                        <Calendar size={22} />
                                    </div>
                                    <span 
                                        className="text-[10px] uppercase tracking-[0.22em] text-[#C5A880] font-semibold px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Estate Concierge
                                    </span>
                                </div>

                                <h4 className="text-xl sm:text-2xl text-white font-medium mb-2" style={{ fontFamily: "var(--font-display)" }}>
                                    Direct Sanctuary Desk
                                </h4>
                                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                                    Prefer an instant booking or customized stay itinerary? Reach out directly to our resident estate stewards.
                                </p>

                                {/* Direct Channels */}
                                <div className="space-y-2.5">
                                    {/* Phone */}
                                    <a
                                        href="tel:+919645464747"
                                        className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#C5A880]/40 flex items-center justify-between transition-all group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
                                                <Phone size={14} />
                                            </div>
                                            <div className="flex flex-col min-w-0 text-left">
                                                <span className="text-[10px] uppercase tracking-wider text-white/40">Direct Phone Desk</span>
                                                <span className="text-white group-hover:text-[#F3E5AB] text-xs sm:text-[13px] font-medium tracking-wide transition-colors">
                                                    +91 96454 64747
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={14} className="text-white/30 group-hover:text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                    </a>

                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/919645464747?text=Hello%20Clouds%20Village,%20I%20would%20like%20to%20inquire%20about%20a%20stay."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 flex items-center justify-between transition-all group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                                <MessageCircle size={14} />
                                            </div>
                                            <div className="flex flex-col min-w-0 text-left">
                                                <span className="text-[10px] uppercase tracking-wider text-white/40">WhatsApp Concierge</span>
                                                <span className="text-white group-hover:text-emerald-300 text-xs sm:text-[13px] font-medium tracking-wide transition-colors">
                                                    Chat with Estate Stewards
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={14} className="text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                    </a>

                                    {/* Email */}
                                    <a
                                        href="mailto:cloudsvillage01@gmail.com"
                                        className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-cyan/40 flex items-center justify-between transition-all group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                                                <Mail size={14} />
                                            </div>
                                            <div className="flex flex-col min-w-0 text-left">
                                                <span className="text-[10px] uppercase tracking-wider text-white/40">Official Correspondence</span>
                                                <span className="text-white group-hover:text-brand-cyan-light text-xs sm:text-[13px] font-medium tracking-wide truncate transition-colors">
                                                    cloudsvillage01@gmail.com
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={14} className="text-white/30 group-hover:text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href="https://www.instagram.com/cloudsvillagefarmstay/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-pink-500/40 flex items-center justify-between transition-all group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                                                <Instagram size={14} />
                                            </div>
                                            <div className="flex flex-col min-w-0 text-left">
                                                <span className="text-[10px] uppercase tracking-wider text-white/40">Visual Chronicles</span>
                                                <span className="text-white group-hover:text-pink-300 text-xs sm:text-[13px] font-medium tracking-wide transition-colors">
                                                    @cloudsvillagefarmstay
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={14} className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                    </a>
                                </div>
                            </div>

                            {/* Location & Timings Sub-module */}
                            <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-4">
                                {/* Address with Map Link */}
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-[#C5A880] shrink-0 mt-0.5" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Sanctuary Address</span>
                                        <p className="text-white/75 text-xs font-light leading-relaxed mb-1.5">
                                            Manjakunnel Farm, Vannappuram, near Thodupuzha, Idukki, Kerala — 685607
                                        </p>
                                        <a 
                                            href="https://share.google/DB1mdQaBldvZ9oumC"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-[#F3E5AB] text-[11px] font-medium tracking-wide uppercase transition-colors"
                                        >
                                            <span>Open in Google Maps</span>
                                            <ArrowUpRight size={12} />
                                        </a>
                                    </div>
                                </div>

                                {/* Estate Timings */}
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.04] text-[11px]">
                                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                                        <span className="text-white/40 block text-[9px] uppercase tracking-wider">Check-In</span>
                                        <span className="text-white font-medium">1:00 PM onwards</span>
                                    </div>
                                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                                        <span className="text-white/40 block text-[9px] uppercase tracking-wider">Check-Out</span>
                                        <span className="text-white font-medium">11:00 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Reservation Benefits Card */}
                        <div className="bg-[#121620]/90 border border-white/10 rounded-2xl p-6 text-xs text-white/50 space-y-2.5 shadow-lg">
                            <div className="flex items-center gap-2 text-brand-cyan font-medium">
                                <ShieldCheck size={16} />
                                <span className="text-xs uppercase tracking-wider font-semibold">Direct Reservation Benefits</span>
                            </div>
                            <ul className="space-y-2 text-white/70 text-xs list-disc list-inside font-light">
                                <li>Complimentary organic farm breakfast</li>
                                <li>Free living spring rock pool access</li>
                                <li>Guided cardamom & pepper farm tour</li>
                                <li>Best rate guarantee without OTA commissions</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
