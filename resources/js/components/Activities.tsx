import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, GraduationCap, Briefcase, Heart, Users, X, ZoomIn } from "lucide-react";

interface Service {
    id: number;
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
    image: string | null;
    is_active: boolean;
}

interface Props {
    services?: Service[];
}

const defaultActivities = [
    {
        icon: Book,
        title: "Évangélisation et formation biblique",
        description: "Partager la Parole de Dieu et former des disciples",
        image: null,
    },
    {
        icon: GraduationCap,
        title: "Éducation préscolaire, secondaire et universitaire",
        description: "Former la jeunesse pour un avenir meilleur",
        image: null,
    },
    {
        icon: Briefcase,
        title: "Formation professionnelle et soins infirmiers",
        description: "Équiper avec des compétences pratiques et médicales",
        image: null,
    },
];

export default function Activities({ services }: Props) {
    const { locale } = usePage().props as any;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const activitiesTitle = locale === 'fr' ? 'Nos principales activités' : 'Our Main Activities';

    const items = services && services.length > 0
        ? services
            .filter(s => s.is_active)
            .map(s => ({
                title: locale === 'fr' ? s.title_fr : s.title_en,
                description: locale === 'fr' ? s.description_fr : s.description_en,
                image: s.image,
                icon: Users
            }))
        : defaultActivities.map(a => ({ ...a, icon: a.icon }));

    return (
        <section id="activities" className="py-24 bg-white relative overflow-hidden">
            {/* Background elements for depth */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-20 -left-20 w-[40rem] h-[40rem] bg-[#D90429] rounded-full blur-[100px]" />
                <div className="absolute bottom-20 -right-20 w-[40rem] h-[40rem] bg-blue-600 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter"
                    >
                        {activitiesTitle}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 160 }}
                        viewport={{ once: true }}
                        className="h-3 bg-[#D90429] mx-auto rounded-full shadow-xl shadow-[#D90429]/30"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {items.map((activity, index) => {
                        const Icon = (activity as any).icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group bg-white rounded-[3rem] shadow-2xl p-4 hover:shadow-3xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2"
                            >
                                <div className="relative mb-8 overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/3]">
                                    {activity.image ? (
                                        <>
                                            <img
                                                src={activity.image}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                                                alt={activity.title}
                                                onClick={() => setSelectedImage(activity.image)}
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
                                                onClick={() => setSelectedImage(activity.image)}
                                            >
                                                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-500">
                                                    <ZoomIn className="w-10 h-10" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#D90429]/5">
                                            <Icon className="w-20 h-20 text-[#D90429] opacity-20" />
                                        </div>
                                    )}
                                </div>

                                <div className="px-6 pb-8 flex-1">
                                    <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-[#D90429] transition-colors leading-tight tracking-tight">
                                        {activity.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-lg font-medium line-clamp-4">
                                        {activity.description}
                                    </p>
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
