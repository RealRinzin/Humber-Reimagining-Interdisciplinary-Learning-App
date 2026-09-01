<?php

namespace App\DTOs\Admin\Interactives;

use App\Http\Requests\Admin\Interactive\StoreInteractiveRequest;
use Illuminate\Http\UploadedFile;

class StoreInteractiveDTO
{
    public function __construct(
        // public readonly ?int $id,

        public readonly ?int $topic_id,
        public readonly ?int $video_id,
        public readonly ?UploadedFile $path,
        public readonly ?string $description

    ) {}

    /**
     * @param StoreInteractiveRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(StoreInteractiveRequest $request): self
    {
        return new self(...$request->validated());
    }
}
