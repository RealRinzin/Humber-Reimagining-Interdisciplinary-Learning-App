<?php

namespace App\Http\Requests\UserTopic;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateUserTopicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'topic_id' => ['required','integer'],
            'started' => ['required','boolean']
        ];
    }
    public function messages(): array
    {
        return [
            'topic_id.required' =>'topic id is required',
            'started.required' => 'starte status id required'
        ]
    }
}
