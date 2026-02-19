<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Container\Attributes\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create random 3 Roles
        // Fixed roles — using firstOrCreate so re-seeding won't duplicate
        $roles = ['admin', 'editor', 'viewer', 'moderator', 'guest'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}
