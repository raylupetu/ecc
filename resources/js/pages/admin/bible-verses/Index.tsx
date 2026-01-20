import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Church, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BibleVerse {
    id: number;
    text_fr: string;
    text_en: string;
    reference_fr: string;
    reference_en: string;
    order: number;
}

interface Props {
    verses: BibleVerse[];
}

export default function Index({ verses }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce verset ?')) {
            destroy(route('bible-verses.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Versets Bibliques" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Versets Bibliques</h1>
                        <p className="text-gray-500 font-medium">Gérez les versets qui s'affichent en rotation sur le site.</p>
                    </div>
                    <Link href={route('bible-verses.create')}>
                        <Button className="bg-[#D90429] hover:bg-[#B8032A] text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-[#D90429]/20 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Nouveau Verset
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest w-16">#</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Contenu (FR/EN)</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Référence</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {verses.map((verse, index) => (
                                    <motion.tr
                                        key={verse.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                                <Quote className="w-5 h-5" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-gray-900 font-bold mb-1 line-clamp-2">"{verse.text_fr}"</p>
                                            <p className="text-gray-400 text-xs font-medium line-clamp-1 italic">"{verse.text_en}"</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-[#D90429] uppercase tracking-wider text-xs">
                                                {verse.reference_fr}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('bible-verses.edit', verse.id)}>
                                                    <Button size="icon" variant="ghost" className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-50">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(verse.id)}
                                                    className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {verses.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="inline-block p-6 bg-gray-50 rounded-[2rem] mb-4">
                                                <Church className="w-12 h-12 text-gray-300" />
                                            </div>
                                            <p className="text-gray-400 font-medium italic">Aucun verset trouvé.</p>
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
