<?php

namespace App\Http\Requests\Admin\Codes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCodeRequest extends FormRequest
{
    /**
 
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'topic_id'    => ['required', 'integer', 'exists:topics,id'],
            'video_id'    => ['required', 'integer', 'exists:videos,id'],
            'description' => ['required', 'string'],
            'code'        => ['required', 'string'],
        ];
    }

    // Error Validation Message
    public function messages(): array
    {
        return [
            'topic_id.required'      => 'Code should attatched',
            'video_id.required'      => 'Video should attatched',
            'description.required'      => 'Description should attatched',
            'code.required'      => 'Code field must not be empty',
        ];
    }
}
