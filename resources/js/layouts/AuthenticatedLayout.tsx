import { useState, PropsWithChildren, ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Church
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard') },
        { label: 'Activités', icon: FileText, href: route('services.index'), permission: 'manage_services' },
        { label: 'Actualités', icon: FileText, href: route('news.index'), permission: 'manage_news' },
        { label: 'Équipe', icon: Users, href: route('team.index'), permission: 'manage_team' },
        { label: 'Bannières Hero', icon: ImageIcon, href: route('hero-slides.index'), permission: 'manage_hero' },
        { label: 'Versets Bibliques', icon: Church, href: route('bible-verses.index'), permission: 'manage_bible' },
        { label: 'Galerie', icon: ImageIcon, href: route('gallery.index'), permission: 'manage_gallery' },
        { label: 'Utilisateurs', icon: Users, href: route('users.index'), permission: 'manage_users' },
        { label: 'Paramètres', icon: Settings, href: route('settings.index'), permission: 'manage_settings' },
    ];

    const filteredNavItems = navItems.filter(item =>
        !item.permission ||
        (auth?.user?.roles && auth.user.roles.includes('admin')) ||
        (auth?.user?.permissions && auth.user.permissions.includes(item.permission))
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-50 overflow-hidden shadow-2xl"
            >
                <div className="p-6 flex items-center justify-between overflow-hidden whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        {(usePage().props as any).settings?.logo ? (
                            <img src={(usePage().props as any).settings.logo} className="w-8 h-8 object-contain" alt="Logo" />
                        ) : (
                            <Church className="w-8 h-8 text-[#D90429] flex-shrink-0" />
                        )}
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="font-black text-xl tracking-tight"
                                >
                                    CLMK Admin
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = window.location.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all group relative ${isActive
                                    ? 'bg-[#D90429] text-white shadow-lg shadow-[#D90429]/20'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-6 h-6 flex-shrink-0" />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="font-bold whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[100]">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold"
                    >
                        <LogOut className="w-6 h-6 flex-shrink-0" />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="whitespace-nowrap"
                                >
                                    Déconnexion
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className="flex-1 transition-all duration-300 min-h-screen"
                style={{ marginLeft: isSidebarOpen ? 280 : 80 }}
            >
                <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="rounded-xl hover:bg-gray-100"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                        {!isSidebarOpen && (
                            <div className="flex items-center gap-2 animate-in fade-in duration-500">
                                {(usePage().props as any).settings?.logo ? (
                                    <img src={(usePage().props as any).settings.logo} className="w-8 h-8 object-contain" alt="Logo" />
                                ) : (
                                    <Church className="w-8 h-8 text-[#D90429]" />
                                )}
                                <span className="font-black text-lg tracking-tight hidden sm:block">CLMK</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="font-bold text-gray-900">{auth?.user?.name}</p>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-tighter">
                                    {auth?.user?.roles?.join(', ')}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-[#D90429]/10 rounded-xl flex items-center justify-center border border-[#D90429]/5">
                                <span className="font-black text-[#D90429] text-xl">
                                    {auth?.user?.name?.charAt(0)}
                                </span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-100 mx-2" />

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                            title="Déconnexion"
                        >
                            <LogOut className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </Link>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

declare function route(name: string, params?: any): string;
