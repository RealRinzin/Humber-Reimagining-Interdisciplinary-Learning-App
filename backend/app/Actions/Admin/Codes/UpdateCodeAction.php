<?php

namespace App\Actions\Admin\Codes;

use App\DTOs\Admin\Codes\UpdateCodeDTO;
use App\Models\Code;

class UpdateCodeAction
{
    public function execute(Code $code,UpdateCodeDTO $dto): Code
    {
        $code->update([
            'topic_id'    => $dto->topic_id,
            'video_id'    => $dto->video_id,
            'code'        => $dto->code,
            'description' => $dto->description,
        ]);

        return $code->fresh();
    }
}
