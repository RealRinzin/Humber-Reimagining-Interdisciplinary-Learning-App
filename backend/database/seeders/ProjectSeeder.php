<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Project::factory(1)->create();
        Project::insert([
            [
                'title' => 'About NodeSpace',
                'heading' => 'The Space Project',
                'description' => "This project aims to develop an online platform that combines a branching knowledge map with rich multimedia resources. Unlike traditional textbooks or linear e-learning modules, this platform encourages exploration and contextual understanding by giving students agency to choose their own learning path and by integrating content from different domains.",
                'sponsor' => 'This project was funded through the <a href="https://humber.ca/about/vision/reimagining-learning/teaching-learning-innovation-fund Builders of Brilliance Teaching & Learning Innovation Fund</a> at Humber Polytechnic.',
                'thumbnail' => 'team.png',
                'start_date' => fake()->date(),
                'end_date' => fake()->date()
            ]
        ]);
    }
}
