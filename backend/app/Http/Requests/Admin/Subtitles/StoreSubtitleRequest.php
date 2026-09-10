<?php

namespace App\Http\Requests\Admin\Subtitles;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSubtitleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'video_id' => ['required', 'integer', 'exists:videos,id'],
            'subtitle' => ['required', 'file', 'mimes:vtt,srt', 'max:2048'],
            'language'  => ['required', 'string', 'max:10'],
        ];
    }
    public function messages(): array
    {
        return [
            'video_id.required'      => 'Video should attatched',
            'subtitle_url.required'      => 'Subtitle is required',
        ];
    }
}
