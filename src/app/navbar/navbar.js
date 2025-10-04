'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(null);

    const navItems = [
        { name: 'About', href: '/about' },
        { name: 'Mentors', href: '/mentors' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/contact' },
    ];

    const dropdownVariants = {
        enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
    };

    return (
        <>
            {/* --- Desktop Navbar --- */}
            <header className="hidden md:block fixed top-4 left-0 w-full z-50">
                <div 
                    className="container mx-auto max-w-3xl p-2 flex items-center justify-between bg-amber-100/80 backdrop-blur-md border border-amber-200/80 rounded-2xl shadow-lg"
                >
                    {/* Brand Logo */}
                    <a href="/" className="flex items-center gap-2 pl-2 pr-4 flex-shrink-0">
                        <div className="text-xl font-bold bg-zinc-900 text-white rounded-full w-9 h-9 flex items-center justify-center">M</div>
                        <span className="text-xl font-bold text-zinc-900">Mentora</span>
                    </a>
                    
                    <div className="flex items-center gap-4">
                        {/* Navigation */}
                        <nav className="flex items-center gap-2 bg-amber-50/50 p-1 rounded-xl border border-amber-200/50">
                            {navItems.map(item => (
                                 <a 
                                    key={item.name} 
                                    href={item.href} 
                                    className="text-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors px-4 py-2 rounded-lg text-sm"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Action Button */}
                        <a href="/authentication" className="bg-zinc-900 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-sm">
                            Login / Sign Up
                        </a>
                    </div>
                </div>
            </header>

            {/* --- Mobile Navbar --- */}
            <header className="md:hidden fixed top-0 left-0 w-full z-50 bg-amber-100/80 backdrop-blur-md border-b border-amber-200/80">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <a href="/" className="flex items-center gap-2">
                        <div className="text-xl font-bold bg-zinc-900 text-white rounded-full w-9 h-9 flex items-center justify-center">M</div>
                        <span className="text-xl font-bold text-zinc-900">Mentora</span>
                    </a>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900 p-2 rounded-md hover:bg-amber-200/50">
                        <span className="sr-only">Open menu</span>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <nav className="flex flex-col gap-2 p-4 pt-0">
                                {navItems.map(item => <a key={item.name} href={item.href} className="text-zinc-900 w-full text-left p-3 rounded-lg hover:bg-amber-200/50">{item.name}</a>)}
                                <div className="border-t border-amber-200 mt-2 pt-4">
                                    <a href="/authentication" className="bg-zinc-900 text-white font-semibold py-3 rounded-lg w-full text-center block">
                                        Login / Sign Up
                                    </a>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Navbar;
