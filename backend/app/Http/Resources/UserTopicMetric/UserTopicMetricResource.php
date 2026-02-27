<?php

namespace App\Http\Resources\UserTopicMetric;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserTopicMetricResource extends JsonResource
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
        ];
    }
}
