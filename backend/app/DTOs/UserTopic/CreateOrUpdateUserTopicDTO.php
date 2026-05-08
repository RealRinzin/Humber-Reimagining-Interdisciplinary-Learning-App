<?php

namespace App\DTOs\UserTopic;

class CreateOrUpdateUserTopicDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $user_id,
        public readonly int $topic_id,
        public readonly bool $started,
    ) {}

    /**
     * @param CreateUpdateRequest $request
     * @return self
     */
    public static function fromRequest(CreateOrUpdateUserTopicDTO $request): self
    {
        return new self(
            user_id: auth()->id(),
            topic_id: $request->validated('topic_id'),
            started: $request->validated('started')
        );
    }
}
