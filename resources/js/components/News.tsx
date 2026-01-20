import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

export default function News({ items }: { items?: any[] }) {
    const { locale } = usePage().props as any;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const newsTitle = locale === 'fr' ? 'Actualités & Événements' : 'News & Events';
    const readMore = locale === 'fr' ? 'Lire plus' : 'Read more';

    if (!items || items.length === 0) return null;

    return (
        <section id="news" className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter"
                    >
                        {newsTitle}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 160 }}
                        viewport={{ once: true }}
                        className="h-3 bg-[#D90429] mx-auto rounded-full shadow-xl shadow-[#D90429]/30"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {items.map((item, index) => {
                        const title = locale === 'fr' ? item.title_fr : item.title_en;
                        const content = locale === 'fr' ? item.content_fr : item.content_en;
                        const date = new Date(item.published_at || item.created_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                        const itemImage = item.image || '/images/news-placeholder.jpg';

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-[3rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2"
                            >
                                <div className="relative overflow-hidden h-72 cursor-zoom-in">
                                    <img
                                        src={itemImage}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onClick={() => setSelectedImage(itemImage)}
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        onClick={() => setSelectedImage(itemImage)}
                                    >
                                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-500">
                                            <ZoomIn className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/90 font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 pointer-events-none">
                                        <Calendar className="w-4 h-4 text-[#D90429]" />
                                        <span className="text-sm uppercase tracking-tighter">{date}</span>
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#D90429] transition-colors leading-tight">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed font-medium line-clamp-3">
                                        {content}
                                    </p>
                                    <div className="mt-auto">
                                        <Button variant="ghost" className="p-0 h-auto flex items-center gap-3 text-[#D90429] font-black group-hover:gap-5 transition-all bg-transparent hover:bg-transparent hover:text-[#B8032A]">
                                            {readMore}
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-8 right-8 text-white hover:text-[#D90429] transition-colors p-4 bg-white/10 rounded-full border border-white/20 z-[110]"
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative max-w-6xl w-full h-[80vh] flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border border-white/10"
                                alt="Agrandissement"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
