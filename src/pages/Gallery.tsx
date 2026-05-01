import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

import { INITIAL_GALLERY } from '../data/initialData';

export const Gallery = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
            if (data && data.length > 0) {
                setImages(data);
            } else {
                setImages(INITIAL_GALLERY);
            }
        };
        fetchImages();
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-brand-dark py-20 md:py-32 border-y border-white/5 relative overflow-hidden min-h-[100svh] mt-16 md:mt-20"
        >
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-30 pointer-events-none transform -translate-x-1/3 -translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass bg-brand-cyan/5 border border-brand-cyan/20 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                        <span className="text-brand-cyan text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Memories</span>
                    </motion.div>

                    <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 md:mb-6 drop-shadow-lg">
                        Event Gallery
                    </h2>
                    <p className="text-white/50 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                        Glimpses of unforgettable moments, celebrations, and events hosted at our resort.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
                    {images.map((item, index) => {
                        // Dynamic col/row span for visual interest
                        let spanClass = 'col-span-1 md:col-span-1 row-span-1';
                        if (index % 7 === 0) spanClass = 'col-span-1 md:col-span-2 row-span-1 md:row-span-2';
                        else if (index % 5 === 0) spanClass = 'col-span-1 md:col-span-2 row-span-1';

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: "easeOut" }}
                                className={`relative group rounded-[2rem] overflow-hidden cursor-pointer border-[0.5px] border-white/10 hover:border-brand-cyan/40 hover:shadow-[0_15px_40px_rgba(0,163,196,0.2)] transition-all shadow-xl ${spanClass}`}
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
                                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 group-hover:rotate-1"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                    <h4 className="font-display font-bold text-2xl md:text-3xl text-white drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{item.title}</h4>
                                    <div className="w-0 h-[1.5px] bg-brand-cyan mt-3 transition-all duration-700 group-hover:w-12 shadow-[0_0_15px_rgba(0,163,196,0.8)]" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};
