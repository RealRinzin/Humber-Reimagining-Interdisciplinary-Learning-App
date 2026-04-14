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
        public readonly ?int $video_id,
        public readonly ?string $last_paused,
    ) {}

    /**
     * @param CreateUpdateRequest $request
     * @return self
     */
    public static function fromRequest(CreateUpdateRequest $request): self
    {
        return new self(...$request->validated());
    }
}
