<?php

namespace Database\Factories;

use App\Models\UserVideo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserVideoAnalytic>
 */
class UserVideoAnalyticFactory extends Factory
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
            'user_video_id' => UserVideo::inRandomOrder()->value('id'),
            'interaction_type' => $this->faker->randomElement(['paused', 'skipped', 'fullscreen','played','close']),
            'interact_at' => '2',
            'device_type' => $this->faker->randomElement(['mobile', 'desktop', 'tablet']),
            'os_type' => $this->faker->randomElement(['iOS','Android','Windows','iPhone','Linux']),
            'browser_type' => $this->faker->randomElement(['Chrome','Firefox','Edge','iPhone','Linux']),
            'played_on' => $this->faker->date()
        ];
    }
}
