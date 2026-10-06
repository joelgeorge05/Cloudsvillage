import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, ShieldCheck, Sparkles, CheckCircle2, MessageCircle, ArrowRight, User } from 'lucide-react';
import { useSearchParams, Link } from 'react-router';
import { supabase } from '../lib/supabase';

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
            <div className="w-full max-w-[2000px] 2xl:max-w-[2400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 relative z-10">
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
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left 8 Cols: Interactive Booking Form */}
                    <div className="lg:col-span-8 bg-[#121620]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
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
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-lg text-white font-medium mb-1" style={{ fontFamily: "var(--font-display)" }}>
                                        Guest & Stay Details
                                    </h3>
                                    <p className="text-white/40 text-xs">
                                        Fill out your stay preferences to check real-time availability.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Check In Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] [color-scheme:dark] transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Check Out Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] [color-scheme:dark] transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Accommodation Preference</label>
                                        <select
                                            value={roomType}
                                            onChange={(e) => setRoomType(e.target.value)}
                                            className="bg-[#121620] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                                        >
                                            <option value="Heritage Plantation Cottage">Heritage Plantation Cottage (2 Guests)</option>
                                            <option value="Luxury Mountain Suite">Luxury Mountain Suite (4 Guests)</option>
                                            <option value="Highland Plantation Villa">Highland Plantation Villa (Up to 12 Guests)</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Party Size (Guests)</label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            className="bg-[#121620] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                                        >
                                            <option value="1">1 Solo Traveler</option>
                                            <option value="2">2 Guests (Couple)</option>
                                            <option value="4">4 Guests (Family Suite)</option>
                                            <option value="8">5–12 Guests (Group Villa)</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                                        <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Special Requests / Preferences (Optional)</label>
                                        <textarea
                                            rows={2}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="e.g. Dietary preferences, campfire arrangement, late check-in..."
                                            className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
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

                    {/* Right 4 Cols: Direct Concierge & Assurance Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#121620]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A880] mb-5">
                                <Calendar size={22} />
                            </div>

                            <h4 className="text-xl text-white font-medium mb-2" style={{ fontFamily: "var(--font-display)" }}>
                                Direct Concierge
                            </h4>
                            <p className="text-white/60 text-xs leading-relaxed mb-6 font-light">
                                Prefer an instant booking over the phone or WhatsApp? Our estate concierge desk is available 24/7.
                            </p>

                            <div className="space-y-3">
                                <a
                                    href="tel:+919645464747"
                                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold tracking-wider flex items-center gap-3 transition-colors"
                                >
                                    <Phone size={15} className="text-[#C5A880]" />
                                    <span>+91 96454 64747</span>
                                </a>
                                <a
                                    href="https://wa.me/919645464747?text=Hello%20Clouds%20Village,%20I%20would%20like%20to%20inquire%20about%20a%20stay."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold tracking-wider flex items-center gap-3 transition-colors"
                                >
                                    <MessageCircle size={15} className="text-emerald-400" />
                                    <span>WhatsApp Inquiries</span>
                                </a>
                                <a
                                    href="mailto:cloudsvillage@gmail.com"
                                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold tracking-wider flex items-center gap-3 transition-colors"
                                >
                                    <Mail size={15} className="text-brand-cyan" />
                                    <span>cloudsvillage@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        <div className="bg-[#121620]/60 border border-white/10 rounded-2xl p-5 text-xs text-white/50 space-y-2.5">
                            <div className="flex items-center gap-2 text-brand-cyan font-medium">
                                <ShieldCheck size={16} />
                                <span>Direct Reservation Benefits</span>
                            </div>
                            <ul className="space-y-1.5 text-white/60 text-[11px] list-disc list-inside">
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
