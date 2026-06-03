<?php
namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // 'name'     => ['required', 'string', 'max:255'],
            // 'email'    => ['required', 'email', 'unique:users,email'],
            'username'    => ['required', 'alpha_num','unique:users','max:30'],
            // 'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password' => ['required', 'string', 'min:6'],
            'role_id' => ['required','integer'],
        ];
    }

    public function messages(): array
    {
        return [
            // 'name.required'      => 'Name is required.',
            'username.required'     => 'Username is required.',
            'username.unique'       => 'This Username is already taken.',
            'password.required'  => 'Password is required.',
            'password.min'       => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
        ];
    }
}