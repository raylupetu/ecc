import { usePage } from '@inertiajs/react';
import { Church, Facebook, Youtube, Mail, Phone, MapPin, Instagram, Twitter } from 'lucide-react';
import { handleGmailClick, encodeEmail } from '@/lib/mailUtils';

export default function Footer() {
    const { settings, locale } = usePage().props as any;

    const tagline = locale === 'fr'
        ? "Servir Dieu et l'humanité avec amour, dévouement et compassion."
        : "Serving God and humanity with love, dedication and compassion.";

    const quickLinksTitle = locale === 'fr' ? 'Liens rapides' : 'Quick Links';
    const contactTitle = locale === 'fr' ? 'Contact' : 'Contact';
    const followUsTitle = locale === 'fr' ? 'Suivez-nous' : 'Follow Us';
    const motto = locale === 'fr' ? 'À Dieu seul soit la gloire.' : 'To God alone be the glory.';
    const rightsReserved = locale === 'fr' ? '— Tous droits réservés.' : '— All rights reserved.';

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <footer className="bg-gray-950 text-white pt-20 pb-10 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                {settings?.logo ? (
                                    <img src={settings.logo} className="w-8 h-8 object-contain" alt="Logo" />
                                ) : (
                                    <Church className="w-8 h-8 text-[#D90429]" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tighter uppercase">{settings?.site_name || 'ECC/24ème CLMK'}</span>
                                <span className="text-xs font-black text-[#D90429] tracking-widest uppercase">{locale === 'fr' ? 'Depuis 1922' : 'Since 1922'}</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed font-medium">
                            {tagline}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-black text-lg mb-8 uppercase tracking-widest text-[#D90429]">{quickLinksTitle}</h3>
                        <ul className="space-y-4">
                            {[
                                { id: 'hero', label: locale === 'fr' ? 'Accueil' : 'Home' },
                                { id: 'about', label: locale === 'fr' ? 'À propos' : 'About' },
                                { id: 'activities', label: locale === 'fr' ? 'Activités' : 'Activities' },
                                { id: 'team', label: locale === 'fr' ? 'Équipe' : 'Team' },
                                { id: 'location', label: locale === 'fr' ? 'Contact' : 'Contact' }
                            ].map((link) => (
                                <li key={link.id}>
                                    <button onClick={() => scrollToSection(link.id)} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all font-black uppercase text-sm tracking-tight">
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-black text-lg mb-8 uppercase tracking-widest text-[#D90429]">{contactTitle}</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 mt-1">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                </div>
                                <span className="text-gray-400 font-black text-sm leading-relaxed">{settings?.address || '24ème CLMK – ECC, Bukavu, Sud-Kivu, RDC'}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                </div>
                                <a href={`tel:${settings?.contact_phone}`} className="text-gray-400 hover:text-white transition-all font-black text-sm">
                                    {settings?.contact_phone || '+243 123 456 789'}
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <a
                                    href="#"
                                    onClick={(e) => handleGmailClick(e, encodeEmail(settings?.contact_email || 'info@ecc24clmk.org'))}
                                    className="text-gray-400 hover:text-white transition-all font-black text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                    {settings?.contact_email || 'info@ecc24clmk.org'}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-black text-lg mb-8 uppercase tracking-widest text-[#D90429]">{followUsTitle}</h3>
                        <div className="flex flex-wrap gap-4">
                            {settings?.facebook_url && (
                                <a href={settings.facebook_url} target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 border border-white/10">
                                    <Facebook className="w-6 h-6" />
                                </a>
                            )}
                            {settings?.twitter_url && (
                                <a href={settings.twitter_url} target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 border border-white/10">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            )}
                            {settings?.instagram_url && (
                                <a href={settings.instagram_url} target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 border border-white/10">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            )}
                            {settings?.youtube_url && (
                                <a href={settings.youtube_url} target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D90429] hover:text-white transition-all transform hover:scale-110 border border-white/10">
                                    <Youtube className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm font-black uppercase tracking-widest">
                        © {new Date().getFullYear()} {settings?.site_name || 'ECC/24ème CLMK'} {rightsReserved}
                    </p>
                    <p className="text-[#D90429] text-xl font-black italic tracking-tight drop-shadow-2xl">
                        {motto}
                    </p>
                </div>
            </div>
        </footer>
    );
}
