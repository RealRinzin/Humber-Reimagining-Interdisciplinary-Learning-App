<?php

namespace Database\Factories;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Define the default state for the Question model
            'quiz_id' => Quiz::inRandomOrder()->value('id'), // Create a new Quiz and associate it with the Question
            'question' => $this->faker->sentence(), // Generate a random question using Faker
            'is_correct' => $this->faker->boolean(), // Randomly set the is_correct field to true or false  

        ];
    }
}
