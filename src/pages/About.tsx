import React from 'react';
import { motion } from 'motion/react';
import heritage1 from '../assets/images/heritage1.jpeg';
import npool1 from '../assets/images/npool1.jpeg';
import pic1 from '../assets/images/pic1.jpeg';

export const About = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-brand-dark relative z-10 py-32 overflow-hidden border-y border-white/5 min-h-[100svh] flex items-center mt-20"
        >
            {/* Glow Element */}
            <div className="absolute -left-[300px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none animate-blob" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass bg-brand-cyan/5 border border-brand-cyan/20 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                            <span className="text-brand-cyan text-[10px] font-bold tracking-[0.3em] uppercase">Our Story</span>
                        </div>

                        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 md:mb-8 leading-tight drop-shadow-lg">
                            Authentic Farm Stay <br />
                            <span className="text-white/30 italic font-light drop-shadow-none">in Kerala's Heart</span>
                        </h2>

                        <div className="space-y-4 md:space-y-6 text-white/60 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                            <p className="border-l-2 border-brand-cyan/50 pl-6 text-white/80 font-medium">
                                Clouds Village Farm Resort is an authentic farm stay nestled in the heart of Manjakkunel Farm, Thodupuzha, in Kerala's Idukki district.
                            </p>
                            <p className="pl-6">
                                It offers a serene escape completely surrounded by lush rice paddies, thriving rubber plantations, exotic fruit gardens, and its very own scenic waterfall. A true return to nature without compromising on luxury.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 pl-6">
                            <div>
                                <div className="text-4xl font-display font-bold text-brand-cyan mb-2">15+</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Acres of Nature</div>
                            </div>
                            <div>
                                <div className="text-4xl font-display font-bold text-brand-cyan mb-2">100%</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Organic Farm</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Masonry Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full mt-10 lg:mt-0"
                    >
                        <div className="absolute top-0 right-0 w-[60%] h-[55%] rounded-[2rem] overflow-hidden shadow-2xl z-10 border border-white/10 hover:-translate-y-2 transition-transform duration-500 group">
                            <img src={heritage1} alt="Heritage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-[55%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border border-white/10 hover:-translate-y-2 transition-transform duration-500 group">
                            <img src={npool1} alt="Natural Pool" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="absolute top-1/2 left-1/2 w-[45%] h-[45%] rounded-[2rem] overflow-hidden shadow-2xl z-30 border-2 border-brand-dark transform -translate-x-[40%] -translate-y-1/2 hover:scale-105 transition-transform duration-500 group">
                            <img src={pic1} alt="Farm Life" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay group-hover:bg-brand-cyan/0 transition-colors duration-500"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};
