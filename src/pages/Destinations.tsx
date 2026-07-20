import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { INITIAL_ATTRACTIONS } from '../data/initialData';

export interface Attraction {
    id: string | number;
    title: string;
    description: string;
    image_url: string;
    distance: string;
    map_link: string;
}

const AttractionCard: React.FC<{ attraction: Attraction; index: number }> = ({ attraction, index }) => {
    const num = String(index + 1).padStart(2, '0');
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col h-full bg-brand-surface/50 border border-white/5 rounded-2xl overflow-hidden group hover:border-brand-cyan/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]"
        >
            <div className="relative h-64 overflow-hidden shrink-0 bg-brand-dark/50">
                {/* Skeleton Loader */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-white/5 to-brand-dark animate-pulse" />
                )}
                
                <img
                    src={attraction.image_url}
                    alt={attraction.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent opacity-80 transition-opacity duration-300 pointer-events-none" />

                {/* Card number label — top left */}
                <div className="absolute top-4 left-4 text-white/20 font-display font-bold text-4xl leading-none select-none group-hover:text-brand-cyan/30 transition-colors duration-500">
                    {num}
                </div>

                {/* Distance badge — always visible */}
                <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-xl px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                    <MapPin size={11} className="text-brand-cyan" />
                    <span className="text-[10px] font-bold text-white tracking-wider">{attraction.distance}</span>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                {/* Animated top line on hover */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 group-hover:text-brand-cyan transition-colors">{attraction.title}</h4>
                <p className="text-white/50 text-sm mb-8 leading-relaxed line-clamp-3 flex-grow">
                    {attraction.description}
                </p>
                <a
                    href={attraction.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full py-3.5 rounded-xl text-brand-dark text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 bg-brand-cyan hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                >
                    View on Map <ArrowUpRight size={16} />
                </a>
            </div>
        </motion.div>
    );
};

export const Destinations = () => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);

    useEffect(() => {
        const fetchAttractions = async () => {
            const { data } = await supabase.from('destinations').select('*').order('created_at', { ascending: false });
            if (data && data.length > 0) {
                // Fallback to local images if DB image_url is missing or not an absolute URL
                const mergedData = data.map(dbItem => {
                    if (!dbItem.image_url || !dbItem.image_url.startsWith('http')) {
                        const localMatch = INITIAL_ATTRACTIONS.find(local => local.title === dbItem.title);
                        if (localMatch) {
                            return { ...dbItem, image_url: localMatch.image_url };
                        }
                    }
                    return dbItem;
                });
                setAttractions(mergedData);
            } else {
                setAttractions(INITIAL_ATTRACTIONS);
            }
        };
        fetchAttractions();
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            id="destinations"
            className="bg-brand-surface pt-32 pb-20 md:pt-40 md:pb-32 border-y border-white/5 min-h-[100svh] relative overflow-hidden"
        >
            {/* Glow — hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass bg-brand-cyan/5 border border-brand-cyan/20 mb-6">
                        <MapPin size={12} className="text-brand-cyan" />
                        <span className="text-brand-cyan text-[10px] font-bold tracking-[0.3em] uppercase">Nearby Attractions</span>
                    </div>
                    <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
                        Explore Our <span className="text-gradient italic font-light">Surroundings</span>
                    </h2>
                    <p className="text-white/55 leading-relaxed text-sm md:text-base max-w-2xl">
                        The resort sits in Vannappuram near Thodupuzha, close to attractions like Thommankuthu Waterfall, Kattadikadavu trekking point, and Idukki Dam. Guests enjoy proximity to Munnar and Wagamon for day trips.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {attractions.map((attr, idx) => (
                        <AttractionCard key={attr.id} attraction={attr} index={idx} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};
