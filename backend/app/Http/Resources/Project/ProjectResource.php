<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\Team\TeamResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'title'=>$this->title,
            'heading'=>$this->heading,
            "description" => $this->description,
            "sponsor" => $this->sponsor,
            "thumbnail" =>$this->thumbnail,
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,

            'teams' => TeamResource::collection($this->whenLoaded('teams')),
            'count' => $this->teams->count(),
        ];
    }
}
