<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Topic>
 */
class TopicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->name(), // Generate a random name for the topic title
            'slug'=>Str::random(18), // Generate a random string for the topic slug
            'parent_id'=>Topic::count() ? Topic::inRandomOrder()->value('id') : null, // Randomly assign a parent topic if any exist, otherwise set to null
            'thumbnail'=>Str::random(10), // Generate a random string for the topic thumbnail
            'video_url'=>Str::random(10), // Generate a random string for the topic video URL
            'duration'=>gmdate('H:i:s', rand(30, 7200)), // Generate a random duration between 30 seconds and 2 hours
            'description'=>Str::random(50) // Generate a random string for the topic description
        ];
    }
}
