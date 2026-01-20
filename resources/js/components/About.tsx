import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Props {
    content_fr?: string;
    content_en?: string;
}

export default function About({ content_fr, content_en }: Props) {
    const { locale } = usePage().props as any;

    const aboutTitle = locale === 'fr' ? 'À Propos' : 'About Us';
    const aboutText = locale === 'fr'
        ? (content_fr || 'La Communauté Libre du Maniema Kivu (CLMK) œuvre en RDC depuis 1922.')
        : (content_en || 'The CLMK community has been active in DRC since 1922.');

    return (
        <section
            id="about"
            className="py-24 bg-gradient-to-b from-white to-gray-50"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="p-3 bg-[#D90429]/10 rounded-2xl">
                            <History className="w-10 h-10 text-[#D90429]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            {aboutTitle}
                        </h2>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-16 border border-gray-100">
                        <div className="prose prose-xl prose-gray max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed text-center mb-8 whitespace-pre-line">
                                {aboutText}
                            </p>
                        </div>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#D90429]/5 border-l-8 border-[#D90429] p-8 rounded-2xl"
                        >
                            <p className="text-xl text-gray-800 font-black leading-relaxed italic text-center">
                                {locale === 'fr' ? 'À Dieu seul soit la gloire.' : 'To God alone be the glory.'}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
