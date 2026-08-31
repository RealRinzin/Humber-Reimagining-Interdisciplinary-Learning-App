<?php

namespace App\Actions\Admin\Ramblings;

use App\DTOs\Admin\Ramblings\StoreRamblingDTO;
use App\Models\Rambling;


class StoreRamblingAction
{
    public function execute(StoreRamblingDTO $dto): Rambling
    {

        return Rambling::create([
            'topic_id' => $dto->topic_id,
            'video_id' => $dto->video_id,
            'content' => $dto->content,
        ])->fresh();
    }
}
