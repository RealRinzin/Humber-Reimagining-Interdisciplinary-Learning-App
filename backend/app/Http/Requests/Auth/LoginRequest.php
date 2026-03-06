<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Anyone can attempt to login.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for login.
     */
    public function rules(): array
    {
        return [
            'username'    => ['required', 'string', 'min:10'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages(): array
    {
        return [
            'username.required'    => 'Username is required.',
            'username.min'       => 'Please provide a valid username.',
            'password.required' => 'Password is required.',
            'password.min'      => 'Password must be at least 8 characters.',
        ];
    }
}