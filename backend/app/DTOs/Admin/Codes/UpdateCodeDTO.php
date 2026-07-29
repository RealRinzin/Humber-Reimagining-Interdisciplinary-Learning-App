<?php

namespace App\DTOs\Admin\Codes;


use App\Http\Requests\Admin\Codes\UpdateCodeRequest;

class UpdateCodeDTO{

    public function __construct(
        // public readonly ?int $id,

        public readonly ?int $topic_id,
        public readonly ?int $video_id,
        public readonly ?string $code,
        public readonly ?string $description

    ) {}

    /**
     * @param UpdateCodeRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(UpdateCodeRequest $request): self
    {
        return new self(...$request->validated());
    }
}
