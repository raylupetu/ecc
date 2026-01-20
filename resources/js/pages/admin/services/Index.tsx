import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
    id: number;
    title_fr: string;
    title_en: string;
    image: string | null;
    is_active: boolean;
}

interface Props {
    services: Service[];
}

export default function Index({ services }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
            destroy(route('services.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Activités & Services" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Activités & Services</h1>
                        <p className="text-gray-500 font-medium">Gérez les principales activités affichées sur le site.</p>
                    </div>
                    <Link href={route('services.create')}>
                        <Button className="bg-[#D90429] hover:bg-[#B8032A] text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-[#D90429]/20 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Nouvelle Activité
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Image</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Titre (FR)</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Titre (EN)</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Statut</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {services.map((service, index) => (
                                    <motion.tr
                                        key={service.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            {service.image ? (
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                                                    <img src={service.image} className="w-full h-full object-cover" alt="" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shadow-inner">
                                                    <ImageIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-gray-900">{service.title_fr}</span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">{service.title_en}</td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {service.is_active ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('services.edit', service.id)}>
                                                    <Button size="icon" variant="ghost" className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-50">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(service.id)}
                                                    className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {services.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="inline-block p-6 bg-gray-50 rounded-[2rem] mb-4">
                                                <FileText className="w-12 h-12 text-gray-300" />
                                            </div>
                                            <p className="text-gray-400 font-medium italic">Aucune activité trouvée.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

declare function route(name: string, params?: any): string;
