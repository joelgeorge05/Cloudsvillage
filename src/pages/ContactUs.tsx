import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';

export const ContactUs = () => {
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [bookingRoomType, setBookingRoomType] = useState('Suite Room');
    const [bookingAdults, setBookingAdults] = useState(2);
    const [bookingChildren, setBookingChildren] = useState(0);

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 py-20 md:py-32 border-y border-white/5 min-h-[100svh] flex items-center mt-16 md:mt-20"
        >
            <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                <div className="w-full lg:w-1/3">
                    <span className="text-brand-cyan text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Reservations</span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6">Book Your Stay</h2>
                    <p className="text-white/60 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                        Ready for your luxury escape? Select your dates, guests, and preferred room type to check availability instantly. We guarantee the best rates when booking direct.
                    </p>
                    <div className="flex items-center gap-4 text-white/80">
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-cyan">
                            <Coffee size={20} />
                        </div>
                        <span className="text-sm">Breakfast included with all direct bookings</span>
                    </div>
                </div>

                <div className="w-full lg:w-2/3">
                    <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 pointer-events-none" />

                        {bookingStatus === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center h-full relative z-10">
                                <div className="w-20 h-20 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="font-display font-bold text-3xl text-white mb-4">Request Sent!</h3>
                                <p className="text-white/60 max-w-sm">Thank you for your inquiry. Our team will check availability and get back to you shortly.</p>
                                <button
                                    onClick={() => setBookingStatus('idle')}
                                    className="mt-8 px-6 py-2 border border-brand-cyan text-brand-cyan rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition-colors"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10" onSubmit={(e) => {
                                e.preventDefault();

                                const formElement = e.currentTarget;
                                const formData = new FormData(formElement);
                                const checkIn = formData.get('check_in');
                                const checkOut = formData.get('check_out');

                                if (!checkIn || !checkOut) {
                                    alert('Please select check-in and check-out dates.');
                                    return;
                                }

                                setBookingStatus('sending');

                                // Save to Supabase
                                const saveToSupabase = async () => {
                                    const { error } = await supabase
                                        .from('bookings')
                                        .insert([{
                                            user_name: formData.get('user_name'),
                                            user_phone: formData.get('user_phone'),
                                            user_email: formData.get('user_email'),
                                            check_in: checkIn,
                                            check_out: checkOut,
                                            room_type: formData.get('room_type'),
                                            guests: formData.get('guests') || `${bookingAdults} Adults, ${bookingChildren} Children`
                                        }]);

                                    if (error) {
                                        console.error('Error saving to Supabase:', error);
                                        // We continue even if Supabase fails, as EmailJS is the primary notification
                                    }
                                };

                                saveToSupabase();

                                emailjs.sendForm(
                                    'service_hu3jl8g',   // User's Service ID
                                    'template_y8kgrhq',  // User's Template ID
                                    formElement,
                                    'cDIGWBEFd8TNUon5u'  // User's Public Key
                                )
                                    .then((result) => {
                                        console.log('SUCCESS!', result.text);
                                        setBookingStatus('success');
                                        formElement.reset();
                                    }, (error) => {
                                        console.log('FAILED...', error.text || error);
                                        setBookingStatus('error');
                                        alert(`Oops! Something went wrong: ${error.text || 'Unknown Error'}. Please contact us directly.`);
                                    });

                            }}>
                                {/* Personal Details */}
                                <div className="md:col-span-2">
                                    <h4 className="text-brand-cyan text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Guest Details</h4>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Full Name</label>
                                    <input type="text" name="user_name" required placeholder="John Doe" className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all w-full backdrop-blur-md shadow-inner" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Phone Number</label>
                                    <input type="tel" name="user_phone" required placeholder="+91 98765 43210" className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all w-full backdrop-blur-md shadow-inner" />
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Email Address</label>
                                    <input type="email" name="user_email" required placeholder="john@example.com" className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all w-full backdrop-blur-md shadow-inner" />
                                </div>

                                {/* Booking Details */}
                                <div className="md:col-span-2 mt-4">
                                    <h4 className="text-brand-cyan text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Stay Details</h4>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Check In</label>
                                    <input type="date" name="check_in" required className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all [color-scheme:dark] w-full backdrop-blur-md shadow-inner" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Check Out</label>
                                    <input type="date" name="check_out" required className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all [color-scheme:dark] w-full backdrop-blur-md shadow-inner" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-white/70 text-xs font-bold uppercase tracking-wider">Room Type</label>
                                    <select
                                        name="room_type"
                                        value={bookingRoomType}
                                        onChange={(e) => setBookingRoomType(e.target.value)}
                                        className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all appearance-none cursor-pointer w-full backdrop-blur-md shadow-inner"
                                    >
                                        <option value="Suite Room" className="bg-brand-dark text-white">Suite Room</option>
                                        <option value="Dormitory" className="bg-brand-dark text-white">Dormitory</option>
                                    </select>
                                </div>

                                {bookingRoomType.toLowerCase().includes('suite') || bookingRoomType.toLowerCase().includes('dormitory') ? (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input type="hidden" name="guests" value={`${bookingAdults} Adults, ${bookingChildren} Children`} />
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="text-white/70 text-xs font-bold uppercase tracking-wider">Adults</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={bookingAdults}
                                                onChange={(e) => setBookingAdults(parseInt(e.target.value) || 1)}
                                                className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all [color-scheme:dark] w-full backdrop-blur-md shadow-inner"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="text-white/70 text-xs font-bold uppercase tracking-wider">Children</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={bookingChildren}
                                                onChange={(e) => setBookingChildren(parseInt(e.target.value) || 0)}
                                                className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all [color-scheme:dark] w-full backdrop-blur-md shadow-inner"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Guests</label>
                                        <select name="guests" className="bg-brand-dark/30 border border-white/5 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-brand-cyan/50 focus:bg-brand-dark/50 transition-all appearance-none cursor-pointer w-full backdrop-blur-md shadow-inner">
                                            <option value="1 Adult" className="bg-brand-dark text-white">1 Adult</option>
                                            <option value="2 Adults" className="bg-brand-dark text-white" defaultValue="2 Adults">2 Adults</option>
                                            <option value="2 Adults, 1 Child" className="bg-brand-dark text-white">2 Adults, 1 Child</option>
                                            <option value="Family (4+)" className="bg-brand-dark text-white">Family (4+)</option>
                                        </select>
                                    </div>
                                )}

                                <div className="md:col-span-2 mt-6">
                                    <button
                                        type="submit"
                                        disabled={bookingStatus === 'sending'}
                                        className="w-full relative group overflow-hidden rounded-xl font-bold text-white shadow-[0_0_20px_rgba(0,163,196,0.3)] hover:shadow-[0_0_40px_rgba(0,163,196,0.6)] transition-all transform hover:-translate-y-1 py-4 disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] group-hover:opacity-90 transition-opacity" />
                                        <div className="absolute inset-[1px] bg-brand-dark/20 rounded-xl transition-opacity group-hover:opacity-0" />
                                        <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
                                            {bookingStatus === 'sending' ? 'Sending Request...' : 'Confirm Availability'}
                                            {bookingStatus !== 'sending' && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
