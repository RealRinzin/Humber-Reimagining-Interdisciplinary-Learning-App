<?php

namespace App\Http\Resources\UserVideoMetric;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVideoMetricResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
        // return [
        //     'id'=>$this->id,
        //     'video_id'=>$this->video_id,
        //     'started_at'=>$this->started_at,
        //     'interaction_type'=>$this->interaction_type,
        // ];
    }
}
