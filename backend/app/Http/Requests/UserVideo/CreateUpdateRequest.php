<?php

namespace App\Http\Requests\UserVideo;

use Illuminate\Foundation\Http\FormRequest;

class CreateUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'video_id'     => ['required', 'integer' ],
            'last_paused' => ['required', 'integer'],
            'completed'   => ['required', 'boolean'],   
        ];
    }

    public function messages(): array
    {
        return [
            'video_id.required'  => 'Video ID is required.',
            'video_id.integer'   => 'Video ID must be an integer.',
            'last_paused.required' => 'Watch minute is required.',  
            'last_paused.integer'  => 'Watch minute must be an integer.',
            'completed.required'   => 'Completed status is required.',
            'completed.boolean'    => 'Completed status must be a boolean value.',
        ];
    }
}
