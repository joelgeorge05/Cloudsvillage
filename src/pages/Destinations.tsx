import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

import kottapparaImg from '../assets/destinations/Kottappara.jpg';
import kattadikadavuImg from '../assets/destinations/Kattadikadavu.jpg';
import anayadikuthuImg from '../assets/destinations/Anayadikuthu.jpg';
import thommankuthuImg from '../assets/destinations/Thommankuthu.jpg';
import meenuliyanparaImg from '../assets/destinations/Meenuliyanpara.jpg';
import palkulameduImg from '../assets/destinations/Palkulamedu.jpg';
import malankaraImg from '../assets/destinations/Malankara.jpg';
import munnarImg from '../assets/destinations/Munnar.jpg';
import vagamonImg from '../assets/destinations/Vagamon.jpg';

export interface Attraction {
    id: string | number;
    title: string;
    description: string;
    image_url: string;
    distance: string;
    map_link: string;
}

const STATIC_ATTRACTIONS: Attraction[] = [
    {
        id: 1,
        title: "Kottappara Viewpoint",
        description: "A stunning viewpoint offering a panoramic view of the majestic hills and deep valleys below.",
        image_url: kottapparaImg,
        distance: "15 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Kottappara+view+point+Idukki"
    },
    {
        id: 2,
        title: "Kattadikadavu",
        description: "Known for its cool breeze and spectacular views, Kattadikadavu is perfect for a short trek and a misty morning.",
        image_url: kattadikadavuImg,
        distance: "20 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Kattadikadavu+view+point+Idukki"
    },
    {
        id: 3,
        title: "Anayadikuthu Waterfall",
        description: "A beautiful cascading waterfall nestled within the lush greenery of Idukki forests.",
        image_url: anayadikuthuImg,
        distance: "25 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Anayadikuthu+waterfall+Idukki"
    },
    {
        id: 4,
        title: "Thommankuthu Waterfall",
        description: "A scenic seven-step waterfall offering a tranquil escape and adventurous trekking trails.",
        image_url: thommankuthuImg,
        distance: "30 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Thommankuthu+waterfall+Idukki"
    },
    {
        id: 5,
        title: "Meenuliyanpara",
        description: "A massive rocky peak adorned with a thick layer of green forest atop, offering a breathtaking 360-degree view.",
        image_url: meenuliyanparaImg,
        distance: "35 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Meenuliyanpara+Idukki"
    },
    {
        id: 6,
        title: "Palkulamedu",
        description: "A high-altitude viewpoint where you can sometimes spot the distant sea and backwaters on a clear day.",
        image_url: palkulameduImg,
        distance: "40 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Palkulamedu+Idukki"
    },
    {
        id: 7,
        title: "Malankara Dam",
        description: "A beautiful reservoir surrounded by hills, perfect for boating and a quiet evening walk.",
        image_url: malankaraImg,
        distance: "45 MIN AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Malankara+Dam+Idukki"
    },
    {
        id: 8,
        title: "Munnar",
        description: "Famous for its emerald green tea plantations, misty mountains, and pleasant weather all year round.",
        image_url: munnarImg,
        distance: "1.5 HRS AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Munnar+Kerala"
    },
    {
        id: 9,
        title: "Vagamon",
        description: "A quiet hill station known for its rolling pine forests, meadows, and breathtaking deep valleys.",
        image_url: vagamonImg,
        distance: "1 HR AWAY",
        map_link: "https://www.google.com/maps/search/?api=1&query=Vagamon+Kerala"
    }
];

const AttractionCard = ({ attraction }: { attraction: Attraction }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full bg-brand-surface/50 border border-white/5 rounded-2xl overflow-hidden group hover:border-brand-cyan/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,163,196,0.15)]"
        >
            <div className="relative h-64 overflow-hidden shrink-0">
                <img
                    src={attraction.image_url}
                    alt={attraction.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent opacity-80 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-xl px-4 py-1.5 rounded-full flex items-center gap-2 border-[0.5px] border-white/10 shadow-lg transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <MapPin size={12} className="text-brand-cyan" />
                    <span className="text-[10px] font-bold text-white tracking-wider">{attraction.distance}</span>
                </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-8 w-12 h-[1px] bg-brand-cyan/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />

                <h4 className="font-display font-bold text-xl md:text-2xl text-white mb-3 group-hover:text-brand-cyan transition-colors">{attraction.title}</h4>
                <p className="text-white/50 text-sm mb-8 leading-relaxed line-clamp-3 flex-grow">
                    {attraction.description}
                </p>
                <a
                    href={attraction.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full py-3.5 border border-white/10 rounded-xl text-white/80 text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-brand-cyan hover:border-brand-cyan hover:text-brand-dark transition-all duration-300 shadow-[0_0_10px_rgba(0,163,196,0)] hover:shadow-[0_0_20px_rgba(0,163,196,0.4)]"
                >
                    View on Map <MapPin size={16} className="transition-transform group-hover:scale-110" />
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
                setAttractions(data);
            } else {
                setAttractions(STATIC_ATTRACTIONS);
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
            className="bg-brand-surface py-20 md:py-32 border-y border-white/5 min-h-[100svh] mt-16 md:mt-20 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Explore Our Surroundings</h2>
                        <p className="text-white/60 leading-relaxed text-sm md:text-base">
                            The resort sits in Vannappuram near Thodupuzha, close to attractions like Thommankuthu Waterfall, Kattadikadavu trekking point, and Idukki Dam. Its borders feature spice gardens, ponds, and mountain views, especially stunning during monsoons with clouds draping the hills. Guests enjoy proximity to Munnar and Wagamon for day trips.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {attractions.map((attr) => (
                        <AttractionCard key={attr.id} attraction={attr} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};
