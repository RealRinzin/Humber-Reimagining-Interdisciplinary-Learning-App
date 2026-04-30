<?php

namespace App\Http\Requests\UserContentSetting;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserContentSettingRequest extends FormRequest
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
            'video' => ['required','boolean'],
            'code' => ['required','boolean'],
            'quiz' => ['required','boolean'],
            'interactive' => ['required','boolean'],
            'explore_mode' => ['required','boolean'],
            'guide_path' => ['required','boolean'],
            'progress' => ['required','boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'video.required'     => 'Video status is required.',
            'code.required'     => 'Code status is required.',
            'quiz.required'     => 'Quiz status is required.',
            'interactive.required'     => 'interactive status is required.',
            'explore_mode.required'     => 'Explore Mode status is required.',
            'guide_path.required'     => 'Guided Path status is required.',
            'progress.required'     => 'Progress status is required.',
        ];
    }
}
