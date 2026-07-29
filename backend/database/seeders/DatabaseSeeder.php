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
            NodeGroupSeeder::class, // Users
            TopicSeeder::class, // Key component
            TopicConnectionSeeder::class,
            VideoSeeder::class, // Question
            QuizSeeder::class, // Quiz for the topic or vidoes
            SubtitleSeeder::class, // Subtitles for the videos
            CodeSeeder::class, // Code for the topics or videos
            RamblingSeeder::class, // Rambling
            InteractiveSeeder::class, // Interactive
            // Analytics 
            UserContentSettingSeeder::class,
            VideoSectionSeeder::class,
            // Team Member
            ProjectSeeder::class,
            TeamSeeder::class,
            MultimediaSeeder::class,
        ]);
    }
}
