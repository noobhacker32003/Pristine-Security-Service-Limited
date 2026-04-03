"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

type OfferProps = {
    offer: {
        title: string;
        badgeText: string;
        benefits: string[];
    } | null;
};

export default function OfferClient({ offer }: OfferProps) {
    if (!offer) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md"
                >
                    <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Tag className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">No Active Offers</h2>
                    <p className="text-slate-500 mb-8">
                        Check back later for special offers and promotions! We periodically update our services with great deals.
                    </p>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                    >
                        View Our Services
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative"
                >
                    {/* Ribbon */}
                    <div className="absolute top-6 -right-12 rotate-45 bg-amber-500 text-white font-bold py-1.5 px-14 shadow-md text-sm tracking-wider uppercase z-10">
                        {offer.badgeText}
                    </div>

                    <div className="p-8 sm:p-12 md:p-16">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100"
                        >
                            Special Promotion
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-8"
                        >
                            {offer.title}
                        </motion.h1>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4 mb-12"
                        >
                            {offer.benefits.map((benefit, index) => (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex-shrink-0 bg-green-100 p-1 rounded-full mt-0.5">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-lg text-slate-700 font-medium">{benefit}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/get-service"
                                className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Get This Offer Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-4 rounded-full font-bold text-lg transition-all"
                            >
                                Contact Sales
                            </Link>
                        </motion.div>
                    </div>
                    
                    {/* Decorative bottom wave or color bar */}
                    <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400"></div>
                </motion.div>
            </div>
        </div>
    );
}
