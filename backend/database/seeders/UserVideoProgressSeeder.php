<?php

namespace Database\Seeders;

use App\Models\UserVideoProgress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserVideoProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserVideoProgress::factory()->count(config('app.seeder_count'))->create();

    }
}
