<?php

namespace App\Http\Resources\Admin\Topics;

use App\Http\Resources\Admin\Videos\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
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
            'node_group_id' => $this->node_group_id,
            'description' => $this->description,
            'node_color' => $this->node_color,
            'x_axis' => $this->x_axis,
            'y_axis'  => $this->y_axis,
            'video' => $this->video,
            'code' => $this->code,
            'interactive' => $this->interactive,
            'rambling' => $this->rambling,
            'quiz' => $this->quiz,
            'student_visible' => $this->student_visible,
            'interactive_path' => $this->interactive_path,
            'videos' => VideoResource::collection($this->whenLoaded('videos')),

        ];
    }
}
