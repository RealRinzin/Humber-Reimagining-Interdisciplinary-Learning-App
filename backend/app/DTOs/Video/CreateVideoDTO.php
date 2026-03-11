<?php

namespace App\DTOs\Video;


class CreateVideoDTO {
    public function __construct(
        public readonly ?int $id,
        public readonly ?string $title,
        public readonly ?string $slug,
        public readonly ?int $topic_id,
        public readonly ?int $parent_id,
        public readonly ?string $thumbnail,
        public readonly ?string $video_url,
        public readonly ?float $duration,
        public readonly ?string $description

    ){}
}
