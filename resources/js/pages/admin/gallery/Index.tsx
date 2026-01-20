import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Gallery {
    id: number;
    image: string;
    title_fr: string | null;
    title_en: string | null;
    is_active: boolean;
}

interface Props {
    gallery: Gallery[];
}

export default function Index({ gallery }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
            destroy(route('gallery.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Galerie" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Galerie</h1>
                        <p className="text-gray-500 font-medium">Gérez la collection d'images de la communauté.</p>
                    </div>
                    <Link href={route('gallery.create')}>
                        <Button className="bg-[#D90429] hover:bg-[#B8032A] text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-[#D90429]/20 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Ajouter une Image
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest w-48">Image</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Titre</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Statut</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {gallery.map((item, index) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="w-40 h-24 rounded-2xl overflow-hidden shadow-md">
                                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-gray-900 block">{item.title_fr || 'Sans titre'}</span>
                                            <span className="text-gray-400 text-xs font-medium">{item.title_en || '-'}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.is_active ? 'Visible' : 'Masqué'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('gallery.edit', item.id)}>
                                                    <Button size="icon" variant="ghost" className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-50">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {gallery.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="inline-block p-6 bg-gray-50 rounded-[2rem] mb-4">
                                                <ImageIcon className="w-12 h-12 text-gray-300" />
                                            </div>
                                            <p className="text-gray-400 font-medium italic">Aucune image trouvée.</p>
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
