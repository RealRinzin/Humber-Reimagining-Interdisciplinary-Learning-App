<?php
namespace App\Actions\Admin\Quizzes;

use App\DTOs\Admin\Quizzes\UpdateQuizDTO;
use App\Models\Quiz;

class UpdateQuizAction 
{

public function execute(Quiz $quiz,UpdateQuizDTO $dto):Quiz
{
    $quiz->update([
        'topic_id' => $dto->topic_id,
        'video_id' => $dto->video_id,
        'difficulty' => $dto->difficulty,
        'question' => $dto->question,
        'answer' => $dto->answer,
    ]);
    return $quiz->refresh();
}
}
