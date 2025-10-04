'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Menu, X } from 'lucide-react';

// --- Updated Mock Data for Tabbed Interface ---
const mentors = [
    { 
        name: 'Dr. Evelyn Reed', 
        role: 'Quantum Physicist', 
        description: 'Pioneering research in quantum entanglement.',
        imageUrl: 'https://placehold.co/600x400/f59e0b/000000?text=ER',
        category: 'Science'
    },
    { 
        name: 'Marcus Vance', 
        role: 'Historian & Author', 
        description: 'Specializes in ancient civilizations and their impact.',
        imageUrl: 'https://placehold.co/600x400/4ade80/000000?text=MV',
        category: 'Humanities'
    },
    { 
        name: 'Dr. Aliza Sharma', 
        role: 'Neuroscientist', 
        description: 'Exploring the complexities of the human brain.',
        imageUrl: 'https://placehold.co/600x400/60a5fa/000000?text=AS',
        category: 'Science'
    },
    { 
        name: 'Kenji Tanaka', 
        role: 'AI & Robotics', 
        description: 'Building the next generation of intelligent systems.',
        imageUrl: 'https://placehold.co/600x400/f472b6/000000?text=KT',
        category: 'Technology'
    },
    { 
        name: 'Sofia Rossi', 
        role: 'Classical Art', 
        description: 'Curating and preserving the masterpieces of history.',
        imageUrl: 'https://placehold.co/600x400/fb923c/000000?text=SR',
        category: 'Arts'
    },
    { 
        name: 'Ben Carter', 
        role: 'Web Performance', 
        description: 'Making the web faster and more accessible for everyone.',
        imageUrl: 'https://placehold.co/600x400/34d399/000000?text=BC',
        category: 'Technology'
    },
];

const reviews = [
    { name: 'Alex Johnson', text: "An unparalleled learning experience. The mentors are world-class and genuinely invested in your success.", rating: 5 },
    { name: 'Priya Patel', text: "The platform's structure and resources helped me grasp complex topics I've struggled with for years.", rating: 5 },
    { name: 'Sam Chen', text: "I couldn't have asked for a better guide through my research. The insights were invaluable.", rating: 5 },
    { name: 'Maria Garcia', text: "Absolutely fantastic. The community is supportive and the content is top-tier. Highly recommended!", rating: 5 },
];

// --- SVG Illustration Component ---
const HeroIllustration = () => (
    <svg viewBox="0 0 550 350" className="w-full h-auto max-w-2xl mx-auto mt-8 lg:mt-0">
        <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
            </filter>
        </defs>
        
        {/* Desk and Chair */}
        <rect x="50" y="280" width="450" height="20" rx="5" fill="#A16207" filter="url(#shadow)"/>
        <path d="M 275 220 C 225 220, 225 300, 275 300 S 325 220, 275 220 Z" fill="#F0F0F0" filter="url(#shadow)"/>
        <rect x="265" y="290" width="20" height="40" fill="#D1D5DB"/>
        
        {/* Main Character */}
        <circle cx="275" cy="180" r="30" fill="#4A5568"/>
        <path d="M245 210 Q 275 280 305 210 L 275 240 Z" fill="#3B82F6"/>
        
        {/* Computer Screen */}
        <rect x="180" y="150" width="190" height="130" rx="10" fill="#FFFFFF" stroke="#1F2937" strokeWidth="4" filter="url(#shadow)"/>
        <rect x="190" y="160" width="170" height="110" fill="#E0F2FE"/>

        {/* Floating Screens */}
        <g transform="translate(-80 -20)">
            <rect x="100" y="80" width="100" height="60" rx="5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" filter="url(#shadow)"/>
            <rect x="105" y="85" width="90" height="50" fill="#E0F2FE"/>
            <circle cx="150" cy="100" r="10" fill="#FB923C"/>
        </g>
        <g transform="translate(250 -40)">
             <rect x="100" y="80" width="100" height="60" rx="5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" filter="url(#shadow)"/>
             <rect x="105" y="85" width="90" height="50" fill="#E0F2FE"/>
             <circle cx="125" cy="100" r="10" fill="#34D399"/>
        </g>
         <g transform="translate(300 80)">
             <rect x="100" y="80" width="100" height="60" rx="5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" filter="url(#shadow)"/>
             <rect x="105" y="85" width="90" height="50" fill="#E0F2FE"/>
             <circle cx="175" cy="115" r="10" fill="#F472B6"/>
        </g>
    </svg>
);


// --- Reusable Carousel Component ---
const Carousel = ({ items, renderCard }) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection) => {
        setPage([(page + newDirection), newDirection]);
    };

    const itemIndex = (page % items.length + items.length) % items.length;

    const variants = {
        enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0 })
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    className="w-full absolute"
                >
                    {renderCard(items[itemIndex])}
                </motion.div>
            </AnimatePresence>
            
            <button onClick={() => paginate(-1)} className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 p-2 bg-white/80 rounded-full text-zinc-800 hover:bg-white shadow-md">
                <ChevronLeft />
            </button>
            <button onClick={() => paginate(1)} className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 p-2 bg-white/80 rounded-full text-zinc-800 hover:bg-white shadow-md">
                <ChevronRight />
            </button>
        </div>
    );
};

// --- Main Page Component ---
export default function HomePage() {
    const MentorCard = ({ name, role, description, imageUrl }) => (
        <motion.div 
            className="bg-white/90 rounded-2xl border border-zinc-200/80 shadow-soft-amber overflow-hidden group"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
            whileHover={{ y: -8, scale: 1.03, shadow: "0 20px 25px -5px rgba(212, 170, 10, 0.2), 0 10px 10px -5px rgba(212, 170, 10, 0.1)" }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            <div className="overflow-hidden h-48">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-zinc-900 truncate">{name}</h3>
                <p className="text-amber-700 font-semibold text-sm mb-2">{role}</p>
                <p className="text-zinc-600 text-sm mb-4 h-10">{description}</p>
                <a href="/mentors" className="font-bold text-zinc-800 hover:text-black transition-colors">
                    Discover More &rarr;
                </a>
            </div>
        </motion.div>
    );

    const ReviewCard = (review) => (
        <div className="bg-white/80 p-8 rounded-lg text-center max-w-2xl mx-auto border border-zinc-200 shadow-md">
            <div className="flex justify-center mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-500" fill="currentColor" />)}
            </div>
            <p className="text-lg italic text-zinc-700 mb-4">"{review.text}"</p>
            <h4 className="font-bold text-zinc-900">- {review.name}</h4>
        </div>
    );
    
    // Mentor tab logic
    const tabs = ['All', 'Science', 'Technology', 'Arts', 'Humanities'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const filteredMentors = mentors.filter(mentor => 
        activeTab === 'All' ? true : mentor.category === activeTab
    );

    return (
        <div className="bg-amber-100 text-zinc-900 font-sans">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            className="text-center lg:text-left"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                        >
                            <motion.h1 
                                className="text-5xl md:text-7xl font-extrabold text-zinc-900 leading-tight"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                            >
                                Improve your <span className="relative inline-block px-4 py-1 text-white bg-black rounded-full">Skills</span> Faster
                            </motion.h1>
                            <motion.p 
                                className="mt-6 text-lg text-zinc-700 max-w-md mx-auto lg:mx-0"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                            >
                                Speed Up The Skill Acquisition Process By Finding Unlimited Courses That Matches Your Niche.
                            </motion.p>
                            <motion.div
                                className="mt-8"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }}}
                            >
                                <button className="border-2 border-zinc-900 text-zinc-900 font-bold px-8 py-3 rounded-lg hover:bg-zinc-900 hover:text-white transition-all duration-300 transform hover:scale-105">
                                    Enroll Now &rarr;
                                </button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <HeroIllustration />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mentors Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold text-zinc-900 mb-2">Meet Our Mentors</h2>
                        <p className="text-zinc-600 mb-12">Experts dedicated to your growth.</p>
                    </motion.div>
                    
                    <div className="flex justify-center mb-12 border-b border-zinc-300">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-4 py-3 text-sm md:text-base font-semibold transition-colors ${activeTab === tab ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div 
                                        className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-zinc-900" 
                                        layoutId="underline"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[380px]">
                        <AnimatePresence mode="popLayout">
                            {filteredMentors.map((mentor) => (
                                <MentorCard key={mentor.name} {...mentor} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <div className="text-center mt-12">
                        <a href="/mentors" className="bg-zinc-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors inline-block transform hover:scale-105">
                            View All Mentors
                        </a>
                    </div>
                </div>
            </section>
            
            {/* Reviews Section */}
            <section className="py-20 bg-amber-200/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                     <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold text-zinc-900 mb-2">What Our Students Say</h2>
                        <p className="text-zinc-600 mb-12">Success stories from our community.</p>
                    </motion.div>
                    <div className="max-w-3xl mx-auto h-64 relative">
                        <Carousel items={reviews} renderCard={ReviewCard} />
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="py-20">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-lg text-zinc-700 max-w-2xl mx-auto mb-8">
                            Become part of a thriving community of learners and experts. Your path to mastery starts here.
                        </p>
                        <a 
                            href="/join" 
                            className="bg-zinc-900 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-zinc-800 transition-all duration-300 inline-block transform hover:scale-105 shadow-lg"
                        >
                            Join Us Now
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}