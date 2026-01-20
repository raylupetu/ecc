import { useState, FormEvent } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Church, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
    const { settings } = usePage().props as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
            <Head title="Connexion - Admin" />

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D90429] rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D90429] rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-[#D90429]/10 rounded-2xl mb-6">
                        {settings?.logo ? (
                            <img src={settings.logo} className="w-12 h-12 object-contain" alt="Logo" />
                        ) : (
                            <Church className="w-12 h-12 text-[#D90429]" />
                        )}
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Espace Administration</h1>
                    <p className="text-gray-500 mt-2 font-medium">Connectez-vous pour gérer le contenu</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D90429] transition-colors" />
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`pl-12 py-6 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Mot de passe</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#D90429] transition-colors" />
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`pl-12 py-6 rounded-2xl bg-gray-50 border-gray-100 focus:bg-white transition-all ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-[#D90429] focus:ring-[#D90429]"
                            />
                            <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Se souvenir de moi</span>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full py-7 rounded-2xl bg-[#D90429] hover:bg-[#B8032A] text-white font-black text-lg shadow-xl shadow-[#D90429]/20 transform hover:-translate-y-1 transition-all active:scale-[0.98]"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Connexion...
                            </>
                        ) : (
                            'Se connecter'
                        )}
                    </Button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-gray-400 text-sm font-medium italic">
                        Communauté ECC/24ème CLMK
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
