<?php

namespace App\Http\Requests\Admin\Topics;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTopicRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title'    => ['required', 'string'],
            'description'    => ['required', 'string'],
            'node_group_id' => ['required', 'integer'],
            'node_color'    => ['required', 'string'],
            'x_axis'    => ['required', 'integer'],
            'y_axis'    => ['required', 'integer'],
            // We probably dont need the below fields
            'video'    => ['boolean', 'required'],
            'code'    => ['boolean', 'required'],
            'interactive'    => ['boolean', 'required'],
            'rambling'    => ['boolean', 'required'],
            'quiz'    => ['boolean', 'required'],
            'interactive_path'    => ['sometime','nullable', 'string'],
            'student_visible' => ['boolean', 'required']

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
            'x_axis.required'      =>  'X Axis is required.',
            'y_axis.required'      =>  'Y Axis is required.',
            'node_group_id.required'      =>  'Node Group ID is required.',
            'video.required'      =>  'Video is required.',
            'code.required'      =>  'Video is required.',
            // 'interactive.required'      =>  'Interactive is required.',
            'quiz.required'      =>  ' Quiz is required.',
            'rambling.required'      =>  'Rambling is required.',
            'student_visible.required'      =>  'Student Visible is required.',
        ];
    }
}
