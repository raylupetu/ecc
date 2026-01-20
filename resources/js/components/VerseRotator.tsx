import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

const defaultVerses = [
    {
        text_fr: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
        text_en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference_fr: "Jean 3:16",
        reference_en: "John 3:16"
    }
];

export default function VerseRotator({ verses: dbVerses }: { verses?: any[] }) {
    const { locale } = usePage().props as any;
    const [currentVerse, setCurrentVerse] = useState(0);

    const verses = (dbVerses && dbVerses.length > 0) ? dbVerses : defaultVerses;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVerse((prev) => (prev + 1) % verses.length);
        }, 12000);
        return () => clearInterval(interval);
    }, [verses.length]);

    const verse = verses[currentVerse];
    const text = locale === 'fr' ? verse.text_fr : verse.text_en;
    const reference = locale === 'fr' ? verse.reference_fr : verse.reference_en;

    return (
        <section className="bg-gradient-to-r from-[#D90429] to-[#98031d] py-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen className="w-64 h-64 text-white" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentVerse}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left"
                    >
                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                            <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <div className="max-w-4xl">
                            <p className="text-white text-xl md:text-3xl font-black leading-relaxed italic mb-4">
                                "{text}"
                            </p>
                            <p className="text-white/80 font-black text-xl tracking-wider uppercase">
                                — {reference}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
