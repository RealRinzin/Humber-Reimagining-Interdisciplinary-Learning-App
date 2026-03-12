<?php

namespace App\Http\Resources\UserVideoProgress;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVideoProgressResource extends JsonResource
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
            'video' => new VideoResource($this->whenLoaded('video')),
            'user' => new UserResource($this->whenLoaded('user')),
            'tldnw' => $this->tldnw,
            'code' => $this->code,
            // 'is_code_checked' => $this->is_code_checked,
            // 'is_document_checked' => $this->is_document_checked,
            // 'is_overview_checked' => $this->is_overview_checked,
            // 'code_checked_at' => $this->code_checked_at,
            // 'document_checked_at' => $this->document_checked_at,
            // 'overview_checked_at' => $this->overview_checked_at,
        ];
        // return [
        //     'id' => $this->id,
        //     'tldnw' =>$this->tldnw,
        //     'code'=>$this->code,
        //     'video' => new VideoResource($this->whenLoaded('video')), // parent video
        //     'user' => new UserResource($this->whenLoaded('user')), // parent video
        // ];
    }
}
