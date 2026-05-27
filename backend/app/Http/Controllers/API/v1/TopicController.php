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
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Topic $topic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        //
    }
}
