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
            'interaction_type' => $this->faker->randomElement(['Played', 'Paused', 'Seeked', 'Completed', 'Buffering', 'RateChange', 'Volume', 'Progress','Close']),
            'interact_at' => '2',
            'device_type' => $this->faker->randomElement(['mobile', 'desktop', 'tablet']),
            'os_type' => $this->faker->randomElement(['iOS','Android','Windows','iPhone','Linux']),
            'browser_type' => $this->faker->randomElement(['Chrome','Firefox','Edge','iPhone','Linux']),
            'user_agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
            'ip_address' =>fake()->ipv4(),
            'played_on' => $this->faker->date()
        ];
    }
}
