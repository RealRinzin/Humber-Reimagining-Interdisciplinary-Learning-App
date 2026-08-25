<?php

namespace App\Http\Resources\Admin\TopicConnection;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicConnectionResource extends JsonResource
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
            'title' => $this->title,
            // 'node_group_id' => $this->node_group_id,
        ];
    }
}
