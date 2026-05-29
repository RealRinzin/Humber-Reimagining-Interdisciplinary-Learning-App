<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideoSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('video_sections')->insert([
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Introduction to Variables',
                'slug'             => 'introduction-to-variables',
                'description'      => 'Learn the basics of variables and data types.',
                'thumbnail'        => 'thumbnails/section_1.jpg',
                'video_url'        => 'https://example.com/videos/section_1.mp4',
                'duration'         => 320,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Control Flow Basics',
                'slug'             => 'control-flow-basics',
                'description'      => 'Understand if statements, loops and conditionals.',
                'thumbnail'        => 'thumbnails/section_2.jpg',
                'video_url'        => 'https://example.com/videos/section_2.mp4',
                'duration'         => 480,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Functions and Scope',
                'slug'             => 'functions-and-scope',
                'description'      => 'Deep dive into functions, closures and variable scope.',
                'thumbnail'        => 'thumbnails/section_3.jpg',
                'video_url'        => 'https://example.com/videos/section_3.mp4',
                'duration'         => 540,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Object Oriented Concepts',
                'slug'             => 'object-oriented-concepts',
                'description'      => 'Classes, objects, inheritance and polymorphism explained.',
                'thumbnail'        => 'thumbnails/section_4.jpg',
                'video_url'        => 'https://example.com/videos/section_4.mp4',
                'duration'         => 720,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Error Handling',
                'slug'             => 'error-handling',
                'description'      => 'How to catch and handle exceptions gracefully.',
                'thumbnail'        => 'thumbnails/section_5.jpg',
                'video_url'        => 'https://example.com/videos/section_5.mp4',
                'duration'         => 390,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Database Connections',
                'slug'             => 'database-connections',
                'description'      => 'Connecting to databases and running queries.',
                'thumbnail'        => 'thumbnails/section_6.jpg',
                'video_url'        => 'https://example.com/videos/section_6.mp4',
                'duration'         => 610,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'REST API Overview',
                'slug'             => 'rest-api-overview',
                'description'      => 'Building and consuming RESTful APIs.',
                'thumbnail'        => 'thumbnails/section_7.jpg',
                'video_url'        => 'https://example.com/videos/section_7.mp4',
                'duration'         => 450,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Authentication Flow',
                'slug'             => 'authentication-flow',
                'description'      => 'Implementing login, tokens and session management.',
                'thumbnail'        => 'thumbnails/section_8.jpg',
                'video_url'        => 'https://example.com/videos/section_8.mp4',
                'duration'         => 530,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Testing Your Code',
                'slug'             => 'testing-your-code',
                'description'      => 'Unit testing, feature tests and test driven development.',
                'thumbnail'        => 'thumbnails/section_9.jpg',
                'video_url'        => 'https://example.com/videos/section_9.mp4',
                'duration'         => 400,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => rand(1, 10),
                'title'            => 'Deployment Basics',
                'slug'             => 'deployment-basics',
                'description'      => 'How to deploy your application to a live server.',
                'thumbnail'        => 'thumbnails/section_10.jpg',
                'video_url'        => 'https://example.com/videos/section_10.mp4',
                'duration'         => 350,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
        ]);
    }
}
