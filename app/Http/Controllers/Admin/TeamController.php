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

        $data = $request->only([
            'name', 'role_fr', 'role_en', 'email', 'phone', 'bio_fr', 'bio_en', 'order'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('team', 'public');
            $data['image'] = Storage::url($path);
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

        $data = $request->only([
            'name', 'role_fr', 'role_en', 'email', 'phone', 'bio_fr', 'bio_en', 'order'
        ]);

        if ($request->hasFile('image')) {
            if ($team->image) {
                $oldPath = str_replace('/storage/', '', $team->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('team', 'public');
            $data['image'] = Storage::url($path);
        }

        $team->update($data);

        return redirect()->route('team.index')->with('success', 'Membre de l\'équipe mis à jour.');
    }

    public function destroy(TeamMember $team)
    {
        if ($team->image) {
            $oldPath = str_replace('/storage/', '', $team->image);
            Storage::disk('public')->delete($oldPath);
        }
        $team->delete();
        return redirect()->route('team.index')->with('success', 'Membre de l\'équipe supprimé.');
    }
}
