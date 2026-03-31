<?php

namespace App\DTOs\UserVideo;

use App\Http\Requests\UserVideo\CreateUpdateRequest;

class CreateUpdateUserVideoDTO
{
    public function __construct(
        public readonly ?int $video_id,
        public readonly ?string $watch_minute,
    ) {}

    // Validates
    public static function fromRequest(CreateUpdateRequest $request): self
    {
        return new self(...$request->validated());
    }
}
