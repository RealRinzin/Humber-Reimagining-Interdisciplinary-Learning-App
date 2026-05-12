<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Team>
 */
class TeamFactory extends Factory
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
            'project_id' => Project::inRandomOrder()->value('id'), // Create a new Quiz and associate it with the Question
            'first_name' => 'fake()->firstName()', // Generate a random name for the topic title
            'last_name' => fake()->lastName(), // Generate a random name for the topic title
            'role'=>'fake()->jobTitle()',
            'mugshot'=>fake()->imageUrl(),
            'email'=>fake()->email(),
            'background'=>fake()->text(),
            'linkedin'=>fake()->domainName(),
            'github'=>fake()->domainName(),

        ];
    }
}
