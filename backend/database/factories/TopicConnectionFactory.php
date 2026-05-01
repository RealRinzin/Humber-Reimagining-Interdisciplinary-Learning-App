<?php

namespace Database\Factories;

use App\Models\TopicConnection;
use Illuminate\Database\Eloquent\Factories\Factory;

class TopicConnectionFactory extends Factory
{
    protected $model = TopicConnection::class;

    public function definition(): array
    {
        return [
            'topic_id'           => null, // always set explicitly
            'connected_topic_id' => null, // always set explicitly
            'line_style'         => $this->faker->randomElement(['d', 's']),
        ];
    }

    public function dashed(): static
    {
        return $this->state(['line_style' => 'd']);
    }

    public function solid(): static
    {
        return $this->state(['line_style' => 's']);
    }
}