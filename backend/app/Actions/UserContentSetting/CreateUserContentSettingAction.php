<?php

namespace App\Actions\UserContentSetting;

use App\DTOs\UserContentSetting\CreateUserContentSettingDTO;
use App\Models\UserContentSetting;

class CreateUserContentSettingAction
{
    /**
     * Create a new class instance.
     */

    public function execute(CreateUserContentSettingDTO $dto):UserContentSetting
    {
        return UserContentSetting::create([
            'user_id' => $dto->user_id,
            'video' => $dto->video,
            'code' => $dto->code,
            'quiz' => $dto->quiz,
            'rambling' => $dto->rambling,
            'interactive'=>$dto->interactive,
            'explore_mode' => $dto->explore_mode,
            'guide_path' => $dto->guide_path,
            'progress' => $dto->progress,
        ]);
    }
}
