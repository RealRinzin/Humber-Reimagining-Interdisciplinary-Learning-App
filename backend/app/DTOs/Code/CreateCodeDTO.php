<?php
namespace App\DTOs\Code;

class CreateCodeDTO {
    
    public function __construct(
        public readonly ?int $id,
        public readonly ?string $title,
        public readonly ?int $video_id,
        public readonly ?string $language,
        public readonly ?string $code,
    ){}
}