<?php

namespace Database\Seeders;

use App\Models\NodeGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class NodeGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        // 
        NodeGroup::insert([
            [
                'name'  => 'Transformations',
                'color' => "cyan-500",
                'description' => $faker->words(40, true),
            ],
            [
                'name'  => 'Spaces',
                'color' => "pink-500",
                'description' => $faker->words(40, true),

            ],
            [
                'name'  => 'Matrices',
                'color' => "purple-500",
                'description' => $faker->words(40, true),

            ],
        ]);
    }
}
