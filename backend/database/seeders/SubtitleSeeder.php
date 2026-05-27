<?php

namespace Database\Seeders;

use App\Models\Subtitle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubtitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Subtitle::factory()->count(config('app.seeder_count'))->create();

        $json = file_get_contents(database_path('data/subtitle.json'));
        $subtitles = json_decode($json, true); // pass true for associative array
        Subtitle::insert($subtitles);
    }
}
