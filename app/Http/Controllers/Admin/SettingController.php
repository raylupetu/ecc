<?php

namespace App\Http\Controllers\Admin;

use App\Models\Setting;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/settings/Index', [
            'settings' => Setting::all()->pluck('value', 'key')
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->except(['_token', '_method']);

        foreach ($settings as $key => $value) {
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                $value = \Illuminate\Support\Facades\Storage::url($path);
                
                // Delete old file if exists and is not a default asset
                $oldSetting = Setting::where('key', $key)->first();
                if ($oldSetting && !str_contains($oldSetting->value, 'default')) {
                    $oldPath = str_replace('/storage/', '', $oldSetting->value);
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
                }
            }
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        \Cache::forget('shared_settings');
        \Cache::forget('homepage_settings');

        return redirect()->back()->with('success', 'Paramètres mis à jour.');
    }
}
