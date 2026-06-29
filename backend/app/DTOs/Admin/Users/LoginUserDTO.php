<?php

namespace App\DTOs\Admin\Users;

use App\Http\Requests\Admin\Users\LoginUserRequest;

class LoginUserDTO
{
    /**
     * @param string|null $username
     * @param string|null $password
     */
    /**
     * The constructor of the LoginUserDTO class
     * It takes the username and password as parameters and assigns them to the readonly properties of the class
     * The properties are readonly, which means they can only be assigned once and cannot be changed afterwards
     */
    public function __construct(
        public readonly ?string $username,
        public readonly ?string $password,
    ) {}

    /**
     * @param LoginUserRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a LoginUserRequest object as a parameter and returns an instance of the LoginUserDTO class
     * It uses the validated data from the request to create a new instance of the LoginUserDTO class
     * The validated data is passed as an array to the constructor of the LoginUserDTO class using the spread operator (...)
     */
    public static function fromRequest(LoginUserRequest $request): self
    {
        return new self(...$request->validated());
    }
}
