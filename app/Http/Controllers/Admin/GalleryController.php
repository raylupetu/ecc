<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::latest()->get();
        return Inertia::render('admin/gallery/Index', [
            'gallery' => $gallery
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/gallery/Create');
    }

    public function store(Request $request)
    {
        \Log::info('Gallery Store Attempt', [
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $data = $request->validate([
                'title_fr' => 'nullable|string|max:255',
                'title_en' => 'nullable|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Gallery Store Validation Failed', $e->errors());
            throw $e;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            $data['image'] = '/storage/' . $path;
        }

        Gallery::create($data);

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
        \Log::info('Gallery Update Attempt', [
            'id' => $gallery->id,
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $request->validate([
                'title_fr' => 'nullable|string|max:255',
                'title_en' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Gallery Update Validation Failed', $e->errors());
            throw $e;
        }

        $data = $request->except(['image', '_method']);

        if ($request->hasFile('image')) {
            if ($gallery->image) {
                $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $gallery->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('gallery', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $gallery->update($data);

        return redirect()->route('gallery.index')->with('success', 'Image de la galerie mise à jour.');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image) {
            $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $gallery->image);
            Storage::disk('public')->delete($oldPath);
        }
        $gallery->delete();
        return redirect()->route('gallery.index')->with('success', 'Image supprimée de la galerie.');
    }
}
