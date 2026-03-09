<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VideoWatchHistory>
 */
class VideoWatchHistoryFactory extends Factory
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
            // Generate random timestamps and other fields for the user topic history
            'started_at' => $this->faker->time(),
            // Use optional() to allow for null values in ended_at, watch_duration, and last_paused
            'ended_at' => $this->faker->optional()->time(),
            //  Generate a random watch duration, allowing for null values
            'watch_duration' => $this->faker->optional()->time(),
            // Generate a random last paused time, allowing for null values
            'last_paused' => $this->faker->optional()->time(),
            // Generate a random pause count between 0 and 5
            'pause_count' => $this->faker->numberBetween(0, 5),
            // Randomly assign a device type, allowing for null values
            'device_type' => $this->faker->optional()->randomElement(['mobile', 'desktop', 'tablet']),
            // Randomly assign a complete status from the specified options
            'complete_status' => $this->faker->randomElement(['completed', 'in_progress', 'not_started']),
            'interaction_type' => $this->faker->randomElement(['paused', 'skipped', 'fullscreen']),
            // Generate a random played date
            'played_date' => $this->faker->date()
        ];
    }
}
