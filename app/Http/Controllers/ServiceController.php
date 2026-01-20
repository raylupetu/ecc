<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/services/Index', [
            'services' => Service::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/services/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_fr' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_fr' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        Service::create($validated);

        return redirect()->route('services.index')->with('success', 'Service créé avec succès.');
    }

    public function edit(Service $service)
    {
        return Inertia::render('admin/services/Edit', [
            'service' => $service
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_fr' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_fr' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        $service->update($validated);

        return redirect()->route('services.index')->with('success', 'Service mis à jour.');
    }

    public function destroy(Service $service)
    {
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }
        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service supprimé.');
    }
}
