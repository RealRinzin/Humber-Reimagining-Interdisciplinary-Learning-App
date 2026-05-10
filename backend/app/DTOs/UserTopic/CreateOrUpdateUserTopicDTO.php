<?php

namespace App\DTOs\UserTopic;

use App\Http\Requests\UserTopic\CreateOrUpdateUserTopicRequest;

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
     * @param CreateOrUpdateUserTopicRequest $request
     * @return self
     */
    public static function fromRequest(CreateOrUpdateUserTopicRequest $request): self
    {
        return new self(
            user_id: auth()->id(),
            topic_id: $request->validated('topic_id'),
            started: $request->validated('started')
        );
    }
}
