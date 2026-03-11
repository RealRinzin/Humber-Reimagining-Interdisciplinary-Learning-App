<?php

namespace App\Http\Resources\Video;

use App\Http\Resources\Code\CodeResource;
use App\Http\Resources\Document\DocumentResource;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
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
            'title' => $this->title,
            'slug' => $this->slug,
            // 'user_progress' => new UserVideoProgressResource($this->whenLoaded('userVideoProgress')),
            // 'user_progress' => new UserVideoProgressResource($this->userVideoProgress),
            // 'watch_history' => new VideoWatchHistoryResource($this->videoWatchHistory),
            'parent_id' => $this->parent_id,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'video_url' => $this->video_url,
            'duration' => $this->duration,
            // Document relationship data
            // 'documents' =>DocumentResource::collection($this->document),
            // Code relationship data
            // 'codes' =>CodeResource::collection($this->code),
            'document' => new DocumentResource($this->document),
            'code' => new CodeResource($this->code),

        ];
    }
}
