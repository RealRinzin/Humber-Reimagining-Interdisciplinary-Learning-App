<?php

namespace App\Http\Resources\LessonDocument;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LessonDocumentResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
                return [
            'data' => LessonDocumentResource::collection($this->collection),
        ];
    }
}
