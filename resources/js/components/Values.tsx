import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Props {
    content_fr?: string;
    content_en?: string;
}

export default function Values({ content_fr, content_en }: Props) {
    const { locale } = usePage().props as any;

    const valuesTitle = locale === 'fr' ? 'Ce que nous valorisons le plus' : 'What We Value Most';
    const valuesText = locale === 'fr'
        ? (content_fr || "Sauver les âmes de manière holistique et les amener à Jésus-Christ.")
        : (content_en || "Saving souls holistically and bringing them to Jesus Christ.");

    return (
        <section className="py-24 bg-[#D90429] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mb-8 inline-block"
                    >
                        <Heart className="w-20 h-20 text-white" fill="white" />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight">
                        {valuesTitle}
                    </h2>
                    <div className="relative p-10 md:p-16">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/30" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white/30" />
                        <p className="text-2xl md:text-4xl text-white font-black leading-relaxed italic drop-shadow-md">
                            "{valuesText}"
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
