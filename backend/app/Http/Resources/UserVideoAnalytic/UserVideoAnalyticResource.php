<?php

namespace App\Http\Resources\UserVideoAnalytic;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\UserVideo\UserVideoResource;
use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVideoAnalyticResource extends JsonResource
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
            'id' => $this->id,
            'user_videos' => new UserVideoResource($this->whenLoaded('userVideo')),
            'interaction_type' => $this->interaction_type,
            'interact_at' =>$this->interact_at,
            'device_type' => $this->device_type,
            'os_type'=>$this->os_type,
            'browser_type'=>$this->browser_type,
            'user_agent'=>$this->user_agent,
            'ip_address' => $this->ip_address,
            'played_on' => $this->played_on
        ];
    }
}
