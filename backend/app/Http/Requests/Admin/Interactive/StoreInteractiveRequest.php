<?php

namespace App\Http\Requests\Admin\Interactive;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInteractiveRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'topic_id' => ['required', 'integer', 'exists:topics,id'],
            'video_id' => ['required', 'integer', 'exists:topics,id'],
            'description' => ['required', 'string'],
            'path' => ['required', 'file', 'mimes:html', 'max:10240'],
        ];
    }

    // Error Validation Message
    public function messages(): array
    {
        return [
            'topic_id.required'      => 'Code should attatched',
            'video_id.required'      => 'Video should attatched',
            'path.required'      => 'File Should be html page',
            'description.required'      => 'Description should attatched',
        ];
    }
}
