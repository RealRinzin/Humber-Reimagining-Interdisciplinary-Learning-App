<?php

namespace App\Http\Resources\VideoWatchHistory;

use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VideoWatchHistoryResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => VideoWatchHistoryResource::collection($this->collection),
        ];
    }
}
