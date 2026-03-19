<?php

namespace Database\Factories;

use App\Models\TopicNode;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
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
            'topic_node_id' => TopicNode::inRandomOrder()->value('id'),
            'document_url' => 'https://www.pexels.com/download/video/5198159', // Generate a random string for the topic video URL

        ];
    }
}
