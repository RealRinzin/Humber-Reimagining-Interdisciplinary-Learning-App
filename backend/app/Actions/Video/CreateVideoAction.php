<?php

namespace App\Actions\Video;

use App\DTOs\Video\CreateVideoDTO;
use App\Models\Video;

class CreateVideoAction
{

    public function execute(CreateVideoDTO $dto): Video {
        return Video::create([
            'title' => $dto->title,
            'slug' => $dto->slug,
            'topic_id' => $dto->topic_id,
            'parent_id' => $dto->parent_id,
            'thumbnail' => $dto->thumbnail,
            'video_url' => $dto->video_url,
            'duration' => $dto->duration,
            'description' => $dto->description,
        ]);
    }
}
