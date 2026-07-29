<?php

namespace App\Http\Requests\Admin\Videos;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVideoRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'title'     => ['sometimes','required', 'string', 'max:255','unique:videos'],
            'topic_id' => ['sometimes','required', 'integer'],
            'thumbnail' => ['sometimes','required','string','max:255'],
            'video_url' => ['sometimes','required','string','max:255'],
            'duration' => ['sometimes','required','integer'],
            'description' => ['sometimes','required','string'],
            'tldw' => ['sometimes','required','string'],
            'video' => ['sometimes','required','bool'],
            'code' => ['sometimes','required','bool'],
            'interactive' => ['sometimes','required','bool'],
            'rambling' => ['sometimes','required','bool'],
            'quiz' => ['sometimes','required','bool'],
            'interactive_path' => ['sometimes','string'],
        ];
    }

    // Error Validation Message
    public function messages(): array
    {
        return [
            'title.required'      => 'Title is required.',
            'topic_id.required'      => 'Video must be attached to some Topic',
            'duration.required'      => 'Video length or duration is missing.',
            'description.required'      => 'Video description missing',
            'tldw.required'      => 'Video description missing',
            'video_url.required'      => 'video URL description missing',
            'video.required'      => 'video status required',
            'code.required'      => 'Code status required',
            'interactive.required'      => 'Interactive status required',
            'rambling.required'      => 'Rambling status required',
            'quiz.required'      => 'Quiz status required',
        ];
    }
}
