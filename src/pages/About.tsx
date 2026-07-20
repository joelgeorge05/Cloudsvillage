import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Sprout, TreePine, Droplets, MapPin, Wind } from 'lucide-react';
import { supabase } from '../lib/supabase';
import heritage1 from '../assets/images/heritage1.webp';
import npool1 from '../assets/images/npool1.webp';
import pic1 from '../assets/images/pic1.webp';

export const About = () => {
    const [content, setContent] = useState({
        title: 'Authentic Farm Stay',
        subtitle: "in Kerala's Heart",
        text: "Clouds Village Farm Resort is an authentic farm stay nestled in the heart of Manjakkunel Farm, Thodupuzha, in Kerala's Idukki district. It offers a serene escape completely surrounded by lush rice paddies, thriving rubber plantations, exotic fruit gardens, and its very own scenic waterfall.",
        stat1Value: '15+',
        stat1Label: 'Acres of Nature',
        stat2Value: '100%',
        stat2Label: 'Organic Farm',
        stat3Value: '5+',
        stat3Label: 'Nature Trails'
    });

    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await supabase.from('settings').select('*').single();
            if (data) {
                setContent({
                    title: data.about_title || 'Authentic Farm Stay',
                    subtitle: data.about_subtitle || "in Kerala's Heart",
                    text: data.about_content || "Clouds Village Farm Resort is an authentic farm stay nestled in the heart of Manjakkunel Farm, Thodupuzha, in Kerala's Idukki district.",
                    stat1Value: data.about_stat1_value || '15+',
                    stat1Label: data.about_stat1_label || 'Acres of Nature',
                    stat2Value: data.about_stat2_value || '100%',
                    stat2Label: data.about_stat2_label || 'Organic Farm'
                });
            }
        };
        fetchContent();
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            id="about"
            className="bg-brand-dark relative z-10 py-24 md:py-32 overflow-hidden border-y border-white/5 min-h-[100svh] flex items-center"
        >
            {/* Glows — hidden on mobile for performance */}
            <div className="hidden md:block absolute -left-[300px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />
            <div className="hidden md:block absolute right-0 top-0 w-[400px] h-[400px] bg-brand-cyan/3 rounded-full filter blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/4" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Section pill */}
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass bg-brand-cyan/5 border border-brand-cyan/20 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                            <span className="text-brand-cyan text-[10px] font-bold tracking-[0.3em] uppercase">Our Story</span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 leading-tight drop-shadow-xl">
                            {content.title} <br />
                            <span className="text-brand-cyan italic font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">{content.subtitle}</span>
                        </h2>

                        {/* Body text with left accent */}
                        <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed mb-10">
                            <p className="border-l-2 border-brand-cyan/50 pl-6 text-white/80 font-light whitespace-pre-wrap leading-loose">
                                {content.text}
                            </p>
                            <p className="border-l-2 border-transparent pl-6 text-white/50 font-light leading-relaxed">
                                Escape the ordinary and immerse yourself in the sights and sounds of nature. Whether you're exploring our spice gardens or relaxing by our private waterfall, every moment here is crafted to rejuvenate your soul.
                            </p>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
                            <motion.div
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="group relative p-4 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 md:backdrop-blur-sm overflow-hidden cursor-default transition-all duration-300 hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cyan/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-colors" />
                                <div className="relative z-10 flex flex-col items-start gap-2">
                                    <div className="text-2xl md:text-3xl font-display font-bold text-brand-cyan">{content.stat1Value}</div>
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">{content.stat1Label}</div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="group relative p-4 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 md:backdrop-blur-sm overflow-hidden cursor-default transition-all duration-300 hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cyan/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-colors" />
                                <div className="relative z-10 flex flex-col items-start gap-2">
                                    <div className="text-2xl md:text-3xl font-display font-bold text-brand-cyan">{content.stat2Value}</div>
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">{content.stat2Label}</div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="group relative p-4 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 md:backdrop-blur-sm overflow-hidden cursor-default transition-all duration-300 hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-cyan/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-colors" />
                                <div className="relative z-10 flex flex-col items-start gap-2">
                                    <div className="text-2xl md:text-3xl font-display font-bold text-brand-cyan">{content.stat3Value}</div>
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">{content.stat3Label}</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: Masonry Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full mt-10 lg:mt-0"
                    >
                        <div className="absolute top-0 right-0 w-[60%] h-[55%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 border border-white/5 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] transition-all duration-700 group">
                            <img src={heritage1} alt="Heritage" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-[55%] h-[60%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border border-white/5 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] transition-all duration-700 group">
                            <img src={npool1} alt="Natural Pool" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
                        </div>

                        <div className="absolute top-1/2 left-1/2 w-[45%] h-[45%] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-30 border border-brand-cyan/20 transform -translate-x-[40%] -translate-y-1/2 hover:scale-105 hover:shadow-[0_30px_60px_rgba(212,175,55,0.25)] transition-all duration-700 group">
                            <img src={pic1} alt="Farm Life" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent group-hover:opacity-0 transition-opacity duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-white/90 text-[9px] font-bold tracking-[0.3em] uppercase bg-brand-dark/60 md:backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">Farm Life</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Our Philosophy Section (New) */}
                <div className="mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h3 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">Our <span className="italic font-light text-brand-cyan">Philosophy</span></h3>
                        <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto font-light">Built on three core pillars, our farm stay is designed to provide a holistic, sustainable, and unforgettable experience.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/10 hover:border-brand-cyan/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-all duration-700" />
                            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                <TreePine size={28} />
                            </div>
                            <h4 className="text-2xl font-display font-bold text-white mb-3">Harmony with Nature</h4>
                            <p className="text-white/60 font-light leading-relaxed text-sm">Wake up to the sounds of tropical birds and explore our vast rubber plantations. We preserve the natural ecosystem, allowing you to truly disconnect from city life.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-[2rem] p-8 md:p-10 hover:bg-brand-cyan/20 hover:border-brand-cyan/50 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all duration-500 group relative overflow-hidden transform md:-translate-y-4"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/30 transition-all duration-700" />
                            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                                <Leaf size={28} />
                            </div>
                            <h4 className="text-2xl font-display font-bold text-white mb-3">Eco-Conscious Living</h4>
                            <p className="text-white/80 font-light leading-relaxed text-sm">From 100% organic farming practices to sustainable architectural designs, every aspect of our resort is built to protect and nourish the earth.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/10 hover:border-brand-cyan/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/20 transition-all duration-700" />
                            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                <MapPin size={28} />
                            </div>
                            <h4 className="text-2xl font-display font-bold text-white mb-3">Authentic Heritage</h4>
                            <p className="text-white/60 font-light leading-relaxed text-sm">Experience true Kerala hospitality. Our spaces are inspired by traditional architecture, offering a genuine connection to the local culture and history.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Experience The Farm Section (New) */}
                <div className="mt-32 pt-24 border-t border-white/5 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">Experience <span className="italic font-light text-brand-cyan">The Farm</span></h3>
                            <p className="text-white/60 font-light leading-relaxed text-base md:text-lg mb-8">
                                Beyond a luxurious stay, we offer a hands-on experience of Kerala's vibrant agriculture. Take a guided tour through our sprawling 15-acre estate and witness the journey of spices from soil to table.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                                        <Leaf size={20} />
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-lg mb-1">Spice Garden Walks</h5>
                                        <p className="text-white/50 text-sm font-light">Breathe in the aroma of cardamom, pepper, and nutmeg cultivated right on our grounds.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                                        <TreePine size={20} />
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-lg mb-1">Rubber Tapping Experience</h5>
                                        <p className="text-white/50 text-sm font-light">Learn the traditional art of rubber tapping from our expert local farmers.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                                        <Droplets size={20} />
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-lg mb-1">Private Waterfall</h5>
                                        <p className="text-white/50 text-sm font-light">Relax by our serene, natural waterfall—a hidden gem within the estate.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            viewport={{ once: true, margin: "-50px" }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden group"
                        >
                            <img src={heritage1} alt="Farm Experience" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-700" />
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-6 right-6 w-24 h-24 border border-white/20 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center md:backdrop-blur-sm bg-white/5">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest text-center">100%<br/>Local</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};
