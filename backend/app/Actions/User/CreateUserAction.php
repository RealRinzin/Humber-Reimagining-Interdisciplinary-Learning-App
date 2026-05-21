<?php

namespace App\Actions\User;

use App\DTOs\User\CreateUserDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUserAction
{
    public function execute(CreateUserDTO $dto): User
    {
        return User::create([
            // 'name'     => $dto->name,
            // 'email'    => $dto->email,
            'username' => $dto->username,
            'password' => Hash::make($dto->password),
            'role_id' => $dto->role_id,
        ]);
    }
}
