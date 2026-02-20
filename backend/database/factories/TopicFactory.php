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
            //
            'title'=>fake()->name(),
            'slug'=>Str::random(18),
            'parent_id'=>Topic::count() ? Topic::inRandomOrder()->value('id') : null,
            'thumbnail'=>Str::random(10),
            'video_url'=>Str::random(10),
            'duration'=>gmdate('H:i:s', rand(30, 7200)),
            'description'=>Str::random(50)
        ];
    }
}
