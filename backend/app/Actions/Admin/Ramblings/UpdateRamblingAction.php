<?php

namespace App\Actions\Admin\Ramblings;

use App\DTOs\Admin\Ramblings\UpdateRamblingDTO;
use App\Models\Rambling;

class UpdateRamblingAction
{
    public function execute(Rambling $rambling, UpdateRamblingDTO $dto)
    {
        $rambling->update([
            'topic_id' => $dto->topic_id,
            'video_id' => $dto->video_id,
            'content' => $dto->content,
        ]);
        return $rambling->refresh();
    }
}
