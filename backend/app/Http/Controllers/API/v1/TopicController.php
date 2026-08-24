<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Topic\TopicResource;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tabs = ['code', 'quiz', 'interactive', 'rambling', 'all_checked'];
        $topics = Topic::with(['videos.user_video_setting'])->get();

        $followedIds = $request->user()
            ?->topics()
            ->pluck('topics.id')
            ->toArray() ?? [];
        $request->merge(['followed_ids' => $followedIds]);

        return TopicResource::collection($topics);
    }
}
