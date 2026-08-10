<?php

namespace App\Http\Requests\Admin\Topics;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTopicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'    => ['required', 'string'],
            'description'    => ['required', 'string'],
            'node_group_id' =>['required', 'integer'],
            'node_color'    => ['required', 'string'],
            'x_axis'    => ['required', 'integer'],
            'y_axis'    => ['required', 'integer'],
            // We probably dont need the below fields
            'video'    => ['boolean','required'],
            'code'    => ['boolean','required'],
            'interactive'    => [ 'boolean','required'],
            'rambling'    => ['boolean','required'],
            'quiz'    => ['boolean','required'],
            'interactive_path'    => ['string'],
            'student_visible' => ['boolean','required']
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
            'node_group_id.required'      =>  'X axis is required.',
            'video.required'      =>  'X axis is required.',
            'code.required'      =>  'X axis is required.',
            'interactive.required'      =>  'X axis is required.',
            'quiz.required'      =>  'X axis is required.',
            'rambling.required'      =>  'X axis is required.',
            'student_visible.required'      =>  'X axis is required.',
        ];
    }
}
