<?php

namespace App\Actions\UserContentSetting;

use App\DTOs\UserContentSetting\CreateUserContentSettingDTO;
use App\Models\UserContentSetting;

class UpdateUserContentSettingAction
{
    /**
     * Create a new class instance.
     */
    public function execute(CreateUserContentSettingDTO $dto): UserContentSetting
    {
        // Build only the fields that were actually sent
        $data = array_filter([
            'video'        => $dto->video,
            'code'         => $dto->code,
            'quiz'         => $dto->quiz,
            'rambling'         => $dto->rambling,
            'interactive'  => $dto->interactive,
            'explore_mode' => $dto->explore_mode,
            'guide_path'   => $dto->guide_path,
            'progress'     => $dto->progress,
        ], fn($value) => !is_null($value));  // strip nulls

        return UserContentSetting::updateOrCreate(
            ['user_id' => $dto->user_id],
            $data
        );
    }
}
