<?php

namespace App\Http\Resources\User;

use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\Video\VideoResource;
use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
use App\Models\UserVideoProgress;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'watch_histories' => VideoWatchHistoryResource::collection($this->whenLoaded('videoWatchHistory')), // getting the watch histories of the video
            // 'videos' => new VideoResource($this->whenLoaded('video')),
            // 'user_video_tracking' => UserVideoProgressResource::collection($this->whenLoaded('userVideoProgress')), // get the is_checked status for the video code, documents, files etc
            // 'id'=>$this->id,
            // 'role_id' => $this->role_id,
            // 'created_at' => $this->created_at,
            // Only included when loaded via BelongsToMany
            // 'pivot' => $this->whenPivotLoaded('videoWatchHistory', fn() => [
            //     'device_type' => $this->pivot->device_type,
            // ]),
            // 'watch_histories' => VideoWatchHistoryResource::collection($this->videoWatchHistory),
            // 'video_watch_history' => VideoWatchHistoryResource::collection(
            //     $this->videoWatchHistory
            // ),
            // Only included when the relation was eager-loaded
            // 'videos' => VideoResource::collection($this->video),
            // 'progress' => UserVideoProgress::collection($this->userVideoProgress),
            // 'pause_count'=>$this->video()->avg('pause_count')
        ];
    }
}
