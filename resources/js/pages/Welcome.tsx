import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Activities from '@/components/Activities';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Location from '@/components/Location';
import Values from '@/components/Values';
import Mission from '@/components/Mission';
import Vision from '@/components/Vision';
import VerseRotator from '@/components/VerseRotator';
import News from '@/components/News';

interface Props {
    services: any[];
    galleryImages: any[];
    heroSlides: any[];
    bibleVerses: any[];
    teamMembers: any[];
    newsItems: any[];
    settings: Record<string, string>;
}

export default function Welcome({
    services,
    galleryImages,
    heroSlides,
    bibleVerses,
    teamMembers,
    newsItems,
    settings
}: Props) {
    // Background polling for "instant" updates
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['services', 'galleryImages', 'heroSlides', 'bibleVerses', 'teamMembers', 'newsItems', 'settings'],
                preserveScroll: true,
                preserveState: true
            });
        }, 60000); // every 60 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Accueil" />

            <Hero slides={heroSlides} />
            <VerseRotator verses={bibleVerses} />
            <About content_fr={settings.about_fr} content_en={settings.about_en} />
            <Activities services={services} />
            <News items={newsItems} />
            <Values content_fr={settings.values_fr} content_en={settings.values_en} />
            <Mission content_fr={settings.mission_fr} content_en={settings.mission_en} />
            <Vision content_fr={settings.vision_fr} content_en={settings.vision_en} />
            <Team members={teamMembers} />
            <Gallery images={galleryImages} />
            <Location
                email={settings.contact_email}
                phone={settings.contact_phone}
                address={settings.address}
            />
        </>
    );
}
