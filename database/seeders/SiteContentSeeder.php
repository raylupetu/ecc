<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample Services
        \App\Models\Service::create([
            'title_en' => 'Evangelism and Biblical Training',
            'title_fr' => 'Évangélisation et formation biblique',
            'description_en' => 'Sharing the Word of God and training disciples through robust biblical education and community outreach.',
            'description_fr' => 'Partager la Parole de Dieu et former des disciples à travers une éducation biblique solide et des actions communautaires.',
            'is_active' => true,
        ]);

        \App\Models\Service::create([
            'title_en' => 'Youth Education',
            'title_fr' => 'Éducation de la Jeunesse',
            'description_en' => 'Providing quality education and moral guidance to empower the next generation for a brighter future.',
            'description_fr' => 'Fournir une éducation de qualité et une orientation morale pour autonomiser la prochaine génération pour un avenir meilleur.',
            'is_active' => true,
        ]);

        \App\Models\Service::create([
            'title_en' => 'Social Work & Development',
            'title_fr' => 'Œuvres Sociales et Développement',
            'description_en' => 'Supporting vulnerable communities with healthcare, clean water, and sustainable development projects.',
            'description_fr' => 'Soutenir les communautés vulnérables avec des soins de santé, de l\'eau potable et des projets de développement durable.',
            'is_active' => true,
        ]);

        // Sample Team Members
        \App\Models\TeamMember::create([
            'name' => 'Révérend Dr. Samuel Balagizi',
            'role_fr' => 'Représentant Légal',
            'role_en' => 'Legal Representative',
            'image' => null,
            'bio_fr' => 'Un leader dévoué avec plus de 30 ans de service.',
            'bio_en' => 'A dedicated leader with over 30 years of service.',
            'order' => 1,
        ]);

        \App\Models\TeamMember::create([
            'name' => 'Maman Sarah Nabintu',
            'role_fr' => 'Présidente des Femmes',
            'role_en' => 'Women\'s President',
            'image' => null,
            'bio_fr' => 'Engagée dans l\'autonomisation des femmes et l\'éducation.',
            'bio_en' => 'Committed to women\'s empowerment and education.',
            'order' => 2,
        ]);

        // Sample News Items
        \App\Models\NewsItem::create([
            'title_fr' => 'Grande Conférence annuelle 2026',
            'title_en' => 'Annual Great Conference 2026',
            'content_fr' => 'Nous vous invitons tous à participer à notre conférence annuelle qui se tiendra à Bukavu.',
            'content_en' => 'We invite you all to participate in our annual conference to be held in Bukavu.',
            'published_at' => now(),
        ]);

        // Sample Hero Slides
        \App\Models\HeroSlide::create([
            'image' => 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop',
            'title_fr' => 'Bienvenue à la 24ème CLMK',
            'title_en' => 'Welcome to the 24th CLMK',
            'subtitle_fr' => 'Une communauté de foi et d\'espoir au Sud-Kivu.',
            'subtitle_en' => 'A community of faith and hope in South Kivu.',
            'button_text_fr' => 'En savoir plus',
            'button_text_en' => 'Learn More',
            'button_url' => '#about',
            'order' => 1,
        ]);

        \App\Models\HeroSlide::create([
            'image' => 'https://images.unsplash.com/photo-1544427928-c49cdfebf194?q=80&w=2066&auto=format&fit=crop',
            'title_fr' => 'Servir Dieu ensemble',
            'title_en' => 'Serving God Together',
            'subtitle_fr' => 'Rejoignez nos activités et grandissez spirituellement.',
            'subtitle_en' => 'Join our activities and grow spiritually.',
            'button_text_fr' => 'Voir nos activités',
            'button_text_en' => 'View Activities',
            'button_url' => '#activities',
            'order' => 2,
        ]);

        // Sample Bible Verses
        \App\Models\BibleVerse::create([
            'text_fr' => 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique...',
            'text_en' => 'For God so loved the world that he gave his only Son...',
            'reference_fr' => 'Jean 3:16',
            'reference_en' => 'John 3:16',
            'order' => 1,
        ]);

        \App\Models\BibleVerse::create([
            'text_fr' => 'Je puis tout par celui qui me fortifie.',
            'text_en' => 'I can do all things through him who strengthens me.',
            'reference_fr' => 'Philippiens 4:13',
            'reference_en' => 'Philippians 4:13',
            'order' => 2,
        ]);

        // Sample Settings
        $settings = [
            'site_name' => 'ECC/24ème CLMK',
            'contact_email' => 'contact@ecc24clmk.org',
            'contact_phone' => '+243 999 123 456',
            'address' => '24ème CLMK – ECC, Bukavu, Sud-Kivu, RDC',
            'facebook_url' => 'https://facebook.com/ecc24clmk',
            'twitter_url' => 'https://twitter.com/ecc24clmk',
            'instagram_url' => 'https://instagram.com/ecc24clmk',
            'youtube_url' => 'https://youtube.com/ecc24clmk',
            'linkedin_url' => 'https://linkedin.com/company/ecc24clmk',
            'about_fr' => 'La 24ème Communauté CLMK de l\'Église du Christ au Congo (ECC) se consacre à la propagation de l\'Évangile et au service de l\'humanité depuis 1922.',
            'about_en' => 'The 24th CLMK Community of the Church of Christ in Congo (ECC) is dedicated to spreading the Gospel and serving humanity since 1922.',
            'mission_fr' => 'Faire de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit.',
            'mission_en' => 'To make disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit.',
            'vision_fr' => 'Une communauté transfigurée vivant l\'amour du Christ dans toutes ses dimensions.',
            'vision_en' => 'A transfigured community living the love of Christ in all its dimensions.',
            'values_fr' => 'Foi, Amour, Intégrité, Service, Unité',
            'values_en' => 'Faith, Love, Integrity, Service, Unity',
        ];

        foreach ($settings as $key => $value) {
            \App\Models\Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
