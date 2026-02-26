<?php

namespace App\Http\Resources\Topic;

use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            // 'videos' => VideoResource::collection($this->whenLoaded('videos')),
            'videos' =>VideoResource::collection($this->videos)
            
            // 'parent_id'=>$this->parent_id,
            // 'title' => $this->title,
            // 'slug' => $this->slug,
            // 'description' => $this->description,
            // 'thumbnail' => $this->thumbnail,
            // 'video_url' => $this->video_url,
            // 'duration' => $this->duration,
        ];
    }
}
