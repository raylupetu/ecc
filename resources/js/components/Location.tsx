import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import { handleGmailClick, encodeEmail } from '@/lib/mailUtils';
import { usePage } from '@inertiajs/react';

interface Props {
    email?: string;
    phone?: string;
    address?: string;
}

export default function Location({ email, phone, address }: Props) {
    const { settings, locale } = usePage().props as any;

    const locationTitle = locale === 'fr' ? 'Où nous trouver ?' : 'Where to Find Us';
    const contactInfoTitle = locale === 'fr' ? 'Informations de contact' : 'Contact Information';
    const addressTitle = locale === 'fr' ? 'Adresse' : 'Address';
    const phoneTitle = locale === 'fr' ? 'Téléphone' : 'Phone';
    const emailTitle = locale === 'fr' ? 'Email' : 'Email';
    const followUsTitle = locale === 'fr' ? 'Suivez-nous' : 'Follow Us';

    return (
        <section
            id="location"
            className="py-24 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter"
                    >
                        {locationTitle}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 120 }}
                        viewport={{ once: true }}
                        className="h-2 bg-[#D90429] mx-auto rounded-full shadow-lg shadow-[#D90429]/20"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-gray-50"
                    >
                        <h3 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">
                            {contactInfoTitle}
                        </h3>

                        <div className="space-y-12">
                            <div className="flex items-start gap-8">
                                <div className="w-16 h-16 bg-[#D90429]/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <MapPin className="w-8 h-8 text-[#D90429]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{addressTitle}</h4>
                                    <p className="text-gray-600 text-lg leading-relaxed font-black whitespace-pre-line">
                                        {address || settings?.address || '24ème CLMK – ECC, Bukavu, Sud-Kivu, RDC'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-8">
                                <div className="w-16 h-16 bg-[#D90429]/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <Phone className="w-8 h-8 text-[#D90429]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                                        {phoneTitle}
                                    </h4>
                                    <a
                                        href={`tel:${phone || settings?.contact_phone}`}
                                        className="text-lg text-gray-600 hover:text-[#D90429] transition-all font-black"
                                    >
                                        {phone || settings?.contact_phone || '+243 999 000 000'}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-8">
                                <div className="w-16 h-16 bg-[#D90429]/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <Mail className="w-8 h-8 text-[#D90429]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{emailTitle}</h4>
                                    <a
                                        href="#"
                                        onClick={(e) => handleGmailClick(e, encodeEmail(email || settings?.contact_email || 'contact@ecc24clmk.org'))}
                                        className="text-lg text-gray-600 hover:text-[#D90429] transition-all font-black"
                                    >
                                        {email || settings?.contact_email || 'contact@ecc24clmk.org'}
                                    </a>
                                </div>
                            </div>

                            <div className="pt-12 border-t border-gray-100">
                                <h4 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                                    {followUsTitle}
                                </h4>
                                <div className="flex gap-6">
                                    {settings?.facebook_url && (
                                        <a href={settings.facebook_url} target="_blank" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 shadow-sm">
                                            <Facebook className="w-6 h-6" />
                                        </a>
                                    )}
                                    {settings?.twitter_url && (
                                        <a href={settings.twitter_url} target="_blank" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 shadow-sm">
                                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                    )}
                                    {settings?.instagram_url && (
                                        <a href={settings.instagram_url} target="_blank" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 shadow-sm">
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                    )}
                                    {settings?.youtube_url && (
                                        <a href={settings.youtube_url} target="_blank" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 shadow-sm">
                                            <Youtube className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-50 h-full min-h-[500px]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127406.42351090847!2d28.84!3d-2.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c2f5c4a2e0e9eb%3A0x7f2c0e1f5d5f5f5f!2sBukavu%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full min-h-[500px]"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
