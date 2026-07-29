<?php

namespace App\DTOs\Admin\Videos;

use App\Http\Requests\Admin\Videos\UpdateVideoRequest;

class UpdateVideoDTO
{
    public function __construct(
        // public readonly ?int $id,

        public readonly ?string $title,
        public readonly ?int $topic_id,
        public readonly ?string $thumbnail,
        public readonly ?string $video_url,
        public readonly ?int $duration,
        public readonly ?string $description,
        public readonly ?bool $tldw,
        public readonly ?bool $code,
        public readonly ?bool $video,
        public readonly ?bool $interactive,
        public readonly ?bool $rambling,
        public readonly ?bool $quiz,
        public readonly ?string $interactive_path,

    ) {}

    /**
     * @param UpdateVideoRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(UpdateVideoRequest $request): self
    {
        return new self(...$request->validated());
    }
}
