<?php
namespace App\Actions\Admin\Quizzes;

use App\DTOs\Admin\Quizzes\StoreQuizDTO;
use App\Models\Quiz;

class StoreQuizAction 
{

public function execute(StoreQuizDTO $dto):Quiz
{
    return Quiz::create([
        'topic_id' => $dto->topic_id,
        'video_id' => $dto->video_id,
        'difficulty' => $dto->difficulty,
        'question' => $dto->question,
        'answer' => $dto->answer,
    ])->refresh();
}
}
