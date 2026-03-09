<?php

namespace App\DTOs\User;

class CreateUserDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly ?string $name,
        public readonly ?string $email,
        public readonly ?string $password,
    ) {}
}