<?php

namespace App\Actions\Admin\Codes;

use App\DTOs\Admin\Codes\StoreCodeDTO;
use App\Models\Code;

class StoreCodeAction
{

    public function execute(StoreCodeDTO $dto): Code
    {
     
        return Code::create([
            'topic_id' => $dto->topic_id,
            'video_id' => $dto->video_id,
            'code' => $dto->code,
            'description' => $dto->description,
        ])->fresh();
    }
}
