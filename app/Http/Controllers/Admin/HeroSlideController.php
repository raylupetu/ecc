<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::orderBy('order')->get();
        return Inertia::render('admin/hero-slides/Index', [
            'slides' => $slides
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/hero-slides/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'title_fr' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle_fr' => 'nullable|string|max:255',
            'subtitle_en' => 'nullable|string|max:255',
            'button_text_fr' => 'nullable|string|max:255',
            'button_text_en' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $data = $request->only([
            'title_fr', 'title_en', 'subtitle_fr', 'subtitle_en', 'button_text_fr', 
            'button_text_en', 'button_url', 'order'
        ]);


        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero', 'public');
            $data['image'] = Storage::url($path);
        }

        HeroSlide::create($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide ajouté.');
    }

    public function edit(HeroSlide $heroSlide)
    {
        return Inertia::render('admin/hero-slides/Edit', [
            'slide' => $heroSlide
        ]);
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'title_fr' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'subtitle_fr' => 'nullable|string|max:255',
            'subtitle_en' => 'nullable|string|max:255',
            'button_text_fr' => 'nullable|string|max:255',
            'button_text_en' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $data = $request->only([
            'title_fr', 'title_en', 'subtitle_fr', 'subtitle_en', 'button_text_fr', 
            'button_text_en', 'button_url', 'order'
        ]);


        if ($request->hasFile('image')) {
            if ($heroSlide->image && !str_contains($heroSlide->image, 'unsplash.com')) {
                $oldPath = str_replace('/storage/', '', $heroSlide->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('hero', 'public');
            $data['image'] = Storage::url($path);
        }

        $heroSlide->update($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide mis à jour.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        if ($heroSlide->image && !str_contains($heroSlide->image, 'unsplash.com')) {
            $oldPath = str_replace('/storage/', '', $heroSlide->image);
            Storage::disk('public')->delete($oldPath);
        }
        $heroSlide->delete();
        return redirect()->route('hero-slides.index')->with('success', 'Slide supprimé.');
    }
}
