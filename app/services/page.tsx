"use client";

import { motion } from 'framer-motion';
import { Shield, Users, Computer, Building2, MapPin, GraduationCap, Utensils, Construction, CheckCircle2, Ticket, Cctv, ShieldCheck, Factory, Badge } from 'lucide-react';

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

const servicesList = [
    {
        icon: <Badge className="w-6 h-6" />,
        title: "Uniformed Guarding",
        description: "Every day approximately 2,000 uniformed Pristine Security Guards, Supervisors, Inspectors and Security Officers perform a variety of duties to help maintain secure environments for a good number of clients across the Country."
    },
    {
        icon: <Ticket className="w-6 h-6" />,
        title: "Special Event Security",
        description: "Recognized for security services at various types of special events. Employees are trained to deal with issues in high-visibility settings such as Concert Venues, Trade Shows, and Sporting Events. Includes Access Control, Crowd Control, and Executive Protection."
    },
    {
        icon: <Cctv className="w-6 h-6" />,
        title: "Console Operations",
        description: "Our console operators monitor CCTV, Access Control, Fire Detection and Intrusion Detection Systems. We also monitor Visitor Arrivals and Departures, and coordinate with Officers on Patrol."
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Physical Protection",
        description: "One of the very few Private Security Service Provider Companies in Bangladesh taking the responsibility of installing Barbed wire, Razor wire, and Electric Fences over existing boundary walls."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Reception/Concierge Services",
        description: "Monitoring Access of Employees, Contractors and Visitors to Facilities, issuing Badges, Maintaining Logs, Inspecting Bags and Packages and giving directions."
    },
    {
        icon: <Building2 className="w-6 h-6" />,
        title: "Building Security",
        description: "Extensive experience providing security for both Commercial and Residential Buildings, offering customized solutions based on security expertise."
    },
    {
        icon: <GraduationCap className="w-6 h-6" />,
        title: "Education Security",
        description: "Providing specialized security to educational institutions in the face of a myriad of unique security threats facing schools and campuses today."
    },
    {
        icon: <Utensils className="w-6 h-6" />,
        title: "Hospitality Security",
        description: "Pristine Security is committed to the advancement of security and life safety in the Hospitality and Hotel Industry."
    },
    {
        icon: <Factory className="w-6 h-6" />,
        title: "Manufacturing Facilities Security",
        description: "Protecting manufacturing industries from external threats and trusted insiders to prevent loss of profitability, trade secrets, and reputation."
    }
];

export default function ServicesPage() {
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
                        Physical Security is our core business and we are uniquely positioned to offer customized security services to meet the specific needs of any organization.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {servicesList.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
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
