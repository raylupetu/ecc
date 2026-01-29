import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Service {
    id: number;
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    image: string | null;
    is_active: boolean;
}

interface Props {
    service: Service;
}

export default function Edit({ service }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title_fr: service.title_fr,
        title_en: service.title_en,
        description_fr: service.description_fr,
        description_en: service.description_en,
        image: null as File | null,
        is_active: service.is_active,
    });

    const [preview, setPreview] = useState<string | null>(service.image);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('services.update', service.id), {
            forceFormData: true,
            preserveScroll: true,
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
            <Head title={`Modifier ${service.title_fr}`} />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('services.index')}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Modifier L'Activité</h1>
                        <p className="text-gray-500 font-medium">{service.title_fr}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 space-y-10">
                        {/* Section Francaise */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-black text-xs">FR</div>
                                <h2 className="text-xl font-black text-gray-900">Version Française</h2>
                            </div>
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Titre</Label>
                                    <Input
                                        value={data.title_fr}
                                        onChange={e => setData('title_fr', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429]"
                                        placeholder="Titre de l'activité en français"
                                    />
                                    {errors.title_fr && <p className="text-red-500 text-xs font-bold">{errors.title_fr}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Description</Label>
                                    <Textarea
                                        value={data.description_fr}
                                        onChange={e => setData('description_fr', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] min-h-[120px]"
                                        placeholder="Description détaillée en français"
                                    />
                                    {errors.description_fr && <p className="text-red-500 text-xs font-bold">{errors.description_fr}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section Anglaise */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-100 text-[#D90429] rounded-lg flex items-center justify-center font-black text-xs">EN</div>
                                <h2 className="text-xl font-black text-gray-900">English Version</h2>
                            </div>
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Title</Label>
                                    <Input
                                        value={data.title_en}
                                        onChange={e => setData('title_en', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429]"
                                        placeholder="Activity title in English"
                                    />
                                    {errors.title_en && <p className="text-red-500 text-xs font-bold">{errors.title_en}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Description</Label>
                                    <Textarea
                                        value={data.description_en}
                                        onChange={e => setData('description_en', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] min-h-[120px]"
                                        placeholder="Detailed description in English"
                                    />
                                    {errors.description_en && <p className="text-red-500 text-xs font-bold">{errors.description_en}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Image Upload */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900">Média & Paramètres</h2>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <Label className="font-bold text-gray-700">Image de couverture</Label>
                                    <div className="relative group cursor-pointer">
                                        <div className="aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-[#D90429]/50">
                                            {preview ? (
                                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
                                                    <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Changer l'image</span>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </div>
                                    {errors.image && <p className="text-red-500 text-xs font-bold">{errors.image}</p>}
                                </div>
                                <div className="flex items-center gap-4 self-end pb-4">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-6 h-6 rounded-lg border-gray-200 text-[#D90429] focus:ring-[#D90429]"
                                    />
                                    <Label htmlFor="is_active" className="font-black text-gray-700 cursor-pointer">Activity Active (Visible sur le site)</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('services.index')}>
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
