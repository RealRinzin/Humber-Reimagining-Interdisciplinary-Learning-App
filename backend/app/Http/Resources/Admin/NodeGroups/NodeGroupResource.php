<?php

namespace App\Http\Resources\Admin\NodeGroups;

use App\Http\Resources\Admin\Topics\TopicResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NodeGroupResource extends JsonResource
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
            'name' => $this->name,
            'color' => $this->color,
            'description' => $this->description,
            'topics' => TopicResource::collection($this->whenLoaded('topics'))
        ];
    }
}
