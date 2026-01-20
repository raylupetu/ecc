import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Quote, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        text_fr: '',
        text_en: '',
        reference_fr: '',
        reference_en: '',
        order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('bible-verses.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nouveau Verset Biblique" />

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href={route('bible-verses.index')}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Nouveau Verset</h1>
                        <p className="text-gray-500 font-medium">Ajoutez un verset pour la rotation sur le site.</p>
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
                                    <Label className="font-bold text-gray-700">Texte du Verset</Label>
                                    <Textarea
                                        value={data.text_fr}
                                        onChange={e => setData('text_fr', e.target.value)}
                                        className="rounded-xl border-gray-200 min-h-[100px]"
                                        placeholder="Ex: Car Dieu a tant aimé le monde..."
                                    />
                                    {errors.text_fr && <p className="text-red-500 text-xs font-bold">{errors.text_fr}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Référence</Label>
                                    <Input
                                        value={data.reference_fr}
                                        onChange={e => setData('reference_fr', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: Jean 3:16"
                                    />
                                    {errors.reference_fr && <p className="text-red-500 text-xs font-bold">{errors.reference_fr}</p>}
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
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Verse Text</Label>
                                    <Textarea
                                        value={data.text_en}
                                        onChange={e => setData('text_en', e.target.value)}
                                        className="rounded-xl border-gray-200 min-h-[100px]"
                                        placeholder="Ex: For God so loved the world..."
                                    />
                                    {errors.text_en && <p className="text-red-500 text-xs font-bold">{errors.text_en}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Reference</Label>
                                    <Input
                                        value={data.reference_en}
                                        onChange={e => setData('reference_en', e.target.value)}
                                        className="rounded-xl border-gray-200"
                                        placeholder="Ex: John 3:16"
                                    />
                                    {errors.reference_en && <p className="text-red-500 text-xs font-bold">{errors.reference_en}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-50" />

                        {/* Order */}
                        <div className="space-y-4">
                            <Label className="font-bold text-gray-700">Ordre d'affichage</Label>
                            <div className="relative max-w-xs">
                                <Input
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', parseInt(e.target.value))}
                                    className="rounded-xl border-gray-200 pl-10"
                                />
                                <Hash className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                            {errors.order && <p className="text-red-500 text-xs font-bold">{errors.order}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href={route('bible-verses.index')}>
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
