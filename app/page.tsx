"use client";

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight, Shield, Phone, MessageCircle,
    ShieldCheck, Landmark, Factory, Home as HomeIcon, Building2,
    ShoppingBag, GraduationCap, Hotel, Flag,
    Badge, Ticket, Cctv, Users, MapPin, Utensils, CalendarCheck,
    CheckCircle2
} from 'lucide-react';
import { companyStats, industries, contactInfo } from '@/lib/site-data';

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

const industryIconMap: Record<string, ReactNode> = {
    Landmark: <Landmark className="w-7 h-7" />,
    Factory: <Factory className="w-7 h-7" />,
    Home: <HomeIcon className="w-7 h-7" />,
    Building2: <Building2 className="w-7 h-7" />,
    ShoppingBag: <ShoppingBag className="w-7 h-7" />,
    GraduationCap: <GraduationCap className="w-7 h-7" />,
    Hotel: <Hotel className="w-7 h-7" />,
    Flag: <Flag className="w-7 h-7" />,
};

/* ─── Animation variants ─── */
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

/* ─── Animated counter ─── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}

/* ─── Service Image with fallback ─── */
function ServiceImage({ src, title, icon }: { src: string; title: string; icon: ReactNode }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="w-full h-48 bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
        );
    }

    return (
        <div className="w-full h-48 overflow-hidden bg-slate-100 relative">
            <Image
                src={src}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setFailed(true)}
            />
        </div>
    );
}

/* ─── Service type ─── */
type ServiceType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    icon: string;
    tags: string[];
};

/* ─── Client logos ─── */
const clients = [
    { id: 1, name: "Bangladesh Cricket Board", logo: "/assets/client/Bangladesh-Team-Cricket-Logo.webp" },
    { id: 2, name: "Dutch Bangla Bank", logo: "/assets/client/Dutch-bangla-bank-ltd.svg.png" },
    { id: 3, name: "BRAC Bank", logo: "/assets/client/brac_bank.jpg" },
    { id: 4, name: "Channel I", logo: "/assets/client/channel-i-logo-F9F1100F83-seeklogo.com.png" },
    { id: 5, name: "Client Logo 1", logo: "/assets/client/logo (1).png" },
    { id: 6, name: "Client Logo 2", logo: "/assets/client/logo.png" },
    { id: 7, name: "New Project", logo: "/assets/client/new_project_0.png" },
    { id: 8, name: "Shahjalal Islami Bank", logo: "/assets/client/shahjalal_1.jpg" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━ HOMEPAGE ━━━━━━━━━━━━━━━━━━━━━━ */
export default function Home() {
    const [services, setServices] = useState<ServiceType[]>([]);
    const [servicesLoading, setServicesLoading] = useState(true);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(Array.isArray(data) ? data : []);
                setServicesLoading(false);
            })
            .catch(() => setServicesLoading(false));
    }, []);

    // Show only first 4 on homepage
    const displayedServices = services.slice(0, 4);

    return (
        <div className="flex flex-col w-full">

            {/* ════════════════ 1. HERO SECTION ════════════════ */}
            <section className="relative bg-slate-900 overflow-hidden min-h-[90vh] flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 mix-blend-multiply" />
                    <Image
                        src="/assets/images/Hero/Hero (1).jpeg"
                        alt="Security professionals in a corporate setting"
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover opacity-40"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 mb-6 backdrop-blur-sm">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-semibold tracking-wide uppercase">Pristine Security Service Ltd.</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                            Reliable Security Solutions for{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                Businesses & Communities
                            </span>{' '}
                            Across Bangladesh
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                            Trained personnel, advanced technology, and 24/7 protection tailored to your needs. We provide integrated security solutions to deter threats and safeguard your interests.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/get-service"
                                id="hero-get-quote"
                                className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25"
                            >
                                Get service
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href={`tel:${contactInfo.controlRoom}`}
                                id="hero-call-now"
                                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                            <a
                                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                id="hero-whatsapp"
                                className="inline-flex justify-center items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] backdrop-blur-md border border-[#25D366]/30 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════ 2. STATS / WHY CHOOSE US ════════════════ */}
            <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {companyStats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-sm md:text-base font-medium text-slate-600">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ════════════════ 3. SERVICES (Dynamic from DB) ════════════════ */}
            <section className="py-24 bg-slate-50 border-t border-slate-200" id="services-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase mb-3">Our Expertise</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Comprehensive Security Services</h3>
                        <p className="mt-4 text-slate-600 text-lg">
                            From uniformed guarding to advanced CCTV monitoring, we deliver end-to-end security tailored to your industry.
                        </p>
                    </motion.div>

                    {servicesLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
                                    <div className="w-full h-48 bg-slate-200" />
                                    <div className="p-8 space-y-4">
                                        <div className="h-6 bg-slate-200 rounded w-3/4" />
                                        <div className="h-4 bg-slate-200 rounded w-full" />
                                        <div className="h-4 bg-slate-200 rounded w-5/6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {displayedServices.map((service) => (
                                <motion.div
                                    key={service._id}
                                    variants={fadeInUp}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden flex flex-col"
                                >
                                    <ServiceImage
                                        src={service.image}
                                        title={service.title}
                                        icon={iconMap[service.icon] || <Shield className="w-6 h-6" />}
                                    />
                                    <div className="p-6 md:p-8 flex flex-col flex-1">
                                        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h4>
                                        <p className="text-slate-600 leading-relaxed text-sm mb-4 line-clamp-2">
                                            {service.description}
                                        </p>
                                        {service.tags && service.tags.length > 0 && (
                                            <div className="mt-auto flex flex-wrap gap-1.5">
                                                {service.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-xs font-medium">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    <div className="mt-12 text-center">
                        <Link
                            href="/services"
                            id="view-all-services"
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md"
                        >
                            View All Services
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ════════════════ 4. INDUSTRIES SERVED ════════════════ */}
            <section className="py-20 bg-white" id="industries-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase mb-3">Industries We Serve</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Trusted Across Every Sector</h3>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                    >
                        {industries.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl p-6 text-center group transition-all duration-300 hover:shadow-md cursor-default"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 bg-white group-hover:bg-blue-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors shadow-sm">
                                    {industryIconMap[item.icon] || <Building2 className="w-7 h-7" />}
                                </div>
                                <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{item.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════ 5. ABOUT SNIPPET ════════════════ */}
            <section className="py-24 bg-white relative border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="space-y-8"
                        >
                            <h2 className="text-blue-600 font-bold tracking-wide uppercase">About Our Company</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                                Military-like Discipline <br />Honed to Perfection
                            </h3>
                            <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Founded by highly trained officers of the world&apos;s leading multinational security companies and supervised by retired senior Battle Tank technocrats of the Bangladesh Army. At Pristine, our security experts put into place meticulous planning worked to the last detail.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {['Custom-built Systems', 'Preventive Controls', 'Unmatched Synergy', 'Ex-Military Staffing'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 className="text-blue-600 w-5 h-5 shrink-0" />
                                        <span className="text-sm font-medium text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
                            >
                                Learn More About Us
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]"
                        >
                            <Image
                                src="/assets/images/Hero/Hero (3).jpeg"
                                alt="Security monitoring"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl w-full">
                                    <div className="flex items-center gap-4 text-white">
                                        <Shield className="w-10 h-10 text-blue-400" />
                                        <div>
                                            <p className="font-bold text-xl">Since 2009</p>
                                            <p className="text-slate-300">Trusted Nationwide Security Partner</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════════════ 6. CLIENT LOGOS (Marquee) ════════════════ */}
            <section className="py-20 bg-slate-50 border-t border-slate-200" id="clients-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase mb-3">Trusted By</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Our Valuable Clients</h3>
                    </motion.div>

                    {/* Marquee container */}
                    <div className="overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                        <div className="flex animate-marquee w-max gap-16 items-center py-4">
                            {[...clients, ...clients].map((client, i) => (
                                <div key={`${client.id}-${i}`} className="flex-shrink-0 hover:scale-105 transition-all duration-300">
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        width={160}
                                        height={80}
                                        className="h-16 md:h-20 w-auto object-contain rounded-xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════ 7. CTA BANNER ════════════════ */}
            <section className="py-20 bg-[#1C398E] relative overflow-hidden" id="cta-section">
                <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl pointer-events-none">
                    <Shield className="w-96 h-96 text-white" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Professional Security Services?</h2>
                        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
                            Our team of professionals is ready to assess your requirements and deploy customized security protocols for your business or property.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/get-service"
                                id="cta-get-quote"
                                className="inline-flex justify-center items-center gap-2 bg-white text-blue-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
                            >
                                Get service
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href={`tel:${contactInfo.controlRoom}`}
                                id="cta-call-now"
                                className="inline-flex justify-center items-center gap-2 bg-blue-700 text-white hover:bg-blue-800 border border-blue-500 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Call {contactInfo.controlRoom}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}