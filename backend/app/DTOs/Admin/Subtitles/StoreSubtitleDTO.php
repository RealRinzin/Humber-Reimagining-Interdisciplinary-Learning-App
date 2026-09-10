<?php

namespace App\DTOs\Admin\Subtitles;

use App\Http\Requests\Admin\Subtitles\StoreSubtitleRequest;
use Illuminate\Http\UploadedFile;

class StoreSubtitleDTO
{
    public function __construct(
        public readonly ?int $video_id,
        public readonly UploadedFile $subtitle,
        public readonly ?string $language,
    ) {}

    public static function fromRequest(StoreSubtitleRequest $request): self
    {
        return new self(
            video_id: $request->validated('video_id'),
            subtitle: $request->file('subtitle'),
            language: $request->validated('language'),
        );
    }
}