<?php

namespace App\Http\Resources\Code;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CodeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return[
            'id'=>$this->id,
            'title'=>$this->title,
            'language'=>$this->language,
            // 'video_id'=>$this->video_id,
            'code'=>$this->code
        ];
    }
}
