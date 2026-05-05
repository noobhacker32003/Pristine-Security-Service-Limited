"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Tag, Shield, Clock, Star, Sparkles, Phone, Award } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { apiFetch, queryKeys } from '@/lib/api';

type OfferData = {
    title: string;
    badgeText: string;
    benefits: string[];
};
/* ─────────────── Skeleton Components ─────────────── */
function OfferSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Hero Skeleton */}
                <div className="text-center mb-14 animate-pulse">
                    <div className="h-8 w-48 bg-slate-200 rounded-full mx-auto mb-6" />
                    <div className="h-12 w-[70%] bg-slate-200 rounded-2xl mx-auto mb-4" />
                    <div className="h-5 w-[50%] bg-slate-100 rounded-lg mx-auto" />
                </div>

                {/* Main Card Skeleton */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden animate-pulse">
                    {/* Top Gradient Bar */}
                    <div className="h-2 bg-slate-200 w-full" />

                    <div className="p-8 sm:p-12 md:p-16">
                        {/* Badge */}
                        <div className="h-7 w-36 bg-slate-200 rounded-full mb-8" />

                        {/* Title */}
                        <div className="h-10 w-[80%] bg-slate-200 rounded-xl mb-4" />
                        <div className="h-10 w-[55%] bg-slate-200 rounded-xl mb-10" />

                        {/* Benefits */}
                        <div className="space-y-5 mb-12">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                                    <div className="h-5 bg-slate-100 rounded-lg flex-1" style={{ maxWidth: `${65 + i * 5}%` }} />
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="h-14 w-56 bg-slate-200 rounded-full" />
                            <div className="h-14 w-44 bg-slate-100 rounded-full" />
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="h-3 bg-slate-200 w-full" />
                </div>

                {/* Bottom Info Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
                            <div className="h-5 w-28 bg-slate-200 rounded-lg mb-2" />
                            <div className="h-4 w-full bg-slate-100 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────── No Offer State ─────────────── */
function NoOfferState() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-br from-slate-100 to-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-slate-200">
                        <Tag className="w-12 h-12 text-slate-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">No Active Offers</h2>
                    <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                        We don't have any active promotions right now. Check back later for exclusive security service offers and discounts!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            View Our Services
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-semibold transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

/* ─────────────── Main Page ─────────────── */
export default function OfferPage() {
    const { data: offer, isLoading, isError } = useQuery<OfferData | null>({
        queryKey: queryKeys.offer,
        queryFn: () => apiFetch<OfferData | null>('/api/offer'),
        staleTime: 60 * 1000, // Consider data fresh for 60 seconds
    });

    if (isLoading) return <OfferSkeleton />;
    if (isError || !offer) return <NoOfferState />;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2 rounded-full text-sm font-bold tracking-wide border border-amber-200 mb-6">
                        <Sparkles className="w-4 h-4" />
                        Limited Time Promotion
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Security</span> Offer
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Take advantage of this special promotion from Pristine Security Service Limited.
                    </p>
                </motion.div>

                {/* Main Offer Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative"
                >
                    {/* Ribbon */}
                    <div className="absolute top-7 -right-12 rotate-45 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-2 px-14 shadow-lg text-sm tracking-wider uppercase z-10">
                        {offer.badgeText}
                    </div>

                    {/* Top Gradient */}
                    <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-400" />

                    <div className="p-8 sm:p-12 md:p-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-8 border border-blue-100"
                        >
                            <Shield className="w-4 h-4" />
                            Special Promotion
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-10"
                        >
                            {offer.title}
                        </motion.h2>

                        {/* Benefits */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4 mb-12"
                        >
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">What&apos;s Included</h3>
                            {offer.benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                    <div className="flex-shrink-0 bg-green-100 p-1.5 rounded-full mt-0.5 group-hover:bg-green-200 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-lg text-slate-700 font-medium">{benefit}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA */}
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
                                <Phone className="w-5 h-5" />
                                Contact Sales
                            </Link>
                        </motion.div>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div className="h-3 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400" />
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
                >
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">Limited Time</h4>
                        <p className="text-sm text-slate-500">This offer is available for a limited period only. Don&apos;t miss out.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                            <Star className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">Premium Quality</h4>
                        <p className="text-sm text-slate-500">Same world-class service standards with unbeatable value.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                            <Award className="w-6 h-6 text-amber-600" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">Trusted Since 2009</h4>
                        <p className="text-sm text-slate-500">Backed by 17+ years of experience protecting businesses nationwide.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}