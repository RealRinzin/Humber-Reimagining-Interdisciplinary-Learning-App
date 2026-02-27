<?php

namespace Database\Seeders;

use App\Models\UserVideoMetric;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserVideoMetricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserVideoMetric::factory(10)->create();
    }
}
