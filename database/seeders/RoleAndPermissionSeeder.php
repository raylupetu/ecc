<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create granular permissions
        $permissions = [
            'manage_services',
            'manage_news',
            'manage_team',
            'manage_hero',
            'manage_bible',
            'manage_gallery',
            'manage_users',
            'manage_settings',
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::findOrCreate($permission);
        }

        // create roles and assign created permissions
        $admin = \Spatie\Permission\Models\Role::findOrCreate(['name' => 'admin']);
        $admin->syncPermissions(\Spatie\Permission\Models\Permission::all());

        $editor = \Spatie\Permission\Models\Role::findOrCreate(['name' => 'editor']);
        // Editor gets some default permissions, but can be customized later
        $editor->syncPermissions([
            'manage_services',
            'manage_news',
            'manage_gallery',
        ]);
    }
}
