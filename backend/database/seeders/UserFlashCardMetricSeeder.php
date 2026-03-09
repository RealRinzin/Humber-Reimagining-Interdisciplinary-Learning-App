<?php

namespace Database\Seeders;

use App\Models\UserFlashCardMetric;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserFlashCardMetricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserFlashCardMetric::factory(config('app.seeder_count'))->create();

    }
}
