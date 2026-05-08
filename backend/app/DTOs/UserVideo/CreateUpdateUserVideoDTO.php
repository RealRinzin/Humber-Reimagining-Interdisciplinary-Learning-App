<?php

namespace App\DTOs\UserVideo;

use App\Http\Requests\UserVideo\CreateUpdateRequest;

class CreateUpdateUserVideoDTO
{
    /**
     * @param int|null $video_id
     * @param string|null $watch_minute
     */
    public function __construct(
        public readonly int $user_id,
        public readonly int $video_id,
        public readonly string $last_paused,
        public readonly bool $completed,
    ) {}
    /**
     * @param CreateUpdateRequest $request
     * @return self
     */
    public static function fromRequest(CreateUpdateRequest $request): self
    {
        return new self(
            user_id:auth()->id(),
            video_id:$request->validated('video_id'),
            last_paused:$request->validated('last_paused'),
            completed:$request->validated('completed'),
        );
    }
}
