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
        \Log::info('HeroSlide Store Attempt', [
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $data = $request->validate([
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('HeroSlide Store Validation Failed', $e->errors());
            throw $e;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero', 'public');
            $data['image'] = '/storage/' . $path;
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
        \Log::info('HeroSlide Update Attempt', [
            'id' => $heroSlide->id,
            'has_file' => $request->hasFile('image'),
            'content_length' => $request->server('CONTENT_LENGTH'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('HeroSlide Update Validation Failed', $e->errors());
            throw $e;
        }

        $data = $request->only([
            'title_fr', 'title_en', 'subtitle_fr', 'subtitle_en', 'button_text_fr', 
            'button_text_en', 'button_url', 'order'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($heroSlide->image) {
                $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $heroSlide->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('hero', 'public');
            // Store as relative path to be more robust
            $data['image'] = '/storage/' . $path;
            
            \Log::info('New image stored', ['path' => $data['image']]);
        }

        $heroSlide->update($data);

        return redirect()->route('hero-slides.index')->with('success', 'Slide mis à jour avec succès.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        if ($heroSlide->image && !str_starts_with($heroSlide->image, 'http')) {
            $pathToDelete = str_replace('/storage/', '', $heroSlide->image);
            Storage::disk('public')->delete($pathToDelete);
        } elseif ($heroSlide->image && str_contains($heroSlide->image, url('/storage'))) {
            $pathToDelete = str_replace(url('/storage') . '/', '', $heroSlide->image);
            Storage::disk('public')->delete($pathToDelete);
        }
        
        $heroSlide->delete();
        return redirect()->route('hero-slides.index')->with('success', 'Slide supprimé avec succès.');
    }
}
