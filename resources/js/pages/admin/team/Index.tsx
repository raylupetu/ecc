import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, Image as ImageIcon, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
    id: number;
    name: string;
    role_fr: string;
    role_en: string;
    image: string | null;
    email: string | null;
    phone: string | null;
    order: number;
}

interface Props {
    members: TeamMember[];
}

export default function Index({ members }: Props) {

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
            router.delete(route('team.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Équipe Dirigeante" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Équipe Dirigeante</h1>
                        <p className="text-gray-500 font-medium">Gérez les membres de la direction et du personnel.</p>
                    </div>
                    <Link href={route('team.create')}>
                        <Button className="bg-[#D90429] hover:bg-[#B8032A] text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-[#D90429]/20 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Nouveau Membre
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Membre</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Rôle (FR/EN)</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Contact</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Ordre</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {members.map((member, index) => (
                                    <motion.tr
                                        key={member.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                {member.image ? (
                                                    <div className="w-28 h-36 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow border-2 border-gray-100">
                                                        <img src={member.image} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                ) : (
                                                    <div className="w-28 h-36 bg-gray-100 rounded-2xl flex items-center justify-center text-[#D90429] shadow-inner border-2 border-dashed border-gray-200">
                                                        <Users className="w-10 h-10 opacity-30" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="font-black text-gray-900 text-lg leading-tight">{member.name}</span>
                                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">ID #{member.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-gray-900 font-bold block">{member.role_fr}</span>
                                            <span className="text-gray-400 text-xs font-medium">{member.role_en}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                {member.email && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                        <Mail className="w-3 h-3 text-[#D90429]" />
                                                        {member.email}
                                                    </div>
                                                )}
                                                {member.phone && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                        <Phone className="w-3 h-3 text-[#D90429]" />
                                                        {member.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-black">
                                                #{member.order}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('team.edit', member.id)}>
                                                    <Button size="icon" variant="ghost" className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-50">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(member.id)}
                                                    className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {members.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="inline-block p-6 bg-gray-50 rounded-[2rem] mb-4">
                                                <Users className="w-12 h-12 text-gray-300" />
                                            </div>
                                            <p className="text-gray-400 font-medium italic">Aucun membre trouvé.</p>
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
