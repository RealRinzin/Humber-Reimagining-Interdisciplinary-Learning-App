<?php

namespace App\DTOs\Admin\Topics;

use App\Http\Requests\Admin\Topics\StoreTopicRequest;

class StoreTopicDTO
{
    public function __construct(
        // public readonly ?int $id,

        public readonly string $title,
        public readonly string $description,
        public readonly string $node_color,
        public readonly int $node_group_id,
        public readonly int $x_axis,
        public readonly int $y_axis,
        public readonly bool $video,
        public readonly bool $code,
        public readonly bool $interactive,
        public readonly bool $rambling,
        public readonly bool $quiz,
        public readonly bool $student_visible,
        public readonly ?string $interactive_path,

    ) {}

    /**
     * @param StoreTopicRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(StoreTopicRequest $request): self
    {
        return new self(...$request->validated());
    }
}
