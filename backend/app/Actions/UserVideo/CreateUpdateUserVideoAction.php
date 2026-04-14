<?php

namespace App\Actions\UserVideo;

use App\DTOs\UserVideo\CreateUpdateUserVideoDTO;
use App\Models\UserVideo;

class CreateUpdateUserVideoAction
{
    public function execute(CreateUpdateUserVideoDTO $dto, int $userId): UserVideo
    {


        return UserVideo::updateOrCreate(
            [
                'last_paused' => $dto->last_paused ?? '0:0',
                'video_id' => $dto->video_id,
            ],
            [
                'user_id' => $userId,
            ]
        );
    }
}
