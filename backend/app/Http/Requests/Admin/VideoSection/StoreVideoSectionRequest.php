<?php

namespace App\Http\Requests\Admin\VideoSection;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVideoSectionRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'video_id'    => ['required', 'integer'],
            'title'    => ['required', 'string'],
            'description'    => ['required', 'string'],
            'thumbnail' => ['string'],
            'video_url' => ['required', 'file', 'mimes:mp4,wav'],
            'duration' => ['string'],
            'interactive_path' => ['string'],
            'subtile' => ['string'],
        ];
    }
    public function messages(): array
    {
        return [
            'video_id.required'      => 'Video should attatched',
            'title.required'      => 'Title is required',
            'subtitle_url.required'      => 'Subtitle is required',
        ];
    }
}
