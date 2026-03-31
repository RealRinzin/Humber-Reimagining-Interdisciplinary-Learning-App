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
            'video_id'     => ['required', 'integer', 'exists:videos,id'],
            'watch_minute' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'video_id.required'  => 'Video ID is required.',
            'video_id.integer'   => 'Video ID must be an integer.',
            'video_id.exists'    => 'The specified video does not exist.',
            'watch_minute.string' => 'Watch minute must be a string.',
        ];
    }
}
