<?php

namespace Database\Factories;

use App\Models\Topic;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subtitle>
 */
class SubtitleFactory extends Factory
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
            'topic_id' => Topic::inRandomOrder()->value('id'),
            'subtitle_url'=>Str::random(100),
            'language'=>'English'

        ];
    }
}
