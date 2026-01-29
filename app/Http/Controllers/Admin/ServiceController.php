<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::latest()->get();
        return Inertia::render('admin/services/Index', [
            'services' => $services
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/services/Create');
    }

    public function store(Request $request)
    {
        \Log::info('Service Store Attempt', [
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $data = $request->validate([
                'title_fr' => 'required|string|max:255',
                'title_en' => 'required|string|max:255',
                'description_fr' => 'required|string',
                'description_en' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'is_active' => 'boolean',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Service Store Validation Failed', $e->errors());
            throw $e;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('services', 'public');
            $data['image'] = '/storage/' . $path;
        }

        Service::create($data);

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
        \Log::info('Service Update Attempt', [
            'id' => $service->id,
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $request->validate([
                'title_fr' => 'required|string|max:255',
                'title_en' => 'required|string|max:255',
                'description_fr' => 'required|string',
                'description_en' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'is_active' => 'boolean',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Service Update Validation Failed', $e->errors());
            throw $e;
        }

        $data = $request->only(['title_fr', 'title_en', 'description_fr', 'description_en', 'is_active']);

        if ($request->hasFile('image')) {
            if ($service->image) {
                $oldPath = str_replace('/storage/', '', $service->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('services', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $service->update($data);

        return redirect()->route('services.index')->with('success', 'Service mis à jour avec succès.');
    }

    public function destroy(Service $service)
    {
        if ($service->image) {
            $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $service->image);
            Storage::disk('public')->delete($oldPath);
        }
        $service->delete();
        return redirect()->route('services.index')->with('success', 'Service supprimé avec succès.');
    }
}
