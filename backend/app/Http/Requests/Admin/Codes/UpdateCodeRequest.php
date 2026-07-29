<?php

namespace App\Http\Requests\Admin\Codes;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCodeRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'topic_id'    => ['sometimes','required', 'integer', 'exists:topics,id'],
            'video_id'    => ['sometimes','required', 'integer', 'exists:videos,id'],
            'description' => ['sometimes', 'required', 'string'],
            'code'        => ['sometimes', 'required', 'string'],
        ];
    }
    // Error Validation Message
    public function messages(): array
    {
        return [
            'topic_id.required'      => 'Code should attatched',
            'video_id.required'      => 'Video should attatched',
            'code.required'      => 'Code cannot be blank',
            'description.required'      => 'Description cannot be blank',
            
        ];
    }
}
