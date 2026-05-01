<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserVideoSetting;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserVideoSetting>
 */
class UserVideoSettingFactory extends Factory
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
            'user_id' => User::inRandomOrder()->value('id'),
            'video_id' => Video::inRandomOrder()->value('id'),
            'code'=>false,
            'quiz'=>false,
            'interactive'=>false,
            'rambling'=>false,
        ];
    }
}
