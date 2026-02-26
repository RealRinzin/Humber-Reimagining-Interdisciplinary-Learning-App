<?php

namespace Database\Factories;

use App\Models\Video;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserSavedTopics>
 */
class UserSavedTopicsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Pick a random existing user ID
            'user_id' => User::inRandomOrder()->value('id'),
            // Pick a random existing video ID
            'video_id' => Video::inRandomOrder()->value('id'),

        ];
    }
}
