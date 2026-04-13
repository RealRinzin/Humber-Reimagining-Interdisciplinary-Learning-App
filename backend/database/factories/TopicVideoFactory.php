<?php

namespace Database\Factories;

use App\Models\TopicNode;
use App\Models\TopicVideo;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TopicVideo>
 */
class TopicVideoFactory extends Factory
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
            'topic_node_id' => TopicNode::inRandomOrder()->value('id'),
            'video_id' => Video::inRandomOrder()->value('id'),
        ];
    }
}
