<?php

namespace Database\Seeders;

use App\Models\NodeGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NodeGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 
        NodeGroup::insert([
            [
                'name'  => 'Transformations',
                'color' => "#00bcff"
            ],
            [
                'name'  => 'Spaces',
                'color' => "#e60076"
            ],
            [
                'name'  => 'Matrices',
                'color' => "#8023fe"
            ],
        ]);
    }
}
