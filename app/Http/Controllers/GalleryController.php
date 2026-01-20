<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/gallery/Index', [
            'images' => Gallery::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/gallery/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image' => 'required|image|max:5120', // Up to 5MB for photos
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('gallery', 'public');
        }

        Gallery::create($validated);

        return redirect()->route('gallery.index')->with('success', 'Image ajoutée à la galerie.');
    }

    public function edit(Gallery $gallery)
    {
        return Inertia::render('admin/gallery/Edit', [
            'gallery' => $gallery
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($gallery->image) {
                Storage::disk('public')->delete($gallery->image);
            }
            $validated['image'] = $request->file('image')->store('gallery', 'public');
        }

        $gallery->update($validated);

        return redirect()->route('gallery.index')->with('success', 'Galerie mise à jour.');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image) {
            Storage::disk('public')->delete($gallery->image);
        }
        $gallery->delete();

        return redirect()->route('gallery.index')->with('success', 'Image supprimée de la galerie.');
    }
}
