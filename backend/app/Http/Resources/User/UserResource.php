<?php

namespace App\Http\Resources\User;

use App\Http\Resources\UserVideoMetric\UserVideoMetricResource;
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
            'id'=>$this->id,
            'role_id'=>$this->role_id,
            'name'=>$this->name,
            'email'=>$this->email,
            'created_at'=>$this->created_at,
            'video_metric' => UserVideoMetricResource::collection($this->userVideoMetric),
            // 'pause_count'=>$this->video()->avg('pause_count')
        ];
    }
}
