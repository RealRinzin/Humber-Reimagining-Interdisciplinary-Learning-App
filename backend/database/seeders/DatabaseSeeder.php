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
            TopicSeeder::class, // Topics
            VideoSeeder::class, // Question
            // UserSavedTopicsSeeder::class, // User Saved Topics
            QuizSeeder::class, // Quiz
            QuestionSeeder::class, // Question
            FlashCardSeeder::class, // Flashcard
            SubtitleSeeder::class, // Subtitles
            DocumentSeeder::class, // Documents
            CodeSeeder::class, // Code
            UserTopicMetricSeeder::class, // User Topic Metrics
            UserVideoMetricSeeder::class, // User Video Metrics
            UserFlashCardMetricSeeder::class, // User Flash card Metrics
            VideoWatchHistorySeeder::class, // User Video Watch History for tracking 
            ]);
    }
}
