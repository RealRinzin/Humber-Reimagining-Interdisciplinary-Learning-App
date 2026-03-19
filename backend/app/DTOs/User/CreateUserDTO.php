<?php

namespace App\DTOs\User;

use App\Http\Requests\User\StoreUserRequest;

class CreateUserDTO
{
    public function __construct(
        // public readonly ?int $id,
        public readonly ?string $name,
        // public readonly ?string $email,
        public readonly ?string $username,
        public readonly ?string $password,
        public readonly ?int $role_id,
    ) {}
    // Validates
    public static function fromRequest(StoreUserRequest $request): self
    {
        return new self(...$request->validated());
    }

}
