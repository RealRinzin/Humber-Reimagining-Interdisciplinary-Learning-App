<?php

namespace Database\Factories;

use App\Models\Topic;
use App\Models\TopicNode;
use App\Models\User;
use App\Models\UserTopic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserTopic>
 */
class UserTopicFactory extends Factory
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
            'topic_id' => Topic::inRandomOrder()->value('id')
        ];
    }
}
