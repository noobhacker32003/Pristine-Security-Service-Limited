"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 w-full z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
                    : 'bg-white py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-10 h-12 flex-shrink-0">
                            <Image
                                src="/assets/logo1.png"
                                alt="PSSL Shield Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="relative h-10 w-32 hidden sm:block">
                            <Image
                                src="/assets/logo2.png"
                                alt="Pristine Security Service Limited"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                        {/* Fallback for very small screens if logo2 is hidden */}
                        <div className="flex flex-col sm:hidden">
                            <span className="text-xl font-bold text-slate-900 leading-tight">PSSL</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-blue-600 relative group',
                                    pathname === link.path ? 'text-blue-600' : 'text-slate-600'
                                )}
                            >
                                {link.name}
                                {pathname === link.path && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                    />
                                )}
                                {pathname !== link.path && (
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                )}
                            </Link>
                        ))}

                        <Link
                            href="/report"
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm shadow-sm hover:shadow-md"
                        >
                            <ShieldAlert className="w-4 h-4" />
                            Report Incident
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-slate-100 bg-white"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={cn(
                                        'block px-3 py-3 rounded-md text-base font-medium transition-colors',
                                        pathname === link.path
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 pb-2 px-3">
                                <Link
                                    href="/report"
                                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium transition-colors w-full shadow-sm"
                                >
                                    <ShieldAlert className="w-5 h-5" />
                                    Report Incident
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
