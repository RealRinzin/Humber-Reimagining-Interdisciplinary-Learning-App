<?php

namespace App\Http\Resources\Video;

use App\Http\Resources\Code\CodeResource;
use App\Http\Resources\Document\DocumentResource;
use App\Http\Resources\LessonDocument\LessonDocumentResource;
use App\Http\Resources\Quiz\QuizResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\UserVideo\UserVideoResource;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
use App\Models\LessonDocument;
use App\Models\UserVideo;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            'slug' => $this->slug,
            'parent_id' => $this->parent_id,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'video_url' => $this->video_url,
            'duration' => $this->duration,
            // Count each resources
            'count' => [
                'codes' => $this->codes_count,
                'documents' => $this->documents_count,
            ],
            'codes' => CodeResource::collection($this->whenLoaded("codes")),
            'documents' => LessonDocumentResource::collection(
                $this->whenLoaded('documents')
            ),

        ];
    }
}
