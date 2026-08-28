<?php

namespace App\Http\Requests\Admin\Quizzes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
{
    public function rules(): array
    {

        return [
            'video_id' => ['required', 'integer'],
            'topic_id' => ['required', 'integer'],
            'difficulty' => ['required', 'string'],
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string', 'max:255'],
        ];
    }

    // Error Validation Message
    public function messages(): array
    {
        return [
            'video_id.required' => 'Video has to be attached',
            'topic_id.required' => 'Topic has to be attached',
            'difficulty.required' => 'Difficulty is required',
            'question.required' => 'Question is required',
            'answer.required' => 'Answer is required',
        ];
    }
}
