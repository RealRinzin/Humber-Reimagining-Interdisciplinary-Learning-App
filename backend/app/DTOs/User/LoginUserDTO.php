<?php

namespace App\DTOs\User;

use App\Http\Requests\User\LoginUserRequest;

class LoginUserDTO
{
    public function __construct(
        public readonly ?string $username,
        public readonly ?string $password,
    ) {}
    // Validation
    public static function fromRequest(LoginUserRequest $request): self
    {
        return new self(...$request->validated());
    }
}
