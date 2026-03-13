<?php

namespace App\Http\Resources\VideoWatchHistory;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoWatchHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            // 'user_id' => $this->user_id,
            // 'video_id' => $this->video_id,
            'started_at'=>$this->started_at,
            'interaction_type'=>$this->interaction_type,
            'ended_at' => $this->ended_at,
            'watch_duration' => $this->watch_duration,
            'device_type' => $this->device_type,
            'last_paused' => $this->last_paused,
            'complete_status' => $this->complete_status,
            // 'user' => new UserResource($this->whenLoaded('user')),
            // 'video' => new VideoResource($this->whenLoaded('video')), // parent video

        ];
    }
}
