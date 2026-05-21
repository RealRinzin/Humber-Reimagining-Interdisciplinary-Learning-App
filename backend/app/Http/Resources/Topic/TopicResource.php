<?php

namespace App\Http\Resources\Topic;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Code\CodeResource;
use App\Http\Resources\LessonDocument\LessonDocumentResource;
use App\Http\Resources\Quiz\QuizResource;
use App\Http\Resources\Video\VideoResource;

class TopicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $followedIds = $this->additional['meta']['followed_ids'] ?? [];
        $followedIds = $request->input('followed_ids', []);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description'=>$this->description,
            'node_color' => $this->node_color,
            'x_axis' => $this->x_axis,
            'y_axis' => $this->y_axis,
            'interactive_path' => $this->interactive_path,
            'videos' => VideoResource::collection($this->whenLoaded('videos')),
            'codes' => CodeResource::collection($this->whenLoaded('codes')),
            'documents' => LessonDocumentResource::collection($this->whenLoaded('documents')),
            'quizees' => QuizResource::collection($this->whenLoaded('quizees')),
            'is_following' => in_array($this->id, $followedIds),
            
        ];
    }
}
