<?php

namespace App\Http\Requests\Video;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'     => ['required', 'string', 'max:255'],
            'slug'    => ['required', 'string', 'unique:videos'],
            'topic_id' => ['required', 'integer'],
            'parent_id' => ['required', 'integer'],
            'thumbnail' => ['required','string','max:255'],
            'video_url' => ['required','string','max:255'],
            'duration' => ['required','integer'],
            'description' => ['required','string'],
            'tlwd' => ['required','string']
        ];
    }

    // Error Validation Message
    public function messages(): array
    {
        return [
            'title.required'      => 'Title is required.',
            'slug.required'      => 'Slug is required.',
            'slug.unique'      => 'Slug should be unique.',
            'topic_id.required'      => 'Video must be attached to some Topic',
            'thumbnail.required'      => 'Thumbnail is missing',
            'duration.required'      => 'Video length or duration is missing.',
            'description.required'      => 'Video description missing',
        ];
    }
}
