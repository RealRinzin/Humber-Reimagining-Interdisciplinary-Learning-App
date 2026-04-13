<?php

namespace Database\Seeders;

use App\Models\TopicNode;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $videos = Video::all();
        $topics = TopicNode::all();

        foreach ($videos as $video) {
            $randomVideos = $topics->random(3);

            foreach ($randomVideos as $topic) {
                $video->topics()->syncWithoutDetaching([$topic->id]);
            }
        }
    }
}
