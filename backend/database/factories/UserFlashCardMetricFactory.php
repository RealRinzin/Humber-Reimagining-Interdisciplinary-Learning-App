<?php

namespace Database\Factories;

use App\Models\FlashCard;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserFlashCardMetric>
 */
class UserFlashCardMetricFactory extends Factory
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
            'flash_card_id' => FlashCard::inRandomOrder()->value('id'), 
            'attempted_on' => $this->faker->date(),
            'correct'=>$this->faker->boolean(),
        ];
    }
}
