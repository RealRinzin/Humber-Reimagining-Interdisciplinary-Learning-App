<?php

namespace App\Http\Resources\Video;

use App\Http\Resources\Code\CodeResource;
use App\Http\Resources\Document\DocumentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->name,
            'slug' => $this->slug,
            'parent_id'=>$this->parent_id,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'video_url' => $this->video_url,
            'duration' => $this->duration,
            // Document relationship data
            'documents' =>DocumentResource::collection($this->document),
            // Code relationship data
            'codes' =>CodeResource::collection($this->code),

        ];
    }
}
