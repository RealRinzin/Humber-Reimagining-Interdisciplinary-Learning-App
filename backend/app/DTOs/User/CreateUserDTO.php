<?php

namespace App\DTOs\User;

use App\Http\Requests\User\StoreUserRequest;

class CreateUserDTO
{
    /**
     * @param string|null $name
     * @param string|null $username
     * @param string|null $password
     * @param int|null $role_id
     */
    /**
     * The constructor of the CreateUserDTO class
     * It takes the name, username, password and role_id as parameters and assigns them to the readonly properties of the class
     * The properties are readonly, which means they can only be assigned once and cannot be changed afterwards
     */
    public function __construct(
        public readonly ?string $name,
        public readonly ?string $username,
        public readonly ?string $password,
        public readonly ?int $role_id,
    ) {}
    /**
     * @param StoreUserRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(StoreUserRequest $request): self
    {
        return new self(...$request->validated());
    }
}
