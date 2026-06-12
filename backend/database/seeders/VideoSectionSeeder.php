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
                'video_id'         => 2,
                'title'            => 'Model Space Part - 2',
                'slug'             => 'model-space-part-2',
                'description'      => 'Learn the basics of variables and data types.',
                'thumbnail'        => 'thumbnails/section_1.jpg',
                'video_url'        => 'SpacesProject_V02_ModelSpace_2_exp5_HD.mp4',
                'duration'         => 320,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => 2,
                'title'            => 'Model Space Part - 3',
                'slug'             => 'model-space-part-3',
                'description'      => 'Understand if statements, loops and conditionals.',
                'thumbnail'        => 'thumbnails/section_2.jpg',
                'video_url'        => 'SpacesProject_V02_ModelSpace_3_exp2_HD.mp4',
                'duration'         => 480,
                'interactive_path' => null,
                'subtitle'         => "null",
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => 2,
                'title'            => 'Model Space Part - 4',
                'slug'             => 'model-space-part-4',
                'description'      => 'Deep dive into functions, closures and variable scope.',
                'thumbnail'        => 'thumbnails/section_3.jpg',
                'video_url'        => 'SpacesProject_V02_ModelSpace_xtra_exp4_HD.mp4',
                'duration'         => 540,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => 3,
                'title'            => 'Vertex Position -2 ',
                'slug'             => 'vertex-position-2',
                'description'      => 'Classes, objects, inheritance and polymorphism explained.',
                'thumbnail'        => 'thumbnails/section_4.jpg',
                'video_url'        => 'SpacesProject_V03_VertexPositions_2_exp1_HD.mp4',
                'duration'         => 720,
                'interactive_path' => null,
                'subtitle'         => "SpacesProject_V03_VertexPositions_2.vtt",
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => 4,
                'title'            => 'Normals 2',
                'slug'             => 'normals-2',
                'description'      => 'How to catch and handle exceptions gracefully.',
                'thumbnail'        => 'thumbnails/section_5.jpg',
                'video_url'        => 'SpacesProject_V04_Normals_2_exp1_HD.mp4',
                'duration'         => 390,
                'interactive_path' => null,
                'subtitle'         => "SpacesProject_V04_Normals_2.vtt",
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => 7,
                'title'            => 'Rotations - 2 ',
                'slug'             => 'rotations-2',
                'description'      => 'Connecting to databases and running queries.',
                'thumbnail'        => 'thumbnails/section_6.jpg',
                'video_url'        => 'SpacesProject_V07_Rotation_2_exp3_HD.mp4',
                'duration'         => 610,
                'interactive_path' => null,
                'subtitle'         => "SpacesProject_V07_Rotation_2.vtt",
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
            [
                'video_id'         => 18,
                'title'            => 'Bonus - 2',
                'slug'             => 'bonus-2',
                'description'      => 'Building and consuming RESTful APIs.',
                'thumbnail'        => 'thumbnails/section_7.jpg',
                'video_url'        => 'SpacesProject_V18_Bonus_2_EXP2_HD.mp4',
                'duration'         => 450,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
      [
                'video_id'         => 18,
                'title'            => 'Bonus - 3',
                'slug'             => 'bonus-3',
                'description'      => 'Building and consuming RESTful APIs.',
                'thumbnail'        => 'thumbnails/section_3.jpg',
                'video_url'        => 'SpacesProject_V18_Bonus_3_EXP2_HD.mp4',
                'duration'         => 450,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ],
                  [
                'video_id'         => 18,
                'title'            => 'Bonus - 4',
                'slug'             => 'bonus-4',
                'description'      => 'Building and consuming RESTful APIs.',
                'thumbnail'        => 'thumbnails/section_7.jpg',
                'video_url'        => 'SpacesProject_V18_Bonus_4_EXP2_HD.mp4',
                'duration'         => 450,
                'interactive_path' => null,
                'subtitle'         => null,
                'created_at'       => now(),
                'updated_at'       => now(),
            ]
        ]);
    }
}
