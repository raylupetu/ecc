import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, Users, MessageSquare, ChevronRight } from 'lucide-react';

interface Props {
    stats: {
        services_count: number;
        gallery_count: number;
        users_count: number;
    };
}

export default function Dashboard({ stats: serverStats }: Props) {
    const stats = [
        { label: 'Activités', value: (serverStats?.services_count ?? 0).toString(), icon: FileText, color: 'bg-blue-500' },
        { label: 'Images', value: (serverStats?.gallery_count ?? 0).toString(), icon: ImageIcon, color: 'bg-purple-500' },
        { label: 'Utilisateurs', value: (serverStats?.users_count ?? 0).toString(), icon: Users, color: 'bg-green-500' },
        { label: 'Messages', value: '0', icon: MessageSquare, color: 'bg-orange-500' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Vue d'ensemble</h1>
                    <p className="text-gray-500 font-medium">Bienvenue dans votre espace d'administration.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-6 group hover:shadow-2xl transition-all"
                            >
                                <div className={`w-16 h-16 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-6">Activités Récentes</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900">Nouvelle activité publiée</p>
                                        <p className="text-xs text-gray-500 font-medium">Il y a 2 heures</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-6">Aperçu du site</h2>
                        <div className="aspect-video bg-gray-100 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#D90429]/10 flex items-center justify-center">
                                <Link href="/" className="px-8 py-3 bg-white text-[#D90429] rounded-full font-black shadow-xl transform group-hover:scale-105 transition-transform">
                                    Voir le site
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
