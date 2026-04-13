<?php

namespace Database\Seeders;

use App\Models\TopicNode;
use App\Models\User;
use App\Models\UserTopic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = User::all();
        $topics = TopicNode::all();

        foreach ($users as $user) {
            $randomTopics = $topics->random(3);

            foreach ($randomTopics as $topic) {
                $user->topics()->syncWithoutDetaching([$topic->id]);
            }
        }
        // UserTopic::factory(10)->create();
    }
}
