<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserContentSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserContentSetting>
 */
class UserContentSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id'),
            'video'=>false,
            'code'=>false,
            'quiz'=>false,
            'interactive'=>false,
            'explore_mode'=>false,
            'guide_path'=>false,
            'progress'=>false,
        ];
    }
}
