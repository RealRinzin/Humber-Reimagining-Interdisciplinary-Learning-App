<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
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
            'title' => 'The Space Project',
            'description' => "Our project responds to this opportunity and aims to develop an
            online platform that combines a branching knowledge map with rich
            multimedia resources. Unlike traditional textbooks or linear
            e-learning modules, this platform encourages exploration and
            contextual understanding. By giving students agency to choose their
            path and weaving together mathematics, physics, and programming
            through multimedia.",
            'sponsor' => 'The funding partner',
            'thumbnail' => 'team.png',
            'start_date' => fake()->date(),
            'end_date' => fake()->date()
        ];
    }
}
