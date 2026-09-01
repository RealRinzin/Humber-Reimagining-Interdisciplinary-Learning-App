<?php

namespace App\Actions\Admin\Interactives;

use App\DTOs\Admin\Interactives\UpdateInteractiveDTO;
use App\Models\Interactive;

class UpdateInteractiveAction
{
    public function execute(Interactive $interactive,UpdateInteractiveDTO $dto): Interactive
    {
        $interactive->update([
            'topic_id'    => $dto->topic_id,
            'video_id'    => $dto->video_id,
            'path'        => $dto->path,
            'description' => $dto->description,
        ]);

        return $interactive->fresh();
    }
}
