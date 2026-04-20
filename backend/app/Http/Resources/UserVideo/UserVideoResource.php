<?php

namespace App\Http\Resources\UserVideo;

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
        /**
         * This API will return the list of videos that the user has watched
         */
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'video_id' => $this->video_id,
            'videos' => $this->whenLoaded('video', function () {
                return [
                    'title' => $this->video->title,
                    'duration' => $this->video->duration,
                    'completed' => $this->video->completed,
                ];
            }),
            'last_paused' => $this->last_paused,
            'completed' => $this->completed,
        ];
    }
}
