<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FlashCard>
 */
class FlashCardFactory extends Factory
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
            'video_id' => Video::inRandomOrder()->value('id'),
            'topic_id' => Topic::inRandomOrder()->value('id'), // Randomly assign an existing video ID to the quiz
            'type' => $this->faker->randomElement(['flip', 'mcs', 'tf']),
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']),
            'question'=>Str::random(100),
            'answer'=>Str::random(100),
        ];
    }
}
