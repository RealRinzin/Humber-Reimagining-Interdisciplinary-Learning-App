<?php

namespace App\Http\Requests\Admin\Ramblings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRamblingRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'topic_id'    => ['required', 'integer', 'exists:topics,id'],
            'video_id'    => ['required', 'integer', 'exists:videos,id'],
            'content'        => ['required', 'string'],
        ];
    }
    // Error Validation Message
    public function messages(): array
    {
        return [
            'topic_id.required'      => 'Code should attatched',
            'video_id.required'      => 'Video should attatched',
            'content.required'      => 'Description should attatched',
        ];
    }
}
