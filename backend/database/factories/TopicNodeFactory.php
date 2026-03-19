<?php

namespace Database\Factories;

use App\Models\TopicNode;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<TopicNode>
 */
class TopicNodeFactory extends Factory
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
            'parent_id'=>TopicNode::count() ? TopicNode::inRandomOrder()->value('id') : null, // Randomly assign a parent topic if any exist, otherwise set to null
        ];
    }
}
