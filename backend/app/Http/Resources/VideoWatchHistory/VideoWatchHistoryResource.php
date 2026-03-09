<?php

namespace App\Http\Resources\VideoWatchHistory;

use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
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
        return parent::toArray($request);
        return [
            'id' => $this->id,
            'user_id'=>$this->user_id,
            'video'=>$this->video_id,
            // 'user_progress' =>  UserVideoProgressResource::collection($this->userVideoProgress),

            // 'videos' => VideoWatchHistoryResource::collection($this->videoWatchHistory),



        ];
    }
}
