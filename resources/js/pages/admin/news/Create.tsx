import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title_fr: '',
        title_en: '',
        content_fr: '',
        content_en: '',
        image: null as File | null,
        published_at: new Date().toISOString().split('T')[0],
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('news.store'));
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
            <Head title="Nouvel Article" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('news.index')}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Nouvel Article</h1>
                        <p className="text-gray-500 font-medium">Publiez une actualité ou un événement.</p>
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
                                        placeholder="Titre de l'article en français"
                                    />
                                    {errors.title_fr && <p className="text-red-500 text-xs font-bold">{errors.title_fr}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Contenu</Label>
                                    <Textarea
                                        value={data.content_fr}
                                        onChange={e => setData('content_fr', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] min-h-[200px]"
                                        placeholder="Corps de l'article en français"
                                    />
                                    {errors.content_fr && <p className="text-red-500 text-xs font-bold">{errors.content_fr}</p>}
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
                                        placeholder="Article title in English"
                                    />
                                    {errors.title_en && <p className="text-red-500 text-xs font-bold">{errors.title_en}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Content</Label>
                                    <Textarea
                                        value={data.content_en}
                                        onChange={e => setData('content_en', e.target.value)}
                                        className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] min-h-[200px]"
                                        placeholder="Article body in English"
                                    />
                                    {errors.content_en && <p className="text-red-500 text-xs font-bold">{errors.content_en}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Image & Date */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-900">Média & Publication</h2>
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
                                                    <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Choisir une image</span>
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
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Date de Publication</Label>
                                    <div className="relative">
                                        <Input
                                            type="date"
                                            value={data.published_at}
                                            onChange={e => setData('published_at', e.target.value)}
                                            className="rounded-xl border-gray-200 focus:ring-[#D90429] focus:border-[#D90429] pl-10"
                                        />
                                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                    {errors.published_at && <p className="text-red-500 text-xs font-bold">{errors.published_at}</p>}
                                    <p className="text-xs text-gray-400 font-medium">L'article sera visible dès la date sélectionnée.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('news.index')}>
                            <Button type="button" variant="ghost" className="font-bold px-8 rounded-2xl">Annuler</Button>
                        </Link>
                        <Button
                            disabled={processing}
                            className="bg-[#D90429] hover:bg-[#B8032A] text-white font-black py-6 px-12 rounded-2xl shadow-xl shadow-[#D90429]/20 flex items-center gap-3 transition-all hover:scale-105"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? 'Publication...' : 'Publier'}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

declare function route(name: string, params?: any): string;
