"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-4 mb-6 text-sm font-medium text-slate-500"
                    >
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                            Industry Insights
                        </span>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            April 28, 2026
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            5 min read
                        </div>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-8"
                    >
                        The Evolution of Modern Security: <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                            Integrating AI and Human Expertise
                        </span>
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center justify-between py-6 border-y border-slate-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                                <User className="w-6 h-6 text-slate-500" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">James Anderson</p>
                                <p className="text-sm text-slate-500">Chief Security Officer, Pristine Security</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2.5 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-full hover:border-blue-200 transition-all shadow-sm hover:shadow">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-full hover:border-blue-200 transition-all shadow-sm hover:shadow">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </header>

                {/* Featured Image */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative aspect-video w-full rounded-3xl overflow-hidden mb-16 shadow-2xl border border-slate-100"
                >
                    <Image 
                        src="/images/security_blog_hero.png" 
                        alt="Modern Security Command Center" 
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </motion.div>

                {/* Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="max-w-none text-slate-700 text-lg leading-relaxed space-y-6"
                >
                    <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                        In an era where threats are becoming increasingly sophisticated, traditional security measures are no longer sufficient. The landscape has fundamentally shifted, and at Pristine Security Service Limited, we are at the forefront of this transformation.
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Shift from Reactive to Proactive Security</h2>
                    <p>
                        For decades, the security industry operated primarily on a reactive model. An incident occurs, an alarm sounds, and personnel respond. While this model was effective in the past, today's dynamic threat environment requires a proactive approach. By anticipating potential vulnerabilities and addressing them before they can be exploited, we significantly reduce risk and ensure operational continuity.
                    </p>

                    <blockquote className="border-l-4 border-blue-500 bg-blue-50/50 p-6 rounded-r-2xl my-10 italic text-slate-700 text-xl font-medium">
                        "True security isn't just about responding to threats; it's about creating an environment where threats are neutralized before they even materialize."
                    </blockquote>

                    <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Power of Technological Integration</h2>
                    <p>
                        The true game-changer in modern security is the seamless integration of advanced technology with highly trained human personnel. We are leveraging cutting-edge tools to enhance our capabilities:
                    </p>
                    <ul className="space-y-4 my-8 text-slate-700 list-disc list-outside ml-6">
                        <li className="pl-2"><strong className="text-slate-900">AI-Powered Surveillance:</strong> Smart cameras that can detect anomalous behavior and alert operators instantly, rather than relying on human eyes to spot every detail.</li>
                        <li className="pl-2"><strong className="text-slate-900">Predictive Analytics:</strong> Utilizing data to identify patterns and predict where security breaches are most likely to occur.</li>
                        <li className="pl-2"><strong className="text-slate-900">Automated Access Control:</strong> Biometric and mobile-credential systems that provide frictionless yet highly secure entry points.</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Irreplaceable Human Element</h2>
                    <p>
                        Despite these technological advancements, the human element remains absolutely critical. Technology provides the data and the alerts, but it requires trained professionals to interpret that data, assess the nuance of a situation, and make complex, split-second decisions.
                    </p>
                    <p>
                        At Pristine Security, our officers are no longer just "guards"; they are skilled operators managing complex technological ecosystems. They are trained not only in physical security protocols but also in understanding and utilizing the sophisticated tools at their disposal.
                    </p>

                    <div className="bg-slate-900 text-white p-10 rounded-3xl my-12 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Looking Ahead: The Pristine Commitment</h3>
                        <p className="text-slate-300 relative z-10 mb-0">
                            As we look to the future, Pristine Security Service Limited remains committed to pioneering these hybrid security solutions. We believe that the ultimate security posture is achieved when advanced technology is wielded by exceptional people. We will continue to invest in both our technological infrastructure and the continuous training of our personnel to provide you with unparalleled peace of mind.
                        </p>
                    </div>

                    <p>
                        The evolution of security is an ongoing journey. By embracing both innovation and the enduring value of human expertise, we are setting new standards for safety and protection in an unpredictable world.
                    </p>
                </motion.div>
                
                {/* Author Bio Footer */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 pt-10 border-t border-slate-200"
                >
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-10 h-10 text-slate-500" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">James Anderson</h4>
                            <p className="text-slate-600 mb-4">
                                With over 20 years of experience in both military intelligence and corporate security, James leads Pristine Security's strategic initiatives, focusing on the intersection of human intelligence and advanced technological systems.
                            </p>
                            <Link href="/contact" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                                Contact our security experts
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </article>
        </div>
    );
}
