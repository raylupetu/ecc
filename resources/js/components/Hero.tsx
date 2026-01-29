import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

const defaultSlides = [
    {
        image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1920',
        title_fr: 'Bienvenue à la 24ème CLMK',
        title_en: 'Welcome to the 24th CLMK',
        subtitle_fr: 'Servir Dieu et l\'humanité depuis 1922',
        subtitle_en: 'Serving God and humanity since 1922',
        button_text_fr: 'Découvrir',
        button_text_en: 'Discover',
        button_url: '#about'
    }
];

export default function Hero({ slides: dbSlides }: { slides?: any[] }) {
    const { locale } = usePage().props as any;
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = (dbSlides && dbSlides.length > 0) ? dbSlides : defaultSlides;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id.startsWith('#') ? id.substring(1) : id);
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

    const slide = slides[currentSlide];
    const title = locale === 'fr' ? slide.title_fr : slide.title_en;
    const subtitle = locale === 'fr' ? slide.subtitle_fr : slide.subtitle_en;
    const btnText = locale === 'fr' ? (slide.button_text_fr || 'Découvrir') : (slide.button_text_en || 'Discover');
    const btnUrl = slide.button_url || '#about';

    return (
        <section id="hero" className="relative h-screen bg-gray-900 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Preload first slide image */}
                        <img
                            src={slide.image}
                            alt=""
                            className="hidden"
                            loading={currentSlide === 0 ? "eager" : "lazy"}
                            // @ts-ignore
                            fetchPriority={currentSlide === 0 ? "high" : "low"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                    </div>
                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            {title && (
                                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase drop-shadow-2xl">
                                    {title}
                                </h1>
                            )}
                            {subtitle && (
                                <p className="text-xl md:text-3xl text-white/90 mb-12 font-black tracking-tight drop-shadow-lg">
                                    {subtitle}
                                </p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button
                                    onClick={() => btnUrl.startsWith('#') ? scrollToSection(btnUrl) : window.open(btnUrl, '_blank')}
                                    className="px-12 py-5 bg-[#D90429] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#B8032A] transition-all shadow-2xl hover:shadow-[#D90429]/50 transform hover:-translate-y-1"
                                >
                                    {btnText}
                                </button>
                                <button
                                    onClick={() => scrollToSection('location')}
                                    className="px-12 py-5 bg-white text-gray-900 rounded-full font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl transform hover:-translate-y-1"
                                >
                                    {locale === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#D90429] text-white p-5 rounded-full transition-all backdrop-blur-md hidden lg:block border border-white/20 group"
                    >
                        <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#D90429] text-white p-5 rounded-full transition-all backdrop-blur-md hidden lg:block border border-white/20 group"
                    >
                        <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </button>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-3 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-[#D90429] w-16' : 'bg-white/30 w-4 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
