<?php

namespace App\DTOs\Video;

use App\Http\Requests\Video\StoreVideoRequest;

class CreateVideoDTO {
    public function __construct(
        // public readonly ?int $id,
        public readonly ?string $title,
        public readonly ?string $slug,
        public readonly ?int $topic_id,
        public readonly ?int $parent_id,
        public readonly ?string $thumbnail,
        public readonly ?string $video_url,
        public readonly ?float $duration,
        public readonly ?string $description

    ){}

    /**
     * @param StoreVideoRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(StoreVideoRequest $request): self
    {
        return new self(...$request->validated());
    }
}
