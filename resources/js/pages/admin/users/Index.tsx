import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, User, Mail, Shield, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserData {
    id: number;
    name: string;
    email: string;
    roles: { id: number, name: string }[];
}

interface Props {
    users: UserData[];
}

export default function Index({ users }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            destroy(route('users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Utilisateurs" />

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Utilisateurs</h1>
                        <p className="text-gray-500 font-medium">Gérez les accès et les rôles de l'administration.</p>
                    </div>
                    <Link href={route('users.create')}>
                        <Button className="bg-[#D90429] hover:bg-[#B8032A] text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-[#D90429]/20 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Nouvel Utilisateur
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Utilisateur</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Email</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Rôles</th>
                                    <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((u, index) => (
                                    <motion.tr
                                        key={u.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-[#D90429] shadow-inner">
                                                    <User className="w-6 h-6" />
                                                </div>
                                                <span className="font-bold text-gray-900">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">{u.email}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-wrap gap-2">
                                                {u.roles.map(role => (
                                                    <span
                                                        key={role.id}
                                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${role.name === 'admin'
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                    >
                                                        {role.name === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                                        {role.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('users.edit', u.id)}>
                                                    <Button size="icon" variant="ghost" className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-50">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(u.id)}
                                                    className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="inline-block p-6 bg-gray-50 rounded-[2rem] mb-4">
                                                <User className="w-12 h-12 text-gray-300" />
                                            </div>
                                            <p className="text-gray-400 font-medium italic">Aucun utilisateur trouvé.</p>
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

// Helper for route
declare function route(name: string, params?: any): string;
