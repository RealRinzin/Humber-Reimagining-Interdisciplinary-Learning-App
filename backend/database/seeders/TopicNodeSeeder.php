<?php

namespace Database\Seeders;

use App\Models\TopicNode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicNodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        TopicNode::factory(3)->create();

    }
}
