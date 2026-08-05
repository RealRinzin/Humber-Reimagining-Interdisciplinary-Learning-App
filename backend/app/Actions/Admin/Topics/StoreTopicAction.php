<?php

namespace App\Actions\Admin\Topics;

use App\DTOs\Admin\Topics\StoreTopicDTO;
use App\Models\Topic;
use Illuminate\Support\Str;
class StoreTopicAction
{

    public function execute(StoreTopicDTO $dto): Topic
    {

        return Topic::create([
            'title' => $dto->title,
            'slug' => Str::slug($dto->title), // Generate slug from the title
            'description' => $dto->description,
            'node_group_id' => $dto->node_group_id,
            'node_color' => $dto->node_color,
            'x_axis' => $dto->x_axis,
            'y_axis' => $dto->y_axis,
            'video' => $dto->video,
            'code' => $dto->code,
            'interactive' => $dto->interactive,
            'rambling' => $dto->rambling,
            'quiz' => $dto->quiz,
            'student_visible' => $dto->student_visible,
            'interactive_path' => $dto->interactive_path
        ])->fresh();
    }
}
