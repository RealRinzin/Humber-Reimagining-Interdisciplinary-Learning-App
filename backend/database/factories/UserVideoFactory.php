<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserVideo>
 */
class UserVideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            // Pick a random existing user ID
            'user_id' => User::inRandomOrder()->value('id'),
            // Pick a random existing video ID
            'video_id' => Video::inRandomOrder()->value('id'),
            'last_paused' => 12,
            'completed'=>false,
        ];
    }
}
