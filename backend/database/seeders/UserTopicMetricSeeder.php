<?php

namespace Database\Seeders;

use App\Models\UserTopicMetric;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTopicMetricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserTopicMetric::factory(config('app.seeder_count'))->create();
    }
}
