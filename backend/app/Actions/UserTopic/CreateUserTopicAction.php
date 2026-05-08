<?php

namespace App\Actions\UserTopic;

use App\DTOs\UserTopic\CreateOrUpdateUserTopicDTO;
use App\Models\UserTopic;

class CreateUserTopicAction
{
    /**
     * Create a new class instance.
     */
    public function execute(CreateOrUpdateUserTopicDTO $dto):UserTopic
    {
        return UserTopic::create([
            'user_id'=>$dto->user_id,
            'topic_id'=>$dto->topic_id,
            'started' => $dto->started
        ]);
    }
}
