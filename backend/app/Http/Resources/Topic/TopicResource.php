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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'videos' => VideoResource::collection($this->whenLoaded('videos')),
            'codes' => CodeResource::collection($this->whenLoaded('codes')),
            'documents' => LessonDocumentResource::collection($this->whenLoaded('documents')),
            'quizees' => QuizResource::collection($this->whenLoaded('quizees'))
        ];
    }
}
