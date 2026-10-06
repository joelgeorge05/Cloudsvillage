import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
    ArrowRight, 
    Calendar
} from 'lucide-react';
import { Link } from 'react-router';
import { supabase } from '../lib/supabase';

// Curated Visual Assets
import heritage1 from '../assets/images/heritage1.webp';
import heritage2 from '../assets/images/heritage2.webp';
import npool1 from '../assets/images/npool1.webp';
import pic1 from '../assets/images/pic1.webp';
import pic4 from '../assets/images/pic4.webp';
import pic5 from '../assets/images/pic5.webp';
import logo2Img from '../assets/images/logo2.webp';

export const About = () => {
    const [content, setContent] = useState({
        title: 'Born from the Soil, Veiled in the Mist',
        subtitle: "The Living Heritage of Manjakunnel Farm",
        text: "Clouds Village is an authentic 15-acre organic farm sanctuary nestled inside the historic Manjakunnel Farm in Vannappuram, near Thodupuzha in Idukki. A peaceful refuge created to celebrate slow mountain living, pure rock spring waters, and regenerative agriculture.",
        stat1Value: '15+',
        stat1Label: 'Acres of Living Nature',
        stat2Value: '100%',
        stat2Label: 'Organic & Sustainable',
        stat3Value: '100%',
        stat3Label: 'Spring Water Sourced'
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await supabase.from('settings').select('*').single();
                if (data) {
                    setContent({
                        title: data.about_title || 'Born from the Soil, Veiled in the Mist',
                        subtitle: data.about_subtitle || "The Living Heritage of Manjakunnel Farm",
                        text: data.about_content || "Clouds Village is an authentic 15-acre organic farm sanctuary nestled inside the historic Manjakunnel Farm in Vannappuram, near Thodupuzha in Idukki.",
                        stat1Value: data.about_stat1_value || '15+',
                        stat1Label: data.about_stat1_label || 'Acres of Living Nature',
                        stat2Value: data.about_stat2_value || '100%',
                        stat2Label: data.about_stat2_label || 'Organic & Sustainable',
                        stat3Value: '100%',
                        stat3Label: 'Spring Water Sourced'
                    });
                }
            } catch (err) {
                // Keep solid defaults
            }
        };
        fetchContent();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const heritagePillars = [
        {
            title: "Subterranean Spring Pools",
            subtitle: "100% Living Spring Water",
            desc: "Our rock pools are filled exclusively by natural underground mountain springs filtering through granite bedrock. No chlorine, no artificial pumps—just living mountain water."
        },
        {
            title: "Bio-Diverse Organic Farming",
            subtitle: "Zero Chemical Footprint",
            desc: "Cardamom, Tellicherry black pepper, nutmeg, wild coffee, and tropical fruits thrive naturally across 15 acres, fed by natural composting and mountain rain."
        },
        {
            title: "Kerala Vernacular Timber",
            subtitle: "Architecture in Accordance",
            desc: "Instead of concrete blocks, every cottage features reclaimed seasoned wood, terracotta tiling, high-pitched ceilings, and sweeping open verandahs facing the spice canopy."
        },
        {
            title: "Unhurried Mountain Stillness",
            subtitle: "True Digital Detox",
            desc: "No city roar or highway drone. Mornings begin with birdsong echoing through mist-veiled plantations, and nights dissolve into clear starlight over the Western Ghats."
        }
    ];

    const dayProgression = [
        {
            time: "06:30 AM",
            period: "Dawn Mist",
            title: "The Highland Mist Awakening",
            desc: "Witness the morning fog drift over the rubber groves while sipping freshly brewed estate coffee and listening to the Malabar whistling thrush.",
            highlight: "Freshly roasted estate brew & morning mist"
        },
        {
            time: "10:30 AM",
            period: "Midday Sun",
            title: "Immersion in Cold Rock Springs",
            desc: "Plunge into our natural living stone pool, nourished by continuous subterranean spring streams cascading from the highland ridge.",
            highlight: "Granite-filtered subterranean waters"
        },
        {
            time: "03:00 PM",
            period: "Afternoon",
            title: "The Agrarian Spice Walk",
            desc: "Wander through fertile plantation trails with our estate guides, crushing fresh allspice leaves, green cardamom pods, and ripe nutmeg fruit.",
            highlight: "Crushed allspice, cardamom & pepper pods"
        },
        {
            time: "07:30 PM",
            period: "Nightfall",
            title: "Starlight & Mountain Silence",
            desc: "Dine on authentic farm-to-table Kerala delicacies on your private wooden verandah beneath an unpolluted canopy of stars.",
            highlight: "Farm-to-table dining beneath unpolluted skies"
        }
    ];

    const farmEncounters = [
        {
            title: "Traditional Rubber Tapping",
            desc: "Observe the historic artisan technique of harvesting pure latex from rubber trees at first light, a skilled practice perfected over generations.",
            tag: "Heritage Craft",
            time: "06:00 AM"
        },
        {
            title: "Living Rock Spring Pools",
            desc: "Reinvigorate body and soul in mineral-rich cold mountain spring water continuously refreshed by natural geological fissures.",
            tag: "Pure Wellness",
            time: "All Day"
        },
        {
            title: "Spice Harvesting & Tasting",
            desc: "Pluck and taste genuine organic spices right off the vine, discovering the true origins of Kerala's legendary spice trade.",
            tag: "Farm to Table",
            time: "03:30 PM"
        },
        {
            title: "Forest Canopy Bird Watching",
            desc: "Spot native Western Ghats species nesting in century-old trees that were intentionally protected during the estate's construction.",
            tag: "Ecological Haven",
            time: "07:00 AM"
        }
    ];

    return (
        <div className="bg-[#070B19] text-white selection:bg-brand-cyan/30 overflow-hidden relative">
            
            {/* Ambient Background Aura Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-brand-cyan/15 via-brand-blue-deep/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
            <div className="absolute top-[1400px] -left-40 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[160px] pointer-events-none z-0" />
            <div className="absolute top-[2800px] -right-40 w-[700px] h-[700px] bg-brand-cyan-dark/15 rounded-full blur-[200px] pointer-events-none z-0" />

            {/* 1. CINEMATIC HERO SECTION */}
            <section className="relative min-h-[96vh] flex flex-col justify-center items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 z-10 w-full">
                {/* Background visual texture with soft vignette */}
                <div className="absolute inset-0 z-[-1] overflow-hidden">
                    <img 
                        src={heritage2} 
                        alt="Manjakunnel Estate Mist" 
                        className="w-full h-full object-cover object-center scale-105 opacity-20 filter blur-[2px] transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/90 via-[#070B19]/95 to-[#070B19]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070B19]/70 to-[#070B19]" />
                </div>

                <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto text-center flex flex-col items-center">

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-light text-white leading-[1.05] tracking-tight mb-5 max-w-6xl drop-shadow-2xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Born from the Soil, <br />
                        <span className="italic font-normal gradient-cyan">Veiled in the Mist</span>
                    </motion.h1>

                    {/* Lead Narrative */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-4xl mb-7"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        An authentic 15-acre organic farm sanctuary nestled in the highlands of Vannappuram, Idukki. A living continuum of subterranean rock spring pools, heirloom spice groves, and unhurried mountain stillness.
                    </motion.p>

                    {/* Prestigious Founding Partner Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 sm:pr-8 rounded-3xl sm:rounded-full bg-gradient-to-r from-white/[0.07] to-white/[0.03] border border-brand-cyan/35 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] mb-8 sm:mb-10"
                    >
                        <div className="flex items-center justify-center shrink-0">
                            <img
                                src={logo2Img}
                                alt="Manjakunnel Integrated Farm Logo"
                                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
                            />
                        </div>
                        <div className="flex flex-col text-center sm:text-left">
                            <span 
                                className="text-[10px] text-brand-cyan-light tracking-[0.25em] uppercase font-bold"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Founding Heritage Partner
                            </span>
                            <span 
                                className="text-xs sm:text-sm text-white font-medium tracking-wide"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Manjakunnel Integrated Farm • Vannappuram, Idukki
                            </span>
                        </div>
                    </motion.div>

                    {/* Editorial Gallery Preview (Trio Spotlight) - Full Width Real Estate */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.6 }}
                        className="w-full max-w-[2200px] 2xl:max-w-[2560px] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-2"
                    >
                        {/* Trio Card 1: Verandah */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-cyan/25 shadow-2xl group aspect-[16/10] sm:aspect-[16/10] 2xl:aspect-[16/9]">
                            <img 
                                src={heritage1} 
                                alt="Clouds Village Garden Walkway" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cyan font-bold block" style={{ fontFamily: "var(--font-nav)" }}>
                                    Highland Walkways
                                </span>
                                <span className="text-sm sm:text-base lg:text-lg text-white font-medium" style={{ fontFamily: "var(--font-display)" }}>
                                    Lush Garden Trails
                                </span>
                            </div>
                        </div>

                        {/* Trio Card 2: Restored Heritage Restaurant */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-cyan/35 shadow-2xl group aspect-[16/10] sm:aspect-[16/10] 2xl:aspect-[16/9] ring-2 ring-brand-cyan/20">
                            <img 
                                src={pic4} 
                                alt="Clouds Village Heritage Resort" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cyan font-bold block" style={{ fontFamily: "var(--font-nav)" }}>
                                    The Farmhouse
                                </span>
                                <span className="text-sm sm:text-base lg:text-lg text-white font-medium" style={{ fontFamily: "var(--font-display)" }}>
                                    Heritage Dining & Lawns
                                </span>
                            </div>
                        </div>

                        {/* Trio Card 3: Rock Pool */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-cyan/25 shadow-2xl group aspect-[16/10] sm:aspect-[16/10] 2xl:aspect-[16/9]">
                            <img 
                                src={npool1} 
                                alt="Subterranean Rock Pool" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-cyan font-bold block" style={{ fontFamily: "var(--font-nav)" }}>
                                    Living Waters
                                </span>
                                <span className="text-sm sm:text-base lg:text-lg text-white font-medium" style={{ fontFamily: "var(--font-display)" }}>
                                    Subterranean Rock Pool
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Chapter Quick Jump Bar */}
                    <div className="mt-8 sm:mt-10 inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0B1226]/80 border border-brand-cyan/20 backdrop-blur-xl shadow-lg">
                        <button
                            onClick={() => scrollToSection('genesis')}
                            className="px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            I. Origins
                        </button>
                        <button
                            onClick={() => scrollToSection('pillars')}
                            className="px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            II. Four Pillars
                        </button>
                        <button
                            onClick={() => scrollToSection('cadence')}
                            className="px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            III. Rhythm of Day
                        </button>
                        <button
                            onClick={() => scrollToSection('encounters')}
                            className="px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            IV. Encounters
                        </button>
                    </div>

                </div>
            </section>

            <div className="w-full max-w-[2200px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">


                {/* 3. CHAPTER I: THE MANJAKUNNEL HERITAGE & ORIGINS */}
                <section id="genesis" className="scroll-mt-32 mb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Left: Narrative */}
                        <div className="lg:col-span-6 flex flex-col">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="w-8 h-[1px] bg-brand-cyan"></span>
                                <span 
                                    className="text-brand-cyan text-xs font-bold tracking-[0.3em] uppercase"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Chapter I • The Genesis
                                </span>
                            </div>
                            
                            <h2 
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8 leading-[1.15] tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                The Living Roots of <br />
                                <span className="italic font-bold gradient-cyan">Manjakunnel Estate</span>
                            </h2>

                            {/* Pull Quote */}
                            <blockquote className="p-6 rounded-2xl bg-white/[0.03] border-l-4 border-brand-cyan mb-8 text-white/90 italic font-serif text-lg md:text-xl leading-relaxed">
                                "We did not clear the mountain to build a resort; we built a sanctuary inside the living, breathing farm."
                            </blockquote>

                            <div 
                                className="space-y-6 text-white/75 text-base md:text-lg font-light leading-relaxed"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                <p>
                                    Long before Clouds Village welcomed its first travelers, this land was a thriving organic plantation known across Vannappuram as <strong className="text-white font-medium">Manjakunnel Farm</strong>. For generations, the estate’s stewards nurtured the fertile red soil of Idukki, cultivating fragrant green cardamom, Tellicherry black pepper, wild nutmeg, and high-altitude rubber groves.
                                </p>
                                <p>
                                    When the vision for Clouds Village was conceived, one sacred covenant guided every hand: not a single ancient timber tree would be felled, and the natural contours of the mountain slopes were preserved in their entirety.
                                </p>
                                <p>
                                    Today, guests awaken to the sound of fresh mountain breezes rustling through rubber leaves, morning birds nesting in towering canopies, and the soothing trickling of mountain springs.
                                </p>
                            </div>

                            {/* Minimalist Specs */}
                            <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-brand-cyan font-bold" style={{ fontFamily: "var(--font-nav)" }}>Location</span>
                                    <span className="text-sm text-white font-medium mt-0.5" style={{ fontFamily: "var(--font-nav)" }}>Vannappuram, Thodupuzha, Idukki</span>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-brand-cyan font-bold" style={{ fontFamily: "var(--font-nav)" }}>Ecosystem</span>
                                    <span className="text-sm text-white font-medium mt-0.5" style={{ fontFamily: "var(--font-nav)" }}>Certified Bio-Diverse Farm</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Curated Visual Composition */}
                        <div className="lg:col-span-6 flex flex-col gap-6">
                            {/* Main Heritage Architecture Card */}
                            <div className="relative rounded-3xl overflow-hidden border border-brand-cyan/30 shadow-2xl aspect-[16/11] group">
                                <img 
                                    src={heritage1} 
                                    alt="Clouds Village Vernacular Heritage" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/90 via-black/25 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                    <div>
                                        <span 
                                            className="text-brand-cyan text-[10px] uppercase tracking-[0.25em] font-semibold block mb-1"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            Traditional Timber Architecture
                                        </span>
                                        <p className="text-white text-base md:text-xl font-serif" style={{ fontFamily: "var(--font-display)" }}>
                                            Kerala Stone & Wooden Walkways
                                        </p>
                                    </div>
                                    <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-brand-cyan/20 backdrop-blur-md text-[10px] text-brand-cyan-light uppercase tracking-widest border border-brand-cyan/30 font-bold">
                                        Sanctuary Grounds
                                    </span>
                                </div>
                            </div>

                            {/* Dual Companion Cards */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative rounded-2xl overflow-hidden border border-brand-cyan/20 shadow-xl aspect-[4/3] group">
                                    <img 
                                        src={pic5} 
                                        alt="Spring Pool and Farm Pond" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/90 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <span 
                                            className="text-xs text-white font-medium block"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            Mountain Rock Spring
                                        </span>
                                        <span className="text-[10px] text-brand-cyan-light font-light">Subterranean Purity</span>
                                    </div>
                                </div>

                                <div className="relative rounded-2xl overflow-hidden border border-brand-cyan/20 shadow-xl aspect-[4/3] group">
                                    <img 
                                        src={pic1} 
                                        alt="Spice Plantation Trail" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/90 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <span 
                                            className="text-xs text-white font-medium block"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            Heirloom Spice Trail
                                        </span>
                                        <span className="text-[10px] text-brand-cyan-light font-light">Cardamom & Black Pepper</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 4. THE FOUR PILLARS OF OUR SANCTUARY */}
                <section id="pillars" className="scroll-mt-32 mb-40">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 mb-4 justify-center">
                            <span className="w-6 h-[1px] bg-brand-cyan"></span>
                            <span 
                                className="text-brand-cyan text-xs font-bold tracking-[0.3em] uppercase"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Guiding Values
                            </span>
                            <span className="w-6 h-[1px] bg-brand-cyan"></span>
                        </div>
                        <h2 
                            className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-4 tracking-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            The Four Pillars of Stillness
                        </h2>
                        <p 
                            className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Everything we do at Clouds Village is guided by an unwavering commitment to regenerative ecology and authentic highland comfort.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {heritagePillars.map((pillar, idx) => (
                            <div 
                                key={idx}
                                className="p-8 rounded-[2rem] bg-gradient-to-b from-[#0E1733]/70 to-[#0B1226]/90 border border-brand-cyan/20 hover:border-brand-cyan/50 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                            >
                                <div>
                                    {/* Pure Editorial Header with Serif Index and Subtitle */}
                                    <div className="mb-6 pb-4 border-b border-white/10">
                                        <span 
                                            className="text-2xl sm:text-3xl font-light text-brand-cyan/80 font-serif block mb-2"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            0{idx + 1}
                                        </span>
                                        <span 
                                            className="text-brand-cyan-light text-[10px] tracking-[0.2em] uppercase font-bold block"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            {pillar.subtitle}
                                        </span>
                                    </div>

                                    <h3 
                                        className="text-xl text-white font-medium mb-3"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        {pillar.title}
                                    </h3>

                                    <p 
                                        className="text-white/65 text-sm font-light leading-relaxed"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        {pillar.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CHAPTER II: A DAY AT CLOUDS VILLAGE */}
                <section id="cadence" className="scroll-mt-32 mb-40 p-8 md:p-14 lg:p-16 rounded-[3rem] bg-gradient-to-br from-[#080E21] via-[#0B142B] to-[#070B19] border border-brand-cyan/30 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />

                    <div className="max-w-2xl mb-16 relative z-10">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="w-6 h-[1px] bg-brand-cyan"></span>
                            <span 
                                className="text-brand-cyan text-xs font-bold tracking-[0.3em] uppercase"
                                style={{ fontFamily: "var(--font-nav)" }}
                            >
                                Chapter II • The Rhythm of the Farm
                            </span>
                        </div>
                        <h2 
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 tracking-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            A Day in Unhurried Motion
                        </h2>
                        <p 
                            className="text-white/70 text-base md:text-lg font-light leading-relaxed"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Without clocks or alarms, your stay unfolds alongside the natural cadence of morning dew, rock spring plunges, and mountain twilight.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {dayProgression.map((item, idx) => (
                            <div 
                                key={idx}
                                className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-brand-cyan/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                                        <span 
                                            className="text-brand-cyan font-bold text-sm tracking-wider"
                                            style={{ fontFamily: "var(--font-nav)" }}
                                        >
                                            {item.time}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 bg-white/5 px-2.5 py-1 rounded-full font-semibold">
                                            {item.period}
                                        </span>
                                    </div>

                                    <h4 
                                        className="text-lg text-white font-medium mb-3"
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        {item.title}
                                    </h4>

                                    <p 
                                        className="text-white/65 text-xs sm:text-sm font-light leading-relaxed mb-6"
                                        style={{ fontFamily: "'Outfit', sans-serif" }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-white/5">
                                    <span className="text-[11px] text-brand-cyan-light font-medium italic block">
                                        ✦ {item.highlight}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. CHAPTER III: AGRARIAN ENCOUNTERS */}
                <section id="encounters" className="scroll-mt-32 mb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Left: Atmospheric Image Card (Featuring the upright restaurant & lawn pic4) */}
                        <div className="lg:col-span-6 relative rounded-[3rem] overflow-hidden border border-brand-cyan/30 h-[480px] lg:h-[560px] shadow-2xl group">
                            <img 
                                src={pic4} 
                                alt="Manjakunnel Organic Farm Experience" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/95 via-transparent to-black/20" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <span 
                                    className="text-brand-cyan text-xs font-bold tracking-[0.25em] uppercase mb-2 block"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Living Farm Encounters
                                </span>
                                <h3 
                                    className="text-2xl sm:text-3xl lg:text-4xl text-white font-light mb-2"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    From Blossom to Harvest
                                </h3>
                                <p 
                                    className="text-white/75 text-sm font-light max-w-md"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Walk alongside our resident agrarian specialists to experience authentic plantation life up close in the heart of Idukki.
                                </p>
                            </div>
                        </div>

                        {/* Right: Encounters List */}
                        <div className="lg:col-span-6 flex flex-col">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="w-8 h-[1px] bg-brand-cyan"></span>
                                <span 
                                    className="text-brand-cyan text-xs font-bold tracking-[0.3em] uppercase"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    Chapter IV • Daily Encounters
                                </span>
                            </div>

                            <h2 
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8 leading-[1.15] tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Living with the Soil <br />
                                <span className="italic font-bold gradient-cyan">& the Elements</span>
                            </h2>

                            <div className="space-y-4">
                                {farmEncounters.map((item, idx) => (
                                    <div 
                                        key={idx}
                                        className="p-5 sm:p-6 rounded-2xl bg-[#0B1226]/70 border border-white/10 hover:border-brand-cyan/40 hover:bg-[#0E1733]/80 transition-all flex items-start gap-5 group"
                                    >
                                        <span 
                                            className="text-2xl font-light text-brand-cyan/70 shrink-0 font-serif w-8 pt-0.5"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            0{idx + 1}
                                        </span>
                                        <div className="flex flex-col flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                                <h4 
                                                    className="text-base sm:text-lg text-white font-medium"
                                                    style={{ fontFamily: "var(--font-nav)" }}
                                                >
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-white/50">{item.time}</span>
                                                    <span 
                                                        className="text-[9px] uppercase tracking-wider text-brand-cyan-light bg-brand-cyan/15 px-2.5 py-0.5 rounded-full font-semibold border border-brand-cyan/25"
                                                        style={{ fontFamily: "var(--font-nav)" }}
                                                    >
                                                        {item.tag}
                                                    </span>
                                                </div>
                                            </div>
                                            <p 
                                                className="text-white/70 text-xs sm:text-sm font-light leading-relaxed"
                                                style={{ fontFamily: "'Outfit', sans-serif" }}
                                            >
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* 7. MANJAKUNNEL HERITAGE PLEDGE CARTOUCHE */}
                <div className="mb-24 p-6 sm:p-8 md:p-10 rounded-[2rem] bg-gradient-to-b from-[#0A122A] via-[#080E24] to-[#070B19] border border-brand-cyan/25 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col w-full">
                        
                        {/* Compact Header Bar */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-4 text-center sm:text-left">
                                <div className="shrink-0">
                                    <img 
                                        src={logo2Img} 
                                        alt="Manjakunnel Integrated Farm Seal" 
                                        className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span 
                                        className="text-[10px] uppercase tracking-[0.25em] text-brand-cyan font-bold" 
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Founding Heritage Covenant
                                    </span>
                                    <h3 
                                        className="text-lg sm:text-xl md:text-2xl text-white font-medium tracking-wide mt-0.5" 
                                        style={{ fontFamily: "var(--font-nav)" }}
                                    >
                                        Manjakunnel Integrated Farm
                                    </h3>
                                </div>
                            </div>

                            <div className="text-center sm:text-right">
                                <span className="text-[11px] text-white/50 font-light block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    Vannappuram Highlands, Idukki
                                </span>
                                <span className="text-[10px] text-brand-cyan-light tracking-wider uppercase font-semibold block mt-0.5" style={{ fontFamily: "var(--font-nav)" }}>
                                    Organic Polyculture & Living Springs
                                </span>
                            </div>
                        </div>

                        {/* 3 Compact Commitments */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col text-left">
                                <span 
                                    className="text-brand-cyan text-xs tracking-[0.14em] uppercase font-bold mb-1.5 flex items-center gap-1.5"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <span>✦</span> Zero-Pesticide Soil
                                </span>
                                <p 
                                    className="text-white/60 text-xs font-light leading-relaxed"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    15 acres of chemical-free cardamom, Tellicherry pepper, and wild coffee.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col text-left">
                                <span 
                                    className="text-brand-cyan text-xs tracking-[0.14em] uppercase font-bold mb-1.5 flex items-center gap-1.5"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <span>✦</span> Living Rock Springs
                                </span>
                                <p 
                                    className="text-white/60 text-xs font-light leading-relaxed"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Subterranean aquifers filtering through granite bedrock with zero chlorine.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col text-left">
                                <span 
                                    className="text-brand-cyan text-xs tracking-[0.14em] uppercase font-bold mb-1.5 flex items-center gap-1.5"
                                    style={{ fontFamily: "var(--font-nav)" }}
                                >
                                    <span>✦</span> Vernacular Timber Stays
                                </span>
                                <p 
                                    className="text-white/60 text-xs font-light leading-relaxed"
                                    style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    Cottages built from seasoned timber without felling ancient trees.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 8. FINAL INVITATION CTA */}
                <div className="rounded-[3rem] p-10 md:p-16 lg:p-20 bg-gradient-to-r from-[#070B19] via-[#0C1630] to-[#070B19] border border-brand-cyan/35 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] mb-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-cyan/15 rounded-full blur-[160px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                        <span 
                            className="text-brand-cyan text-xs font-semibold tracking-[0.3em] uppercase mb-6 block"
                            style={{ fontFamily: "var(--font-nav)" }}
                        >
                            Your Journey Begins
                        </span>

                        <h2 
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-[1.1] tracking-tight"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Come, Walk the Mist Trails <br />
                            <span className="italic font-bold gradient-cyan">of Vannappuram</span>
                        </h2>

                        <p 
                            className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Experience unhurried stillness, living rock pool waters, and genuine agrarian hospitality in the highlands of Idukki.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                to="/booking"
                                style={{ fontFamily: "var(--font-nav)" }}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-cyan via-brand-cyan-light to-brand-cyan-dark text-brand-dark font-bold text-xs tracking-[0.22em] uppercase shadow-[0_0_30px_rgba(0,180,216,0.45)] hover:shadow-[0_0_50px_rgba(0,180,216,0.8)] hover:scale-105 transition-all duration-300"
                            >
                                <Calendar size={14} className="text-brand-dark" />
                                <span>Reserve Your Stay</span>
                            </Link>

                            <Link
                                to="/facilities"
                                style={{ fontFamily: "var(--font-nav)" }}
                                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 hover:border-brand-cyan/40 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                            >
                                <span>Discover Facilities</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
