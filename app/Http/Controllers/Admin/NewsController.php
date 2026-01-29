<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        $news = NewsItem::latest()->get();
        return Inertia::render('admin/news/Index', [
            'news' => $news
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/news/Create');
    }

    public function store(Request $request)
    {
        \Log::info('News Store Attempt', [
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $data = $request->validate([
                'title_fr' => 'required|string|max:255',
                'title_en' => 'required|string|max:255',
                'content_fr' => 'required|string',
                'content_en' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'published_at' => 'nullable|date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('News Store Validation Failed', $e->errors());
            throw $e;
        }

        $data['published_at'] = $data['published_at'] ?? now();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $data['image'] = '/storage/' . $path;
        }

        NewsItem::create($data);

        return redirect()->route('news.index')->with('success', 'Article d\'actualité créé.');
    }

    public function edit(NewsItem $news)
    {
        return Inertia::render('admin/news/Edit', [
            'news' => $news
        ]);
    }

    public function update(Request $request, NewsItem $news)
    {
        \Log::info('News Update Attempt', [
            'id' => $news->id,
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $request->validate([
                'title_fr' => 'required|string|max:255',
                'title_en' => 'required|string|max:255',
                'content_fr' => 'required|string',
                'content_en' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'published_at' => 'nullable|date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('News Update Validation Failed', $e->errors());
            throw $e;
        }

        $data = $request->only([
            'title_fr', 'title_en', 'content_fr', 'content_en', 'published_at'
        ]);

        if ($request->hasFile('image')) {
            if ($news->image) {
                $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $news->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('news', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $news->update($data);

        return redirect()->route('news.index')->with('success', 'Article d\'actualité mis à jour.');
    }

    public function destroy(NewsItem $news)
    {
        if ($news->image) {
            $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $news->image);
            Storage::disk('public')->delete($oldPath);
        }
        $news->delete();
        return redirect()->route('news.index')->with('success', 'Article d\'actualité supprimé.');
    }
}
