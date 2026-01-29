<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        $members = TeamMember::orderBy('order')->get();
        return Inertia::render('admin/team/Index', [
            'members' => $members
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/team/Create');
    }

    public function store(Request $request)
    {
        \Log::info('Team Store Attempt', [
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'role_fr' => 'required|string|max:255',
                'role_en' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'bio_fr' => 'nullable|string',
                'bio_en' => 'nullable|string',
                'order' => 'nullable|integer',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Team Store Validation Failed', $e->errors());
            throw $e;
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('team', 'public');
            $data['image'] = '/storage/' . $path;
        }

        TeamMember::create($data);

        return redirect()->route('team.index')->with('success', 'Membre de l\'équipe ajouté.');
    }

    public function edit(TeamMember $team)
    {
        return Inertia::render('admin/team/Edit', [
            'member' => $team
        ]);
    }

    public function update(Request $request, TeamMember $team)
    {
        \Log::info('Team Update Attempt', [
            'id' => $team->id,
            'has_file' => $request->hasFile('image'),
            'all_keys' => array_keys($request->all()),
        ]);

        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'role_fr' => 'required|string|max:255',
                'role_en' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'bio_fr' => 'nullable|string',
                'bio_en' => 'nullable|string',
                'order' => 'nullable|integer',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Team Update Validation Failed', $e->errors());
            throw $e;
        }

        $data = $request->only([
            'name', 'role_fr', 'role_en', 'email', 'phone', 'bio_fr', 'bio_en', 'order'
        ]);

        if ($request->hasFile('image')) {
            if ($team->image) {
                $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $team->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('team', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $team->update($data);

        return redirect()->route('team.index')->with('success', 'Membre de l\'équipe mis à jour.');
    }

    public function destroy(TeamMember $team)
    {
        if ($team->image) {
            $oldPath = str_replace(['/storage/', url('/storage') . '/'], '', $team->image);
            Storage::disk('public')->delete($oldPath);
        }
        $team->delete();
        return redirect()->route('team.index')->with('success', 'Membre de l\'équipe supprimé.');
    }
}
