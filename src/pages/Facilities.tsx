import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2 } from 'lucide-react';

import suite1Img from '../assets/images/suite1.jpeg';
import pic2 from '../assets/images/pic2.jpeg';
import dormitoryImg from '../assets/images/dormitory.jpeg';
import pic4 from '../assets/images/pic4.jpeg';
import pic5 from '../assets/images/pic5.jpeg';
import pic3 from '../assets/images/pic3.jpeg';
import heritage1 from '../assets/images/heritage1.jpeg';
import npool1 from '../assets/images/npool1.jpeg';
import pic1 from '../assets/images/pic1.jpeg';
import npool2 from '../assets/images/npool2.jpeg';
import npool3 from '../assets/images/npool3.jpeg';
import heritage2 from '../assets/images/heritage2.jpeg';

export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    badge?: string;
    size?: 'large' | 'small';
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: 1,
        title: "Suite Rooms",
        description: "Premium luxury suites with gorgeous views and exquisite amenities.",
        image: suite1Img,
        category: "Accommodations",
        badge: "PREMIUM choice",
        size: 'large'
    },
    {
        id: 2,
        title: "Farmstay",
        description: "Experience authentic rural life in our traditional farmstay cottages.",
        image: pic2,
        category: "Accommodations",
        size: 'small'
    },
    {
        id: 3,
        title: "Dormitory",
        description: "Comfortable and spacious shared accommodations for groups and backpackers.",
        image: dormitoryImg,
        category: "Accommodations",
        size: 'small'
    },
    {
        id: 4,
        title: "Massage Centre",
        description: "Rejuvenating therapies and traditional massages for ultimate relaxation.",
        image: pic4,
        category: "Wellness",
        size: 'small'
    },
    {
        id: 5,
        title: "Business Centre",
        description: "Fully equipped modern workspace and meeting rooms for professionals.",
        image: pic5,
        category: "Facilities",
        size: 'small'
    },
    {
        id: 6,
        title: "Banquet Hall",
        description: "State-of-the-art facilities for large gatherings, events, and celebrations.",
        image: pic3,
        category: "Facilities",
        size: 'small'
    },
    {
        id: 7,
        title: "Restaurant",
        description: "Multi-cuisine dining experience with a stunning view.",
        image: pic5,
        category: "Dining",
        size: 'small'
    },
    {
        id: 8,
        title: "Organic Food",
        description: "Farm-to-table dining featuring fresh, locally sourced organic ingredients.",
        image: heritage1,
        category: "Dining",
        size: 'small'
    },
    {
        id: 9,
        title: "Natural Rock Pool",
        description: "Crystal clear natural rock pools perfect for a refreshing dip.",
        image: npool1,
        category: "Activities",
        badge: "POPULAR",
        size: 'large'
    },
    {
        id: 10,
        title: "Farm Tour",
        description: "Guided tours through our rubber plantations, fruit gardens, and rice paddies.",
        image: pic1,
        category: "Activities",
        size: 'small'
    },
    {
        id: 11,
        title: "Campfire",
        description: "Cozy evenings around the campfire with music and storytelling.",
        image: pic2,
        category: "Activities",
        size: 'small'
    },
    {
        id: 12,
        title: "Boating",
        description: "Peaceful boating experiences on the scenic lake.",
        image: npool2,
        category: "Activities",
        size: 'small'
    },
    {
        id: 13,
        title: "Fishing",
        description: "Relaxing fishing activities by our well-stocked ponds.",
        image: npool3,
        category: "Activities",
        size: 'small'
    },
    {
        id: 14,
        title: "Wild Safari",
        description: "Thrilling wildlife encounters and guided safari adventures.",
        image: heritage2,
        category: "Activities",
        size: 'small'
    },
    {
        id: 15,
        title: "Rural Visit",
        description: "Immersive visits to local villages to experience the culture.",
        image: heritage1,
        category: "Activities",
        size: 'small'
    },
    {
        id: 16,
        title: "Bird Watching",
        description: "Spot endemic and migratory birds in their natural lush habitats.",
        image: pic4,
        category: "Activities",
        size: 'small'
    },
    {
        id: 17,
        title: "Trekking",
        description: "Challenging trails offering spectacular panoramic mountain views.",
        image: pic1,
        category: "Activities",
        size: 'small'
    },
    {
        id: 18,
        title: "Camping",
        description: "Sleep under the stars with our secure and scenic camping grounds.",
        image: pic2,
        category: "Activities",
        size: 'small'
    },
    {
        id: 19,
        title: "Cultural Experience",
        description: "Witness traditional art forms and local heritage showcases.",
        image: heritage2,
        category: "Activities",
        size: 'small'
    }
];

export const CATEGORIES = ["All Collections", "Accommodations", "Facilities", "Dining", "Wellness", "Activities"];

export const Facilities = ({ openLightbox }: { openLightbox: (images: string[], title: string) => void }) => {
    const [activeCategory, setActiveCategory] = useState("All Collections");

    const filteredGallery = activeCategory === "All Collections"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === activeCategory);

    const [selectedFacility, setSelectedFacility] = useState<GalleryItem>(GALLERY_ITEMS[0]);

    React.useEffect(() => {
        if (filteredGallery.length > 0 && !filteredGallery.find(item => item.id === selectedFacility.id)) {
            setSelectedFacility(filteredGallery[0]);
        }
    }, [activeCategory, filteredGallery, selectedFacility.id]);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative bg-brand-surface py-32 overflow-hidden border-y border-white/5 min-h-[100svh] pt-32 mt-20"
        >
            {/* Abstract Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full filter blur-[120px] opacity-40 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[100px] opacity-30 pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass bg-brand-cyan/5 border border-brand-cyan/20 mb-6 md:mb-8"
                    >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-cyan animate-pulse" />
                        <span className="text-brand-cyan text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Signature Spaces</span>
                    </motion.div>

                    <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 drop-shadow-2xl">
                        Facilities <span className="text-white/30 italic font-light">&</span> Experiences
                    </h2>
                    <p className="text-white/50 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                        Immerse yourself in our carefully curated amenities designed for ultimate comfort, thrilling adventure, and pure relaxation.
                    </p>
                </div>

                {/* Interactive Category Carousel Tabs */}
                <div className="flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-3 md:gap-5 mb-12 md:mb-16 pb-4 px-2 snap-x">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`snap-center shrink-0 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-500 border relative overflow-hidden group ${activeCategory === category
                                ? 'text-brand-dark border-brand-cyan shadow-[0_0_30px_rgba(0,163,196,0.3)]'
                                : 'text-white/50 border-white/10 bg-white/5 hover:border-white/20 hover:text-white hover:bg-white/10 hover:-translate-y-1'
                                }`}
                        >
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-[#00d4ff] to-brand-cyan bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 block">{category}</span>
                        </button>
                    ))}
                </div>

                {/* Master-Detail Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-auto lg:h-[480px]"
                >

                    {/* Left Sidebar - Scrollable List */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-3 overflow-y-auto hide-scrollbar pr-2 pb-4 snap-y lg:h-full">
                        {filteredGallery.map((item) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedFacility(item)}
                                className={`snap-start text-left w-full p-4 rounded-2xl transition-all duration-300 border relative group overflow-hidden shrink-0 ${selectedFacility.id === item.id
                                    ? 'bg-brand-cyan/10 border-brand-cyan/50 shadow-[0_0_20px_rgba(0,163,196,0.15)] transform scale-[1.02] z-10'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]'
                                    }`}
                            >
                                {selectedFacility.id === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-cyan shadow-[0_0_10px_rgba(0,163,196,0.8)] origin-center"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className={`font-display font-bold text-lg transition-colors duration-300 ${selectedFacility.id === item.id ? 'text-brand-cyan' : 'text-white'
                                            }`}>
                                            {item.title}
                                        </h4>
                                        <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mt-1">
                                            {item.category}
                                        </p>
                                    </div>
                                    {item.badge && (
                                        <span className="hidden sm:inline-block bg-brand-cyan/20 text-brand-cyan text-[9px] font-bold px-2 py-1 rounded tracking-wider uppercase">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Side - Hero Display */}
                    <div className="w-full lg:w-2/3 relative h-[400px] sm:h-[500px] lg:h-full rounded-[2rem] overflow-hidden group border border-white/10 shadow-2xl glass">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedFacility.id}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={selectedFacility.image}
                                    alt={selectedFacility.title}
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                                />

                                {/* Gradients for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-transparent opacity-70" />

                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                    >
                                        {selectedFacility.badge && (
                                            <span className="inline-block glass bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
                                                {selectedFacility.badge}
                                            </span>
                                        )}
                                        <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg">
                                            {selectedFacility.title}
                                        </h3>
                                        <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed drop-shadow-md">
                                            {selectedFacility.description}
                                        </p>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-6 px-6 py-2.5 rounded-full bg-brand-cyan text-brand-dark font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,163,196,0.4)] pointer-events-auto flex items-center gap-2 w-fit cursor-pointer"
                                            onClick={() => openLightbox([selectedFacility.image], selectedFacility.title)}
                                        >
                                            <Maximize2 size={16} /> Enlarge View
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </motion.div>
            </div>
        </motion.section>

    );
};
