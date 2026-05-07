"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Shield, Users, Building2, MapPin, GraduationCap, Utensils,
    CheckCircle2, Ticket, Cctv, ShieldCheck, Factory, Badge,
    CalendarCheck, Loader2
} from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

/* ─── Icon Map ─── */
const iconMap: Record<string, ReactNode> = {
    Badge: <Badge className="w-6 h-6" />,
    Ticket: <Ticket className="w-6 h-6" />,
    Cctv: <Cctv className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
    Utensils: <Utensils className="w-6 h-6" />,
    Factory: <Factory className="w-6 h-6" />,
    MapPin: <MapPin className="w-6 h-6" />,
    CalendarCheck: <CalendarCheck className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
};

// Shows image from URL; falls back to icon placeholder on error
function ServiceImage({ src, title, icon }: { src: string; title: string; icon: ReactNode }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="w-full h-48 bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <div className="flex flex-col items-center gap-2 opacity-60">
                    <div className="w-14 h-14">{icon}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-48 overflow-hidden bg-slate-100 relative">
            <Image
                src={src}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setFailed(true)}
            />
        </div>
    );
}

type ServiceType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    icon: string;
    tags: string[];
};

export default function ServicesPage() {
    const [services, setServices] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="pt-10 pb-20 bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-blue-900 py-16 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 max-w-3xl mx-auto"
                    >
                        Pristine provides security services to various kinds of businesses and industries. We help identify security issues and deliver customized solutions based on extensive nationwide experience across multiple client categories.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p className="text-lg">No services available at the moment.</p>
                    </div>
                ) : (
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service) => (
                            <Link key={service._id} href="/get-service" className="block">
                                <motion.div
                                    variants={fadeInUp}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden flex flex-col cursor-pointer h-full"
                                >
                                    {/* Top accent bar */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />

                                    {/* Service Image */}
                                    <ServiceImage
                                        src={service.image}
                                        title={service.title}
                                        icon={iconMap[service.icon] || <Shield className="w-6 h-6" />}
                                    />

                                    {/* Card Body */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-slate-600 leading-relaxed mb-4">
                                            {service.description}
                                        </p>

                                        {service.tags && service.tags.length > 0 && (
                                            <div className="mt-auto pt-4 flex flex-wrap gap-2">
                                                {service.tags.map((tag, i) => (
                                                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </section>

            {/* Key Drivers Section */}
            <section className="py-24 mt-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                            <Shield className="w-64 h-64" />
                        </div>

                        <h2 className="text-3xl font-bold mb-8 relative z-10">Our Key Drivers for Quality Security:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            {[
                                "Consistent and reliable service.",
                                "Strict Monitoring and Supervision.",
                                "Quick response by Management at all levels.",
                                "Security officers who convey trust & confidence.",
                                "Security officers who possess professional demeanor.",
                                "Individualized attention to client needs."
                            ].map((driver, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                                    <span className="text-lg text-slate-300">{driver}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
