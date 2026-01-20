import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Props {
    content_fr?: string;
    content_en?: string;
}

export default function Mission({ content_fr, content_en }: Props) {
    const { locale } = usePage().props as any;

    const missionTitle = locale === 'fr' ? 'Notre mission' : 'Our Mission';
    const missionText = locale === 'fr'
        ? (content_fr || "Partager l'amour de Dieu, sauver les âmes et améliorer la vie des démunis.")
        : (content_en || "Sharing God's love, saving souls and improving the lives of the needy.");

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center gap-10"
                    >
                        <div className="w-28 h-28 bg-[#D90429]/10 rounded-[2.5rem] flex items-center justify-center flex-shrink-0 shadow-xl border border-[#D90429]/5 rotate-6">
                            <Target className="w-14 h-14 text-[#D90429]" />
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter">
                                {missionTitle}
                            </h2>
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-[3rem] shadow-2xl p-10 md:p-16 border-l-[12px] border-[#D90429] hover:shadow-[#D90429]/10 transition-shadow duration-500">
                                <p className="text-2xl text-gray-700 leading-relaxed font-black">
                                    {missionText}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
