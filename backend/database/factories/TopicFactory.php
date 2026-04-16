<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Topic>
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
            //
            'title'=>fake()->name(), // Generate a random name for the topic title
            'slug'=>Str::random(18), 
            'parent_id'=>Topic::count() ? Topic::inRandomOrder()->value('id') : null, // Randomly assign a parent topic if any exist, otherwise set to null
        ];
    }
}
