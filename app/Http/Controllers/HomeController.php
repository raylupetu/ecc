<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Gallery;
use App\Models\HeroSlide;
use App\Models\BibleVerse;
use App\Models\TeamMember;
use App\Models\NewsItem;
use App\Models\Setting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'services' => Service::where('is_active', true)->latest()->get(),
            'galleryImages' => Gallery::where('is_active', true)->latest()->get(),
            'heroSlides' => HeroSlide::orderBy('order')->get(),
            'bibleVerses' => BibleVerse::orderBy('order')->get(),
            'teamMembers' => TeamMember::orderBy('order')->get(),
            'newsItems' => NewsItem::latest()->take(6)->get(),
            'settings' => Setting::all()->pluck('value', 'key'),
        ]);
    }
}
