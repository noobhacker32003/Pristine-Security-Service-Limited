"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, MapPin, Search, Users, Settings, Building, Briefcase, Badge, Ticket, Cctv, ShieldCheck } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const services = [
  {
    icon: <Badge className="w-6 h-6 text-blue-600" />,
    title: 'Uniformed Guarding',
    description: 'Professional security officers ensuring safe environments for our clients nationwide.',
  },
  {
    icon: <Ticket className="w-6 h-6 text-blue-600" />,
    title: 'Special Event Security',
    description: 'Efficient staffing for high-visibility venues, concerts, and corporate events.',
  },
  {
    icon: <Cctv className="w-6 h-6 text-blue-600" />,
    title: 'Console Operations',
    description: 'Expert monitoring of CCTV, fire detection, and intrusion detection systems.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: 'Physical Protection',
    description: 'Installation and maintenance of physical deterrents like razor wires and fences.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 mix-blend-multiply" />
          <img
            src="https://www.elitebd.com/themes/elite-force-new-06/assets/images/Elite-Force-Guard-Silhouette.jpg"
            alt="Security professionals in a corporate setting"
            className="w-full h-full object-cover opacity-40"
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

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Protecting Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Business</span> & Property
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              We provide integrated security solutions that help deter threats and safeguard your interests. Our dedication drives us to strive for excellence with utmost honesty and discipline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section Snippet */}
      <section className="py-24 bg-white relative">
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
                Founded by highly trained officers of the World's leading Multinational Security Companies and supervised by retired senior Battle Tank technocrats of the Bangladesh Army. At Pristine, our security experts put into place meticulous planning worked to the last detail.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our processes are seamless with systemic functioning and built-in preventive controls. We provide custom-built, integrated security systems to cater to every specific need of our clients, ranging from Embassies and UN bodies to Industries and Residences.
              </p>
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
              <img
                src="https://tragopan-security.co.uk/wp-content/uploads/2024/11/6.jpg"
                alt="Security monitoring"
                className="w-full h-full object-cover"
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

      {/* Services Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-blue-600 font-bold tracking-wide uppercase mb-3">Our Expertise</h2>
            <h3 className="text-4xl font-bold text-slate-900">Comprehensive Security Services</h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-20 bg-[#1C398E] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl pointer-events-none">
          <Shield className="w-96 h-96 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Immediate Security Solutions?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
            Our team of professionals is ready to assess your requirements and deploy customized security protocols for your business or property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:88-02-58817173-4"
              className="inline-flex justify-center items-center gap-2 bg-white text-blue-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              Call 88-02-58817173-4
            </a>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center gap-2 bg-blue-700 text-white hover:bg-blue-800 border border-blue-500 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
