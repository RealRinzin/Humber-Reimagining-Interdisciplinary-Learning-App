<?php

namespace App\Http\Resources\Video;

use App\Http\Resources\Code\CodeResource;
use App\Http\Resources\Interactive\InteractiveResource;
use App\Http\Resources\Quiz\QuizResource;
use App\Http\Resources\Rambling\RamblingResource;
use App\Http\Resources\Subtitle\SubtitleResource;
use App\Http\Resources\Topic\TopicResource;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\UserVideo\UserVideoResource;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\UserVideoSetting\UserVideoSettingResource;
use App\Http\Resources\VideoSection\VideoSectionResource;
use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
use App\Models\UserVideo;
use App\Models\UserVideoSetting;
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
            'tldw' => $this->tldw,
            'interactive_path' => $this->interactive_path,
            'video' => $this->video,
            'code' =>$this->code,
            'interactive'=>$this->interactive,
            'rambling'=>$this->rambling,
            'quiz'=>$this->quiz,
            // We will return the count of codes and documents, and the list of codes and documents that are associated with the video
            // The count of codes and documents will be returned in the 'count' key, and the list of codes and documents will be returned in the 'codes' and 'documents' keys respectively
            /**
             * IMPORTANT: We need to return the count of codes and documents, because we want to show the count of codes and documents in the frontend, and we don't want to load all the codes and documents just to get the count, because it will be a performance issue, especially when there are a lot of codes and documents associated with the video
             * We can use the withCount() method in the Video model to get the count of codes and documents, and we can use the whenLoaded() method in the resource to return the list of codes and documents only when they are loaded, so that we can avoid the N+1 problem when we are loading the videos with their associated codes and documents
             * For example, when we are loading the videos with their associated codes and documents in the video details page, we can use the with() method to load the codes and documents, and we can use the withCount() method to get the count of codes and documents, so that we can return the count of codes and documents in the response without having to load all the codes and documents just to get the count
             * In the video details page, we can show the count of codes and documents, and we can also show the list of codes and documents when the user clicks on the count, so that we can provide a better user experience without compromising the performance of the application
             */
            'topic' => new TopicResource($this->whenLoaded("topic")),
            'video_sections' => VideoSectionResource::collection($this->whenLoaded('videoSections')),   
            'subVideos' => VideoResource::collection($this->whenLoaded('subVideos')),
            'codes' => CodeResource::collection($this->whenLoaded("codes")),
            'subtitle' => new SubtitleResource($this->whenLoaded('subtitle')),
            'quizzes' => QuizResource::collection($this->whenLoaded('quizzes')),
            'ramblings' => RamblingResource::collection($this->whenLoaded('ramblings')),
            // 'interactive_demo' => new InteractiveResource($this->whenLoaded('interactive_demo')),
            'interactive_demo' => InteractiveResource::collection($this->whenLoaded('interactive_demo')),
            'total_tracking' => $this->video + $this->code+$this->quiz+$this->rambling+$this->interactive,
            'count' => [
                'codes' => $this->codes_count,
            ],
            'user_video_setting' => new UserVideoSettingResource($this->whenLoaded('user_video_setting')),

        ];
    }
}
