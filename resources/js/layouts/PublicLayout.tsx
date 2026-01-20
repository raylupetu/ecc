import { PropsWithChildren } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
