<?php

namespace App\Http\Resources\UserVideoProgress;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVideoProgressResource extends JsonResource
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
            'user_id'=>$this->user_id,
            'video_id'=>$this->video_id,
            // 'video' => new VideoResource($this->whenLoaded('video')),
            // 'user' => UserResource::collection($this->user),
            // 'user' => new UserResource($this->user),
            // 'video' => new VideoResource($this->video),
            'tldnw' => $this->tldnw,
            'code' => $this->code_section,
        ];
    }
}
