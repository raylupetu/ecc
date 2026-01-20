import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Loader2, User as UserIcon, Mail, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Role {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    name: string;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    permissions: Permission[];
}

interface Props {
    user: UserData;
    roles: Role[];
    permissions: Permission[];
}

export default function Edit({ user, roles, permissions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        roles: user.roles.map(r => r.name),
        permissions: user.permissions.map(p => p.name),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.update', user.id));
    };

    const toggleRole = (roleName: string) => {
        setData('roles',
            data.roles.includes(roleName)
                ? data.roles.filter(r => r !== roleName)
                : [...data.roles, roleName]
        );
    };

    const togglePermission = (permissionName: string) => {
        setData('permissions',
            data.permissions.includes(permissionName)
                ? data.permissions.filter(p => p !== permissionName)
                : [...data.permissions, permissionName]
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Éditer - ${user.name}`} />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Link href={route('users.index')}>
                        <Button variant="ghost" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 rounded-xl font-bold">
                            <ChevronLeft className="w-5 h-5" />
                            Retour
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-10 border-b border-gray-50 bg-gray-50/30">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Modifier l'Utilisateur</h1>
                        <p className="text-gray-500 font-medium mt-1">Mettez à jour les informations du profil.</p>
                    </div>

                    <form onSubmit={submit} className="p-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Nom Complet</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all shadow-sm"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Email professionnel</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all shadow-sm"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100 space-y-6">
                            <div className="flex items-start gap-4">
                                <Lock className="w-6 h-6 text-amber-600 mt-1" />
                                <div>
                                    <p className="font-bold text-amber-900">Modification du mot de passe</p>
                                    <p className="text-sm text-amber-700">Laissez vide si vous ne souhaitez pas changer le mot de passe actuel.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                                    <Input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="rounded-2xl border-gray-100 py-6 bg-white focus:bg-white transition-all shadow-sm"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.password}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Confirmer nouveau mot de passe</label>
                                    <Input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="rounded-2xl border-gray-100 py-6 bg-white focus:bg-white transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Roles */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Rôles de sécurité</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {roles.map(role => (
                                    <div
                                        key={role.id}
                                        onClick={() => toggleRole(role.name)}
                                        className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-4 ${data.roles.includes(role.name)
                                            ? 'bg-[#D90429]/5 border-[#D90429] ring-4 ring-[#D90429]/10'
                                            : 'bg-white border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-2xl ${data.roles.includes(role.name) ? 'bg-[#D90429] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className={`font-black uppercase tracking-widest text-xs ${data.roles.includes(role.name) ? 'text-[#D90429]' : 'text-gray-400'}`}>Rôle</p>
                                            <p className="font-bold text-gray-900">{role.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.roles && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.roles}</p>}
                        </div>

                        {/* Permissions */}
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Permissions Spécifiques</label>
                            <p className="text-xs text-gray-500 mb-4 ml-1 italic">Ces permissions permettent un contrôle fin sur les modules, même au-delà des rôles.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {permissions.map(perm => (
                                    <div
                                        key={perm.id}
                                        onClick={() => togglePermission(perm.name)}
                                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${data.permissions.includes(perm.name)
                                            ? 'bg-blue-50 border-blue-200 shadow-sm'
                                            : 'bg-white border-gray-100 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className={`text-xs font-black uppercase tracking-tighter ${data.permissions.includes(perm.name) ? 'text-blue-700' : 'text-gray-500'}`}>
                                            {perm.name.replace('manage_', 'Gestion ')}
                                        </span>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name) ? 'bg-blue-600 border-blue-600' : 'border-gray-200'}`}>
                                            {data.permissions.includes(perm.name) && <div className="w-1.5 h-1.5 bg-white rounded-full animate-in zoom-in-50" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full py-8 bg-[#D90429] hover:bg-[#B8032A] text-white font-black text-xl rounded-2xl shadow-2xl shadow-[#D90429]/20 flex items-center justify-center gap-4 transform hover:-translate-y-1 transition-all active:scale-[0.98]"
                            >
                                {processing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                Enregistrer les modifications
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper for route
declare function route(name: string, params?: any): string;
