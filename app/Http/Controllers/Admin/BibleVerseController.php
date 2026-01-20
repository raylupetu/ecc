<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BibleVerse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BibleVerseController extends Controller
{
    public function index()
    {
        $verses = BibleVerse::orderBy('order')->get();
        return Inertia::render('admin/bible-verses/Index', [
            'verses' => $verses
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/bible-verses/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'text_fr' => 'required|string',
            'text_en' => 'required|string',
            'reference_fr' => 'required|string|max:255',
            'reference_en' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        BibleVerse::create($request->only([
            'text_fr', 'text_en', 'reference_fr', 'reference_en', 'order'
        ]));

        return redirect()->route('bible-verses.index')->with('success', 'Verset biblique ajouté.');
    }

    public function edit(BibleVerse $bibleVerse)
    {
        return Inertia::render('admin/bible-verses/Edit', [
            'verse' => $bibleVerse
        ]);
    }

    public function update(Request $request, BibleVerse $bibleVerse)
    {
        $request->validate([
            'text_fr' => 'required|string',
            'text_en' => 'required|string',
            'reference_fr' => 'required|string|max:255',
            'reference_en' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $bibleVerse->update($request->only([
            'text_fr', 'text_en', 'reference_fr', 'reference_en', 'order'
        ]));

        return redirect()->route('bible-verses.index')->with('success', 'Verset biblique mis à jour.');
    }

    public function destroy(BibleVerse $bibleVerse)
    {
        $bibleVerse->delete();
        return redirect()->route('bible-verses.index')->with('success', 'Verset biblique supprimé.');
    }
}
