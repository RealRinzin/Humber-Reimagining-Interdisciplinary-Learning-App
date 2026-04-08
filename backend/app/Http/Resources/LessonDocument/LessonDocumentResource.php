<?php

namespace App\Http\Resources\LessonDocument;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonDocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
           return [
            'id'=>$this->id,
            'title'=>$this->title,
            'document_url'=>$this->document_url,

        ];
    }
}
