<?php

namespace App\Actions\Admin\Users;

use App\DTOs\Admin\Users\LoginUserDTO;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginUserAction
{
    public function execute(LoginUserDTO $dto)
    {
        if (!Auth::attempt([
            'username' => $dto->username,
            'password' => $dto->password,
            // 'role_id'  => 2  // already ensures only role_id=2 can log in here
        ])) {
            throw ValidationException::withMessages([
                'message' => ['Invalid credentials']
            ]);
        }
        // Return the user detail once successfully loggined
        $user = Auth::user();
        // Once the username and password is authenticated
        // We will check if its role id = 2
        // otherwise rediret to failed login
        if ($user->role_id === 2) {
        //     // Generate Sanctum token
            // $token = $user->createToken('admin-token')->plainTextToken;
            session()->regenerate();
            // Return the User
            return $user;
            // return [
                // 'user'  => $user,
                // 'token' => $token

            // ];
        } else {
            // If failed to login
            return    throw ValidationException::withMessages([
                'message' => ['Invalid credentials']
            ]);
        }
    }
}
