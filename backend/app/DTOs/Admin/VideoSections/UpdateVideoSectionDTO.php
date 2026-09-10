<?php

namespace App\DTOs\Admin\VideoSections;
use App\Http\Requests\Admin\VideoSection\UpdateVideoSectionRequest;
class UpdateVideoSectionDTO{

    public function __construct(
        // public readonly ?int $id,

        public readonly ?int $video_id,
        public readonly ?string $title,
        public readonly ?string $video_url

    ) {}

    /**
     * @param UpdateVideoSectionRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(UpdateVideoSectionRequest $request): self
    {
        return new self(...$request->validated());
    }
}