import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon, Mail, Phone, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role_fr: '',
        role_en: '',
        bio_fr: '',
        bio_en: '',
        email: '',
        phone: '',
        image: null as File | null,
        order: 0,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('team.store'));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nouveau Membre" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('team.index')}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Nouveau Membre</h1>
                        <p className="text-gray-500 font-medium">Ajoutez un membre à l'équipe dirigeante.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 space-y-10">
                        {/* Infos de Base */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900 border-l-4 border-[#D90429] pl-4">Informations Générales</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Nom Complet</Label>
                                    <Input
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429]"
                                        placeholder="Ex: Rév. Pasteur John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Ordre d'affichage</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={data.order}
                                            onChange={e => setData('order', parseInt(e.target.value))}
                                            className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] pl-10"
                                        />
                                        <Hash className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.order && <p className="text-red-500 text-xs font-bold">{errors.order}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Rôles Localisés */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-black text-[10px]">FR</div>
                                    <Label className="font-bold text-gray-700">Rôle (FR)</Label>
                                </div>
                                <Input
                                    value={data.role_fr}
                                    onChange={e => setData('role_fr', e.target.value)}
                                    className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429]"
                                    placeholder="Ex: Président Communautaire"
                                />
                                {errors.role_fr && <p className="text-red-500 text-xs font-bold">{errors.role_fr}</p>}
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-red-100 text-[#D90429] rounded flex items-center justify-center font-black text-[10px]">EN</div>
                                    <Label className="font-bold text-gray-700">Role (EN)</Label>
                                </div>
                                <Input
                                    value={data.role_en}
                                    onChange={e => setData('role_en', e.target.value)}
                                    className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429]"
                                    placeholder="Ex: Community President"
                                />
                                {errors.role_en && <p className="text-red-500 text-xs font-bold">{errors.role_en}</p>}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900 border-l-4 border-[#D90429] pl-4">Contact</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Email</Label>
                                    <div className="relative">
                                        <Input
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] pl-10"
                                            placeholder="email@ecc24clmk.org"
                                        />
                                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Téléphone</Label>
                                    <div className="relative">
                                        <Input
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] pl-10"
                                            placeholder="+243 ..."
                                        />
                                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900 border-l-4 border-[#D90429] pl-4">Photo</h2>
                            <div className="max-w-xs">
                                <div className="relative group cursor-pointer aspect-[3/4] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#D90429]/50">
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
                                            <span className="text-sm text-gray-400 font-bold uppercase tracking-widest text-center px-4">Choisir une photo</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                                {errors.image && <p className="text-red-500 text-xs font-bold mt-2">{errors.image}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('team.index')}>
                            <Button type="button" variant="ghost" className="font-bold px-8 rounded-2xl">Annuler</Button>
                        </Link>
                        <Button
                            disabled={processing}
                            className="bg-[#D90429] hover:bg-[#B8032A] text-white font-black py-6 px-12 rounded-2xl shadow-xl shadow-[#D90429]/20 flex items-center gap-3 transition-all hover:scale-105"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

declare function route(name: string, params?: any): string;
