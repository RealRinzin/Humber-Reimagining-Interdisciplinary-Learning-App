<?php

namespace App\DTOs\User;

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

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            username: $data['username'],
            password: $data['password'],
            role_id: $data['role_id']
        );
    }
}
