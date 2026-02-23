<?php

namespace Database\Seeders;

use App\Models\UserSavedTopics;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSavedTopicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 user saved topics records using the factory
        UserSavedTopics::factory(50)->create();
    }
}
