<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TopicFactory extends Factory
{
    protected $model = Topic::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->words(2, true);

        return [
            'title'      => ucwords($title),
            'slug'       => Str::slug($title),
            'node_color' => $this->faker->randomElement(['blue', 'pink']),
        ];
    }

    public function blue(): static
    {
        return $this->state(['node_color' => 'blue']);
    }

    public function pink(): static
    {
        return $this->state(['node_color' => 'pink']);
    }
}