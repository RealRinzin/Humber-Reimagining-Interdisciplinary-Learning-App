<?php

namespace Database\Seeders;

use App\Models\UserVideoAnalytic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserVideoAnalyticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserVideoAnalytic::factory(5)->create();
    }
}
