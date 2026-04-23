"use client";

import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function AboutPage() {
    return (
        <div className="pt-10 pb-20">
            {/* Header */}
            <section className="bg-slate-900 min-h-[40vh] md:min-h-[calc(60vh+200px)] py-20 flex flex-col justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply" />
                    <img
                        src="/assets/images/about.jpeg"
                        alt="Security meeting"
                        className="w-full h-full object-cover object-center opacity-30"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-6"
                    >
                        About Pristine Security
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto"
                    >
                        Military-like discipline and precision honed to perfection since 2009.
                    </motion.p>
                </div>
            </section>

            {/* History & Overview */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-slate-100"
                    >
                        <img
                            src="/assets/images/legacy.jpeg"
                            alt="Security Guard"
                            className="w-full h-full object-contain md:object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-white-900 mb-6">Our History & Legacy</h2>
                        <p className="text-lg leading-relaxed text-white-500 ">
                            Pristine Security Service Limited is founded by few highly trained officers of World’s leading Multinational Security Company in Bangladesh under the supervision of a Retired Senior Battle Tank Technocrat of Bangladesh Army in 2009. Pristine is well-known for its military like discipline and precision honed to perfection.






                        </p>
                        <p className="text-lg leading-relaxed text-white-500">
                            At Pristine, our security experts put into place meticulous planning worked to the last detail. Our processes are seamless with systemic functioning and built-in preventive controls. Moreover, on specific demand by our client we provide Retired Soldiers in place of security guards, who are better trained to deal with demanding emergency situations.
                        </p>
                        <p className="text-lg leading-relaxed text-white-500">
                            As a salient feature, our offerings are custom-built, integrated security systems to cater every specific need of the end user. At Pristine, we constantly endeavor to innovate, integrate and deliver. Along with security expertise, we bring unmatched integrity and synergy, yielding greater return on investment of our clients.
                        </p>
                        <p className="text-lg leading-relaxed text-white-500">
                            The list of customers who hire services from Pristine include Embassies, UN bodies, NGO’s, Government Organizations, Banks, Offices, Factories, Industries, Housing and Residences, Super Mole, Fashion & Batik House.
                        </p>

                        <div className="pt-6 grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-600 w-6 h-6 shrink-0" />
                                <span className="font-2xl text-cyan">Custom-built Systems</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-600 w-6 h-6 shrink-0" />
                                <span className="font-2xl text-cyan">Preventive Controls</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-600 w-6 h-6 shrink-0" />
                                <span className="font-2xl text-cyan">Unmatched Synergy</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-blue-600 w-6 h-6 shrink-0" />
                                <span className="font-2xl text-cyan">Ex-Military Staffing</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Vision, Mission, Values */}
            <section className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To become one of the Top Level Security Service and Allied Services Provider at the national level with quality in people, training and services.

                                It is through this vision that it will build long-term business relationship with its current clients and those who will select it in the future as security partner.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To foresee, design and deliver comprehensive security solutions to our valued clients throughout Bangladesh.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Values</h3>
                            <p className="text-slate-600 leading-relaxed text-left border-l-4 border-blue-600 pl-4">
                                <span className="block mb-2 font-medium">Professional Excellence</span>
                                <span className="block mb-2 font-medium">Discretion & Integrity</span>
                                <span className="block mb-2 font-medium">Client Confidentiality</span>
                                <span className="block mb-2 font-medium">Trust & Satisfaction of the Client</span>
                                <span className="block font-medium">Employee Satisfaction</span>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}