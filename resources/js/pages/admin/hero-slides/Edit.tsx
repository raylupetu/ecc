import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface HeroSlide {
    id: number;
    title_fr: string;
    title_en: string;
    subtitle_fr: string;
    subtitle_en: string;
    button_text_fr: string;
    button_text_en: string;
    button_url: string;
    image: string;
    order: number;
}

interface Props {
    slide: HeroSlide;
}

export default function Edit({ slide }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_fr: slide.title_fr,
        title_en: slide.title_en,
        subtitle_fr: slide.subtitle_fr,
        subtitle_en: slide.subtitle_en,
        button_text_fr: slide.button_text_fr,
        button_text_en: slide.button_text_en,
        button_url: slide.button_url,
        image: null as File | null,
        order: slide.order,
    });

    const [preview, setPreview] = useState<string | null>(slide.image);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('hero-slides.update', slide.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Clear state if needed or show feedback
            },
        });
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
            <Head title={`Modifier Bannière ${slide.id}`} />

            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('hero-slides.index')}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Modifier Bannière Hero</h1>
                        <p className="text-gray-500 font-medium">Mise à jour du slide d'accueil.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 space-y-12">
                        {/* Section Francaise */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-black text-xs">FR</div>
                                <h2 className="text-xl font-black text-gray-900">Version Française</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Titre</Label>
                                    <Input
                                        value={data.title_fr}
                                        onChange={e => setData('title_fr', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: Bienvenue à la CLMK"
                                    />
                                    {errors.title_fr && <p className="text-red-500 text-xs font-bold">{errors.title_fr}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Sous-titre</Label>
                                    <Input
                                        value={data.subtitle_fr}
                                        onChange={e => setData('subtitle_fr', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: Une communauté au service de Dieu"
                                    />
                                    {errors.subtitle_fr && <p className="text-red-500 text-xs font-bold">{errors.subtitle_fr}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Texte du Bouton</Label>
                                    <Input
                                        value={data.button_text_fr}
                                        onChange={e => setData('button_text_fr', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: En savoir plus"
                                    />
                                    {errors.button_text_fr && <p className="text-red-500 text-xs font-bold">{errors.button_text_fr}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-50" />

                        {/* Section Anglaise */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-100 text-[#D90429] rounded-lg flex items-center justify-center font-black text-xs">EN</div>
                                <h2 className="text-xl font-black text-gray-900">English Version</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Title</Label>
                                    <Input
                                        value={data.title_en}
                                        onChange={e => setData('title_en', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: Welcome to CLMK"
                                    />
                                    {errors.title_en && <p className="text-red-500 text-xs font-bold">{errors.title_en}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Subtitle</Label>
                                    <Input
                                        value={data.subtitle_en}
                                        onChange={e => setData('subtitle_en', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: A community serving God"
                                    />
                                    {errors.subtitle_en && <p className="text-red-500 text-xs font-bold">{errors.subtitle_en}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Button Text</Label>
                                    <Input
                                        value={data.button_text_en}
                                        onChange={e => setData('button_text_en', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: Read More"
                                    />
                                    {errors.button_text_en && <p className="text-red-500 text-xs font-bold">{errors.button_text_en}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-50" />

                        {/* General Config */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-black text-gray-900">Configuration & Média</h2>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="font-bold text-gray-700">URL du Bouton (Lien)</Label>
                                        <div className="relative">
                                            <Input
                                                value={data.button_url}
                                                onChange={e => setData('button_url', e.target.value)}
                                                className="rounded-xl border-gray-200 pl-10"
                                                placeholder="Ex: /activites ou https://..."
                                            />
                                            <LinkIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                        {errors.button_url && <p className="text-red-500 text-xs font-bold">{errors.button_url}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-gray-700">Ordre d'affichage</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={data.order}
                                                onChange={e => setData('order', e.target.value ? parseInt(e.target.value) : 0)}
                                                className="rounded-xl border-gray-200 pl-10"
                                            />
                                            <Hash className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                        {errors.order && <p className="text-red-500 text-xs font-bold">{errors.order}</p>}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-bold text-gray-700">Image de fond</Label>
                                    <div className="relative group cursor-pointer aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#D90429]/50">
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <>
                                                <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
                                                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Changer l'image</span>
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
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('hero-slides.index')}>
                            <Button type="button" variant="ghost" className="font-bold px-8 rounded-2xl">Annuler</Button>
                        </Link>
                        <Button
                            disabled={processing}
                            className="bg-[#D90429] hover:bg-[#B8032A] text-white font-black py-6 px-12 rounded-2xl shadow-xl shadow-[#D90429]/20 flex items-center gap-3 transition-all hover:scale-105"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? 'Enregistrement...' : 'Mettre à jour'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

declare function route(name: string, params?: any): string;
