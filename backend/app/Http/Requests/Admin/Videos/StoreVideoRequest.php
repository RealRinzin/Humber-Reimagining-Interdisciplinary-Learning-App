<?php

namespace App\Http\Requests\Admin\Videos;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'     => ['required', 'string', 'max:255','unique:videos'],
            'topic_id' => ['required', 'integer'],
            'thumbnail' => ['nullable','string','max:255'],
            'video_url' => ['required','string','max:255'],
            'duration' => ['required','integer'],
            'description' => ['required','string'],
            'tldw' => ['nullable','string'],
            'video' => ['required','bool'],
            'code' => ['required','bool'],
            'interactive' => ['required','bool'],
            'rambling' => ['required','bool'],
            'quiz' => ['required','bool'],
            'interactive_path' => ['nullable','string'],
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
            'video_url.required'      => 'video URL description missing',
            'video.required'      => 'video status required',
            'code.required'      => 'Code status required',
            'interactive.required'      => 'Interactive status required',
            'rambling.required'      => 'Rambling status required',
            'quiz.required'      => 'Quiz status required',
        ];
    }
}
