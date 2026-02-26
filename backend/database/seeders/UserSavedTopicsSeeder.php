<?php

namespace Database\Seeders;

use App\Models\Topic;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSavedTopicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 user saved topics records using the factory
        // UserSavedTopics::factory(50)->create();
        // Fetch all users and videos to attach saved videos to users

        $users = User::factory(100)->create();
        $videos = Video::factory(100)->create();
                // For each user, randomly attach some saved videos
        $users->each(function ($user) use ($videos) {
            $user->user_saved_topics()->attach(
                $videos->random(rand(1, 5))->pluck('id')->toArray()
            );
        });
    }
}
