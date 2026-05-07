<?php

namespace Database\Factories;

use App\Models\Multimedia;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Multimedia>
 */
class MultimediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => Project::inRandomOrder()->value('id'),
            'title' => fake()->text(),
            'media' => fake()->imageUrl(),
            'team_type' => fake()->randomElement(['Project Lead', 'Video Graphy', 'Full Stack Developer', 'UI/UX Designer', 'Technical Artist']),
            'description' => fake()->text(),
            'media_type' => fake()->randomElement(['image','video']),

        ];
    }
}
