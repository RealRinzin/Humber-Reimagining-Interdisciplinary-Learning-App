<?php

namespace App\Actions\User;

use App\DTOs\User\LoginUserDTO;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginUserAction
{
    public function execute(LoginUserDTO $dto): array
    {

        // Login Authentication and Credential Check
        // return "Passed";
        if (!Auth::attempt([
            'username' => $dto->username,
            'password' => $dto->password
        ])) {
            throw ValidationException::withMessages([
                'username' => ['Invalid credentials']
            ]);
        }
        // Authenticated user object
        $user = Auth::user();
        // Return response object for the API call
        session()->regenerate();
        return [
            'user' => $user,
            'token' => $user->createToken('access_token')->plainTextToken,
        ];
    }
}
