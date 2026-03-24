import Link from 'next/link';
import Image from 'next/image';
import { MapPin, PhoneCall, Mail, Facebook, Twitter, Shield, ShieldCheck } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 inline-flex">
                            <div className="relative w-10 h-12 flex-shrink-0">
                                <Image
                                    src="/assets/logo1.png"
                                    alt="PSSL Shield Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative h-10 w-40">
                                <Image
                                    src="/assets/logo2.png"
                                    alt="Pristine Security Service Limited"
                                    fill
                                    className="object-contain object-left brightness-0 invert"
                                /* Added brightness-0 invert so black text becomes white on the dark footer */
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs pt-2">
                            Our Business Is To Protect Your Business & Property. Providing integrated security solutions to deter threats and safeguard your interests since 2009.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all text-slate-400">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Our Services', path: '/services' },
                                { name: 'Contact Us', path: '/contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.path} className="text-sm hover:text-white hover:translate-x-1 inline-block transition-transform">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specific Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            {[
                                'Uniformed Guarding',
                                'Special Event Security',
                                'Console Operations',
                                'Physical Protection',
                                'Manufacturing Security'
                            ].map((service) => (
                                <li key={service}>
                                    <Link href="/services" className="text-sm hover:text-white hover:translate-x-1 inline-block transition-transform">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Banani Commercial Area,<br />Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <PhoneCall className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>88-02-58817173-4</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <a href="mailto:info@pristinesecurity.org" className="hover:text-white transition-colors">
                                    info@pristinesecurity.org
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {currentYear} PRISTINE SECURITY SERVICE LIMITED. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
