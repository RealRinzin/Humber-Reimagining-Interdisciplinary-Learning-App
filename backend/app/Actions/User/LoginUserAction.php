<?php

namespace App\Actions\User;

use App\DTOs\User\LoginUserDTO;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginUserAction
{
    public function execute(LoginUserDTO $dto): User
    {

        // Login Authentication and Credential Check
        // return "Passed";
        if (!Auth::attempt([
            'username' => $dto->username,
            'password' => $dto->password
        ])) {
            throw new \Exception('Invalid credentials');
        }

        return $user = Auth::user();

        // Returns token
        // return $user->createToken('access_token')->plainTextToken;
    }
}
