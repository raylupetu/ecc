import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
    id: number;
    title: string | null;
    category: string | null;
    image: string;
}

interface Props {
    images?: GalleryImage[];
}

const defaultGalleryImages = [
    {
        url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Églises'
    },
    {
        url: 'https://images.pexels.com/photos/8468299/pexels-photo-8468299.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Cultes'
    },
    {
        url: 'https://images.pexels.com/photos/8422136/pexels-photo-8422136.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Éducation'
    },
    {
        url: 'https://images.pexels.com/photos/8923183/pexels-photo-8923183.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Jeunesse'
    },
    {
        url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Santé'
    },
    {
        url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Actions sociales'
    },
    {
        url: 'https://images.pexels.com/photos/7683893/pexels-photo-7683893.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Formations'
    },
    {
        url: 'https://images.pexels.com/photos/8468367/pexels-photo-8468367.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Séminaires'
    },
    {
        url: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Communauté'
    }
];

export default function Gallery({ images }: Props) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const displayImages = images && images.length > 0
        ? images.map(img => ({
            url: img.image,
            category: img.title || img.category || 'Galerie'
        }))
        : defaultGalleryImages;

    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImage]);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
                    >
                        Galerie photos
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-[#D90429] mx-auto rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {displayImages.map((image, index) => (
                        <motion.div
                            key={index}
                            layoutId={`img-${index}`}
                            onClick={() => setSelectedImage(index)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg aspect-square"
                        >
                            <img
                                src={image.url}
                                alt={image.category}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-8">
                                <p className="text-white font-bold text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.category}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white hover:text-[#D90429] transition-colors bg-white/10 p-3 rounded-full"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            layoutId={`img-${selectedImage}`}
                            src={displayImages[selectedImage].url}
                            alt={displayImages[selectedImage].category}
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
