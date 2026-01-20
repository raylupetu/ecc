import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title_fr: '',
        title_en: '',
        image: null as File | null,
        is_active: true,
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('gallery.store'));
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
            <Head title="Ajouter à la Galerie" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('gallery.index')}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Ajouter une Image</h1>
                        <p className="text-gray-500 font-medium">Enrichissez la galerie de la communauté.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 space-y-10">
                        {/* Image Upload */}
                        <div className="space-y-6">
                            <Label className="font-bold text-gray-700">Image</Label>
                            <div className="relative group cursor-pointer aspect-video md:aspect-[21/9] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#D90429]/50">
                                {preview ? (
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <>
                                        <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
                                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest text-center px-4">Choisir une image haute résolution</span>
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

                        {/* Localized Titles */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-black text-[10px]">FR</div>
                                    <Label className="font-bold text-gray-700">Titre (Optionnel)</Label>
                                </div>
                                <Input
                                    value={data.title_fr}
                                    onChange={e => setData('title_fr', e.target.value)}
                                    className="rounded-xl border-gray-200"
                                    placeholder="Ex: Culte de dimanche"
                                />
                                {errors.title_fr && <p className="text-red-500 text-xs font-bold">{errors.title_fr}</p>}
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-red-100 text-[#D90429] rounded flex items-center justify-center font-black text-[10px]">EN</div>
                                    <Label className="font-bold text-gray-700">Title (Optional)</Label>
                                </div>
                                <Input
                                    value={data.title_en}
                                    onChange={e => setData('title_en', e.target.value)}
                                    className="rounded-xl border-gray-200"
                                    placeholder="Ex: Sunday Service"
                                />
                                {errors.title_en && <p className="text-red-500 text-xs font-bold">{errors.title_en}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={e => setData('is_active', e.target.checked)}
                                className="w-6 h-6 rounded-lg border-gray-200 text-[#D90429] focus:ring-[#D90429]"
                            />
                            <Label htmlFor="is_active" className="font-black text-gray-700 cursor-pointer">Image Visible dans la galerie</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('gallery.index')}>
                            <Button type="button" variant="ghost" className="font-bold px-8 rounded-2xl">Annuler</Button>
                        </Link>
                        <Button
                            disabled={processing}
                            className="bg-[#D90429] hover:bg-[#B8032A] text-white font-black py-6 px-12 rounded-2xl shadow-xl shadow-[#D90429]/20 flex items-center gap-3 transition-all hover:scale-105"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? 'Ajout...' : 'Ajouter à la Galerie'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

declare function route(name: string, params?: any): string;
