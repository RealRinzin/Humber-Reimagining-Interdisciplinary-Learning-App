<?php

namespace App\Http\Requests\Admin\Subtitles;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSubtitleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'video_id'    => ['required', 'integer', 'exists:videos,id'],
            'subtitle_url' => ['required', 'string'],
            'language'        => ['string'],
        ];
    }
    // Error Validation Message
    public function messages(): array
    {
        return [
            'video_id.required'      => 'Video should attatched',
            'subtitle_url.required'      => 'Subtitle is required',
        ];
    }
}
