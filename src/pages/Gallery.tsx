import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, Camera, Images } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { INITIAL_GALLERY } from '../data/initialData';
export const Gallery = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [images, setImages] = useState<any[]>(INITIAL_GALLERY);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
                if (data && data.length > 0 && !error) {
                    setImages(data);
                }
            } catch (err) {
                console.warn("DB error, fallback to local data");
            }
        };
        fetchImages();
    }, []);
    return (
        <motion.section
            initial={{ opacity: 0 }}
            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            id="gallery"
            className="bg-brand-dark pt-32 pb-20 md:pt-40 md:pb-32 border-y border-white/5 relative overflow-hidden min-h-[100svh]"
        >
            {/* Glow — hidden on mobile for performance */}
            <div className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-30 pointer-events-none transform -translate-x-1/3 -translate-y-1/3" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Redesigned Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass bg-brand-cyan/10 border border-brand-cyan/20 mb-6"
                        >
                            <Camera size={14} className="text-brand-cyan" />
                            <span className="text-brand-cyan text-[10px] font-bold tracking-[0.2em] uppercase">Visual Journey</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display font-bold text-4xl md:text-6xl text-white mb-6 drop-shadow-xl"
                        >
                            Moments <span className="italic font-light text-brand-cyan drop-shadow-[0_0_15px_rgba(0, 180, 216,0.6)]">Frozen</span><br />In Time
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white/60 text-sm md:text-base leading-relaxed font-light"
                        >
                            Explore glimpses of unforgettable moments, celebrations, and the natural beauty that surrounds our sanctuary.
                        </motion.p>
                    </div>
                    {images.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 md:backdrop-blur-md px-6 py-4 rounded-2xl"
                        >
                            <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                                <Images size={24} />
                            </div>
                            <div>
                                <div className="text-3xl font-display font-bold text-white">{images.length}</div>
                                <div className="text-[10px] text-white/50 tracking-widest uppercase font-semibold">Captured Memories</div>
                            </div>
                        </motion.div>
                    )}
                </div>
                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
                    {images.map((item, index) => {
                        let spanClass = 'col-span-1 md:col-span-1 row-span-1';
                        if (index % 7 === 0) spanClass = 'col-span-1 md:col-span-2 row-span-1 md:row-span-2';
                        else if (index % 5 === 0) spanClass = 'col-span-1 md:col-span-2 row-span-1';
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
                                className={`relative group rounded-[1.5rem] overflow-hidden cursor-pointer border-[0.5px] border-white/10 hover:border-brand-cyan/40 hover:shadow-[0_15px_40px_rgba(0, 180, 216,0.2)] transition-all duration-500 shadow-xl ${spanClass}`}
                                onClick={() => openLightbox([item.url], item.title)}
                            >
                                {item.type === 'video' ? (
                                    <div className="w-full h-full bg-brand-surface flex items-center justify-center">
                                        <video src={item.url} className="w-full h-full object-cover" muted loop onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/50">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        loading={index < 4 ? 'eager' : 'lazy'}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                )}
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                                {/* Zoom icon — centered on hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    <div className="w-12 h-12 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 md:backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_20px_rgba(0, 180, 216,0.4)] scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <ZoomIn size={20} />
                                    </div>
                                </div>
                                {/* Bottom title */}
                                <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end z-10">
                                    <h4 className="font-display font-bold text-lg md:text-2xl text-white drop-shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h4>
                                    <div className="w-0 h-[1.5px] bg-brand-cyan mt-2 transition-all duration-500 group-hover:w-10 shadow-[0_0_10px_rgba(0, 180, 216,0.8)]" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};