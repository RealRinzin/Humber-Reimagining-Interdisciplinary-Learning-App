<?php

namespace App\Http\Requests\Admin\Topics;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTopicRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'    => ['sometimes', 'required', 'string',],
            'description'    => ['sometimes', 'required', 'string'],
            'node_color'    => ['sometimes', 'required', 'string'],
            'x_axis'    => ['sometimes', 'required', 'integer'],
            'y_axis'    => ['sometimes', 'required', 'integer'],
            'video'    => ['sometimes', 'boolean'],
            'code'    => ['sometimes', 'boolean'],
            'interactive'    => ['sometimes', 'boolean', 'required'],
            'rambling'    => ['sometimes', 'boolean', 'required'],
            'quiz'    => ['sometimes', 'boolean', 'required'],
            'interactive_path'    => ['sometimes', 'string'],
        ];
    }
    // Error Validation Message
    public function messages(): array
    {
        return [
            'title.required'      => 'Title is required.',
            'title.unique'       => 'Topic Title should be unique',
            'description.required'      => 'Description is required.',
            'node_color.required'      => 'Node color is required.',
            'x_axis.required'      =>  'X axis is required.',
            'y_axis.required'      =>  'X axis is required.',
            'interactive_path.required'      =>  'X axis is required.',
        ];
    }
}
