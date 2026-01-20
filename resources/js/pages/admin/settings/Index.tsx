import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Save, Loader2, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, BookOpen, Target, Eye, Heart, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Props {
    settings: Record<string, string>;
}

export default function Index({ settings }: Props) {
    const { data, setData, post, processing } = useForm({
        site_name: settings.site_name || 'ECC/24ème CLMK',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        address: settings.address || '',
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        instagram_url: settings.instagram_url || '',
        youtube_url: settings.youtube_url || '',
        // New content settings
        about_fr: settings.about_fr || '',
        about_en: settings.about_en || '',
        mission_fr: settings.mission_fr || '',
        mission_en: settings.mission_en || '',
        vision_fr: settings.vision_fr || '',
        vision_en: settings.vision_en || '',
        values_fr: settings.values_fr || '',
        values_en: settings.values_en || '',
        logo: null as File | null,
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo || null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.update'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Paramètres du site" />

            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Paramètres Généraux</h1>
                    <p className="text-gray-500 font-medium">Configurez les informations globales de votre application.</p>
                </div>

                <form onSubmit={submit} className="space-y-8 pb-20">
                    {/* Information de contact */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Coordonnées</h2>
                        </div>
                        <div className="p-10 space-y-8">
                            {/* Logo Upload Section */}
                            <div className="flex flex-col md:flex-row items-start gap-8 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                                <div className="space-y-2">
                                    <Label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Logo du Site</Label>
                                    <div className="relative w-32 h-32 bg-white rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                                        {logoPreview ? (
                                            <img src={logoPreview} className="w-full h-full object-contain p-2" alt="Logo preview" />
                                        ) : (
                                            <ImageIcon className="w-10 h-10 text-gray-300" />
                                        )}
                                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                            <Upload className="w-6 h-6 text-white" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData('logo', file);
                                                        setLogoPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2 pt-8">
                                    <p className="text-sm text-gray-500 font-medium">Recommandé : Format PNG ou SVG avec fond transparent.</p>
                                    <p className="text-xs text-gray-400">Ce logo sera affiché sur le site public, l'administration et la page de connexion.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Nom du Site</label>
                                    <Input
                                        value={data.site_name}
                                        onChange={e => setData('site_name', e.target.value)}
                                        className="rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Email de contact</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            value={data.contact_email}
                                            onChange={e => setData('contact_email', e.target.value)}
                                            className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            value={data.contact_phone}
                                            onChange={e => setData('contact_phone', e.target.value)}
                                            className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Adresse Physique</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Réseaux Sociaux */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
                            <div className="p-3 bg-red-100 text-[#D90429] rounded-2xl">
                                <Facebook className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Réseaux Sociaux</h2>
                        </div>
                        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Facebook</label>
                                <div className="relative">
                                    <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        value={data.facebook_url}
                                        onChange={e => setData('facebook_url', e.target.value)}
                                        className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Instagram</label>
                                <div className="relative">
                                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        value={data.instagram_url}
                                        onChange={e => setData('instagram_url', e.target.value)}
                                        className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">X (Twitter)</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 flex items-center justify-center">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>
                                    <Input
                                        value={data.twitter_url}
                                        onChange={e => setData('twitter_url', e.target.value)}
                                        className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        placeholder="https://x.com/..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black text-gray-700 uppercase tracking-widest ml-1">YouTube</label>
                                <div className="relative">
                                    <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        value={data.youtube_url}
                                        onChange={e => setData('youtube_url', e.target.value)}
                                        className="pl-12 rounded-2xl border-gray-100 py-6 bg-gray-50 focus:bg-white transition-all"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* À Propos & Mission */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">À Propos & Mission</h2>
                        </div>
                        <div className="p-10 space-y-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">À Propos (FR)</Label>
                                    <Textarea
                                        value={data.about_fr}
                                        onChange={e => setData('about_fr', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[150px]"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">About (EN)</Label>
                                    <Textarea
                                        value={data.about_en}
                                        onChange={e => setData('about_en', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[150px]"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">Mission (FR)</Label>
                                    <Textarea
                                        value={data.mission_fr}
                                        onChange={e => setData('mission_fr', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">Mission (EN)</Label>
                                    <Textarea
                                        value={data.mission_en}
                                        onChange={e => setData('mission_en', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vision & Valeurs */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Vision & Valeurs</h2>
                        </div>
                        <div className="p-10 space-y-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">Vision (FR)</Label>
                                    <Textarea
                                        value={data.vision_fr}
                                        onChange={e => setData('vision_fr', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">Vision (EN)</Label>
                                    <Textarea
                                        value={data.vision_en}
                                        onChange={e => setData('vision_en', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[100px]"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">Valeurs (FR)</Label>
                                    <Textarea
                                        value={data.values_fr}
                                        onChange={e => setData('values_fr', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Label className="font-black text-gray-700 uppercase tracking-widest text-[10px]">Values (EN)</Label>
                                    <Textarea
                                        value={data.values_en}
                                        onChange={e => setData('values_en', e.target.value)}
                                        className="rounded-2xl border-gray-100 min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-inner">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="py-8 px-12 bg-[#D90429] hover:bg-[#B8032A] text-white font-black text-xl rounded-2xl shadow-2xl shadow-[#D90429]/20 flex items-center gap-4 transform hover:-translate-y-1 transition-all active:scale-[0.98]"
                        >
                            {processing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                            Sauvegarder les paramètres
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper for route
declare function route(name: string, params?: any): string;
