import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PublicLayout from '@/layouts/PublicLayout';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')).then((module: any) => {
        const page = module.default;
        if (page.layout === undefined && !name.startsWith('admin/')) {
            page.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
        }
        return page;
    }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#D90429',
        showSpinner: true,
        delay: 0,
    },
});
