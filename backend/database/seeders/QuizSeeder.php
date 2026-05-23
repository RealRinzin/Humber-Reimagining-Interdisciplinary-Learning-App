<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 
        $json = file_get_contents(database_path('data/quizees-fixed.json'));
        $quizes = json_decode($json, true); // pass true for associative array
        Quiz::insert($quizes);
        // Quiz::factory(50)->create(); // Create 80 quiz records using the QuizFactory
    }
}
