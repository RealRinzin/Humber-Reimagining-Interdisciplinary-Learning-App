<?php
namespace App\DTOs\Admin\VideoSections;
use App\Http\Requests\Admin\VideoSection\StoreVideoSectionRequest;

use Illuminate\Http\UploadedFile;
class StoreVideoSectionDTO
{
    public function __construct(
        public readonly ?int $video_id,
        public readonly ?string $title,
        public readonly UploadedFile $video_url,
    ) {}

    public static function fromRequest(StoreVideoSectionRequest $request): self
    {
        return new self(
            video_id: $request->validated('video_id'),
            title:$request->validated('title'),
            video_url:$request->file('video_url'),
        );
    }
}