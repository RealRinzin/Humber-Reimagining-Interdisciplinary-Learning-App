<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Topic\TopicResource;
use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Http\Resources\UserTopic\UserTopicResource;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\Video\VideoResource;
use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
use App\Models\UserTopic;
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
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'topics' => TopicResource::collection($this->whenLoaded('topics')),
            'count' => $this->topics->count(),
        ];
    }
}
