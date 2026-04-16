<?php

namespace App\Http\Resources\UserTopic;

use App\Http\Resources\Topic\TopicResource;
use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserTopicResource extends JsonResource
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
            'user'       => new UserResource($this->whenLoaded('user')),
            'topics' => new TopicResource($this->whenLoaded('topic')),
        ];
    }
}
