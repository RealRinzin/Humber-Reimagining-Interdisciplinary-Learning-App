<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserVideo;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        
        //
        $users = User::all();
        $videos = Video::all();

        foreach ($users as $user) {
            $randomVideos = $videos->random(3);

            foreach ($randomVideos as $video) {
                $user->videos()->syncWithoutDetaching([$video->id]);
            }
        }
        // UserVideo::factory(6)->create();

    }
}
