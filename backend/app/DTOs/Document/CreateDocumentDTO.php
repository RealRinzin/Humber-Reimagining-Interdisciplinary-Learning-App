<?php

namespace App\DTOs\Document;

class CreateDocumentDTO {

    public function __construct(
        public readonly ?int $id,
        public readonly ?string $title,
        public readonly ?string $document_url,
        public readonly ?int $video_id
    ){}

}