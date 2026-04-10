<?php

namespace App\Http\Resources\TopicNode;

use App\Http\Resources\Code\CodeResource;
use App\Http\Resources\FlashCard\FlashCardResource;
use App\Http\Resources\LessonDocument\LessonDocumentResource;
use App\Http\Resources\Quiz\QuizResource;
use App\Http\Resources\Video\VideoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicNodeResource extends JsonResource
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
            'title' =>$this->title,
            'videos' => VideoResource::collection($this->whenLoaded('videos')),
            
            'codes' => CodeResource::collection($this->whenLoaded('codes')),
            'documents' => LessonDocumentResource::collection($this->whenLoaded('documents')),
            'flash_cards' => FlashCardResource::collection($this->whenLoaded('flash_cards')),
            'quizees' => QuizResource::collection($this->whenLoaded('quizees'))
        ];
    }
}
