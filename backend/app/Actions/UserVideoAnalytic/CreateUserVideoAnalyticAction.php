<?php

namespace App\Actions\UserVideoAnalytic;

use App\DTOs\UserVideoAnalytic\CreateUserVideoAnalyticDTO;
use App\Models\UserVideoAnalytic;

class CreateUserVideoAnalyticAction 
{
    public function execute(CreateUserVideoAnalyticDTO $dto):UserVideoAnalytic
    {
        return UserVideoAnalytic::create([
            'user_video_id' => $dto->user_video_id,
            'interaction_type' => $dto->interaction_type,
            'interact_at' => $dto->interact_at,
            'device_type' => $dto->device_type,
            'os_type' => $dto->os_type,
            'browser_type'=>$dto->browser_type
        ]);
    }
}
