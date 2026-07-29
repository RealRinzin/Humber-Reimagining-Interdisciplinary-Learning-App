<?php

namespace App\Actions\Admin\Videos;

use App\DTOs\Admin\Videos\UpdateVideoDTO;
use App\Models\Video;
use Illuminate\Support\Str;

class UpdateVideoAction
{

    public function execute(Video $video, UpdateVideoDTO $dto): Video
    {

        $video->update([
            'title' => $dto->title,
            'slug' => Str::slug($dto->title), // Generate slug from the title
            'topic_id' => $dto->topic_id, // Generate slug from the title
            'description' => $dto->description,
            'thumbnail' => $dto->thumbnail,
            'video_url' => $dto->video_url,
            'duration' => $dto->duration,
            'tldw' => $dto->tldw,
            'video' => $dto->video,
            'code' => $dto->code,
            'interactive' => $dto->interactive,
            'rambling' => $dto->rambling,
            'quiz' => $dto->quiz,
            'interactive_path' => $dto->interactive_path
        ]);
        return $video->fresh();
    }
}
