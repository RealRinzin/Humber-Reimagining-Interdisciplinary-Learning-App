<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
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
            'topic_id' => Topic::inRandomOrder()->value('id'), // Randomly assign an existing topic ID to the quiz
            'Question' => fake()->sentence(), // Generate a random sentence for the quiz question
            'description' => fake()->sentence(), // Generate a random paragraph for the quiz description
            'time_limit' => gmdate('H:i:s', rand(30, 7200)), // Generate a random time limit between 30 seconds and 2 hours
        ];
    }
}
