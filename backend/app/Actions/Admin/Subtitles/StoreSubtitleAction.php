<?php

namespace App\Actions\Admin\Subtitles;

use App\DTOs\Admin\Subtitles\StoreSubtitleDTO;
use App\Models\Subtitle;

class StoreSubtitleAction
{
    public function execute(StoreSubtitleDTO $dto): Subtitle
    {
        $path = $dto->subtitle->store('uploads/subtitles', 'public');

        return Subtitle::create([
            'video_id' => $dto->video_id,
            'subtitle_url' => $path,
            'language' => $dto->language,
        ])->fresh();
    }
}