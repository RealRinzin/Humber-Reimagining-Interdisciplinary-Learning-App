<?php

namespace Database\Seeders;

// use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call UserSeeder Class
        $this->call([
            RoleSeeder::class, // Roles
            UserSeeder::class, // Users
            TopicSeeder::class,
            VideoSeeder::class, // Question
            QuizSeeder::class, // Quiz
            SubtitleSeeder::class, // Subtitles
            LessonDocumentSeeder::class, // Documents
            CodeSeeder::class, // Code
            UserTopicSeeder::class, // User Topics
            // Analytics
            UserVideoSeeder::class, // User last Watch
            UserVideoAnalyticSeeder::class, // User Video Watch History for tracking 
        ]);
    }
}
