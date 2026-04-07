<?php

namespace App\Http\Resources\UserTopic;

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

            'id'=> $this->id,
            'users' => new UserResource($this->users), // One - one call Get the all the related documents of the video
        ];
    }
}
