<?php
namespace App\DTOs\Code;

class CreateVideoDTO {
    public function __construct(
        public readonly ?int $id,
        public readonly ?string $title,
        public readonly ?string $language,
        public readonly ?int $video_id,
        public readonly ?string $code,
    ){}
}