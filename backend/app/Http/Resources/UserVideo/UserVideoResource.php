<?php

namespace App\Http\Resources\UserVideo;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return[
            'id'=>$this->id,
            'last_watch_timestamp'=>$this->watch_time,
            'videos'=>new VideoResource($this->whenLoaded('video')),
            'users'=>new UserResource($this->whenLoaded('video')),
            // 'video' => new VideoResource(
            //     $this->video,
            //     $this->whenLoaded('userVideoAnalytic')
            // )
        ];
    }
}
