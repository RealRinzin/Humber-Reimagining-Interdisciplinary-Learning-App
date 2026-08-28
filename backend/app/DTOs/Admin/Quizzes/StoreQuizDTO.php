<?php
namespace App\DTOs\Admin\Quizzes;
use App\Http\Requests\Admin\Quizzes\StoreQuizRequest;
class StoreQuizDTO {
    public function __construct(
        // public readonly ?int $id,

        public readonly ?int $video_id,
        public readonly ?int $topic_id,
        public readonly ?string $difficulty,
        public readonly ?string $question,
        public readonly ?string $answer,

    ){}

    /**
     * @param StoreQuizRequest $request
     * @return self
     */
    /**
     * The fromRequest method is a static method that takes a StoreUserRequest object as a parameter and returns an instance of the CreateUserDTO class
     * It uses the validated data from the request to create a new instance of the CreateUserDTO class
     * The validated data is passed as an array to the constructor of the CreateUserDTO class using the spread operator (...)
     */
    public static function fromRequest(StoreQuizRequest $request): self
    {
        return new self(...$request->validated());
    }
}
