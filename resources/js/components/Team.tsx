import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, X, ZoomIn } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { handleGmailClick, encodeEmail } from '@/lib/mailUtils';

const defaultMembers = [
    {
        name: 'Rév. Pasteur Emmanuel Mutanda',
        role_fr: 'Président Communautaire',
        role_en: 'Community President',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        email: 'president@ecc24clmk.org',
        phone: '+243 123 456 789'
    }
];

export default function Team({ members: dbMembers }: { members?: any[] }) {
    const { locale } = usePage().props as any;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const teamTitle = locale === 'fr' ? 'Notre équipe dirigeante' : 'Our Leadership Team';
    const members = (dbMembers && dbMembers.length > 0) ? dbMembers : defaultMembers;

    return (
        <section id="team" className="py-24 bg-white relative overflow-hidden">
            {/* Background elements for depth */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-40 -right-20 w-[45rem] h-[45rem] bg-[#D90429] rounded-full blur-[120px]" />
                <div className="absolute bottom-40 -left-20 w-[45rem] h-[45rem] bg-blue-600 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter"
                    >
                        {teamTitle}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 160 }}
                        viewport={{ once: true }}
                        className="h-3 bg-[#D90429] mx-auto rounded-full shadow-xl shadow-[#D90429]/30"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {members.map((member, index) => {
                        const memberImage = member.image || '/images/team-placeholder.jpg';
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group bg-white rounded-[3rem] shadow-2xl p-4 hover:shadow-3xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50/30"
                            >
                                <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-gray-100 aspect-square w-48 h-48 mx-auto shadow-inner">
                                    <img
                                        src={memberImage}
                                        alt={member.name}
                                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                                        loading="lazy"
                                        onClick={() => setSelectedImage(memberImage)}
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
                                        onClick={() => setSelectedImage(memberImage)}
                                    >
                                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-500">
                                            <ZoomIn className="w-10 h-10" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                </div>

                                <div className="px-6 pb-8 flex-1 flex flex-col items-center text-center">
                                    <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-[#D90429] transition-colors leading-tight tracking-tight">
                                        {member.name}
                                    </h3>
                                    <p className="text-[#D90429] font-black text-xs mb-6 uppercase tracking-wider">
                                        {locale === 'fr' ? member.role_fr : member.role_en}
                                    </p>

                                    <div className="flex flex-col items-center space-y-3 mt-auto w-full">
                                        {member.email && (
                                            <a
                                                href="#"
                                                onClick={(e) => handleGmailClick(e, encodeEmail(member.email))}
                                                className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#D90429] transition-all font-black group/link w-full"
                                            >
                                                <div className="p-2.5 bg-gray-100/50 rounded-2xl group-hover/link:bg-[#D90429] group-hover/link:text-white transition-all shadow-sm">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs tracking-tight truncate max-w-full">{member.email}</span>
                                            </a>
                                        )}
                                        {member.phone && (
                                            <a
                                                href={`tel:${member.phone}`}
                                                className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#D90429] transition-all font-black group/link w-full"
                                            >
                                                <div className="p-2.5 bg-gray-100/50 rounded-2xl group-hover/link:bg-[#D90429] group-hover/link:text-white transition-all shadow-sm">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs tracking-tight">{member.phone}</span>
                                            </a>
                                        )}
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
                            className="relative max-w-4xl w-full h-[85vh] flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border border-white/10"
                                alt="Membre de l'équipe"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
