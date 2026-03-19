<?php
namespace App\Http\Requests\UserVideoAnalytic;

use Illuminate\Foundation\Http\FormRequest;
class StoreUserVideoAnalyticRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_video_id'     => ['required', 'integer', 'max:255'],
            'interaction_type'    => ['required', 'string','max:255'],
            'interact_at' => ['required','string','max:255'],
            'device_type' => ['required','string','max:255'],
            'os_type' => ['required','string','max:255'],
            'browser_type' => ['required','string','max:255'],
            'played_on' => ['required','string','max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_video_id.required'      => 'required.',
            'interaction_type.required'      => 'required.',
            'interact_at.required'      => 'required.',
            'device_type.required'      => 'required.',
            'os_type.required'      => 'required.',
            'browser_type.required'      => 'required.',
            'played_on.required'      => 'required.',
        ];
    }
}