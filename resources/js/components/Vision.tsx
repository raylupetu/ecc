import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Props {
    content_fr?: string;
    content_en?: string;
}

export default function Vision({ content_fr, content_en }: Props) {
    const { locale } = usePage().props as any;

    const visionTitle = locale === 'fr' ? 'Notre vision' : 'Our Vision';
    const visionText = locale === 'fr'
        ? (content_fr || "Promouvoir une vie chrétienne active et solidaire.")
        : (content_en || "Promoting an active and united Christian life.");

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row-reverse items-center gap-10"
                    >
                        <div className="w-28 h-28 bg-[#D90429]/10 rounded-[2.5rem] flex items-center justify-center flex-shrink-0 shadow-xl border border-[#D90429]/5 -rotate-6">
                            <Eye className="w-14 h-14 text-[#D90429]" />
                        </div>
                        <div className="text-right">
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter">
                                {visionTitle}
                            </h2>
                            <div className="bg-gradient-to-bl from-white to-gray-50 rounded-[3rem] shadow-2xl p-10 md:p-16 border-r-[12px] border-[#D90429] hover:shadow-[#D90429]/10 transition-shadow duration-500">
                                <p className="text-2xl text-gray-700 leading-relaxed font-black">
                                    {visionText}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
