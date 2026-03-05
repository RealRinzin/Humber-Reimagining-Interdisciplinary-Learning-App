<?php

namespace Database\Seeders;

use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Video::factory(40)->create();
        $json = File::get(database_path('data/videos.json'));
        $videos = json_decode($json,true);
        Video::insert($videos);
    }
}
