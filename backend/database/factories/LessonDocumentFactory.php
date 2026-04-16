<?php

namespace Database\Factories;

use App\Models\LessonDocument;
use App\Models\Topic;
use App\Models\Video;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<LessonDocument>
 */
class LessonDocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => Str::random(10),
            'video_id' => Video::inRandomOrder()->value('id'),
            'topic_id' => Topic::inRandomOrder()->value('id'),
            'document_url' => 'https://www.pexels.com/download/video/5198159', // Generate a random string for the topic video URL

        ];
    }
}
