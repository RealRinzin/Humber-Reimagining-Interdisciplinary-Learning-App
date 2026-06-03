<?php
namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
class LoginUserRequest extends FormRequest
{
    // public function authorize(): bool
    // {
    //     return true;
    // }

    public function rules(): array
    {
        return [
            'username'    => ['required', 'alpha_num'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'username.required'     => 'Username is required.',
            'username.unique'       => 'This username is already taken.',
            'password.required'  => 'Password is required.',
        ];
    }
}