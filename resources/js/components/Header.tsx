import { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Church, Menu, X, Languages, Globe } from 'lucide-react';

export default function Header() {
    const { settings, locale } = usePage().props as any;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: locale === 'fr' ? 'Accueil' : 'Home', id: 'hero' },
        { name: locale === 'fr' ? 'À propos' : 'About', id: 'about' },
        { name: locale === 'fr' ? 'Activités' : 'Activities', id: 'activities' },
        { name: locale === 'fr' ? 'Équipe' : 'Team', id: 'team' },
        { name: locale === 'fr' ? 'Contact' : 'Contact', id: 'location' }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
                    <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-[#D90429]/10' : 'bg-white/10'}`}>
                        {settings?.logo ? (
                            <img src={settings.logo} className="w-8 h-8 object-contain" alt="Logo" />
                        ) : (
                            <Church className={`w-8 h-8 transition-colors ${isScrolled ? 'text-[#D90429]' : 'text-white'}`} />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-xl leading-none tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                            {settings?.site_name || 'ECC/24ème CLMK'}
                        </span>
                        <span className={`text-[10px] font-black tracking-widest uppercase ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
                            {locale === 'fr' ? 'Bukavu, Sud-Kivu' : 'Bukavu, South-Kivu'}
                        </span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollToSection(link.id)}
                            className={`text-sm font-black uppercase tracking-widest transition-all hover:text-[#D90429] ${isScrolled ? 'text-gray-600' : 'text-white'}`}
                        >
                            {link.name}
                        </button>
                    ))}

                    <div className="h-4 w-px bg-gray-300 mx-2" />

                    <div className="flex items-center gap-2">
                        <Link
                            href={route('language.switch', 'fr')}
                            className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${locale === 'fr' ? 'bg-[#D90429] text-white' : (isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/60 hover:text-white')}`}
                        >
                            FR
                        </Link>
                        <Link
                            href={route('language.switch', 'en')}
                            className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${locale === 'en' ? 'bg-[#D90429] text-white' : (isScrolled ? 'text-gray-400 hover:text-gray-900' : 'text-white/60 hover:text-white')}`}
                        >
                            EN
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <Link href={route('language.switch', locale === 'fr' ? 'en' : 'fr')} className={`p-2 rounded-lg ${isScrolled ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-white'}`}>
                        <Languages className="w-5 h-5" />
                    </Link>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <X className={`w-8 h-8 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                        ) : (
                            <Menu className={`w-8 h-8 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 space-y-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-left font-black uppercase tracking-widest text-gray-900 hover:text-[#D90429] transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

declare function route(name: string, params?: any): string;
