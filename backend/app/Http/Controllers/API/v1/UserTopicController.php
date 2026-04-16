<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Topic\TopicResource;
use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Http\Resources\UserTopic\UserTopicResource;
use App\Models\Topic;
use App\Models\TopicNode;
use App\Models\User;
use App\Models\UserTopic;
use Illuminate\Http\Request;

class UserTopicController
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        // 
        return TopicResource::collection($user->topics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        // return "testting";
        $request->validate([
            'topic_ids'   => 'required|array',
            'topic_ids.*' => 'exists:topics,id',
        ]);

        // syncWithoutDetaching = attach only NEW ones, skip duplicates
        $user->topics()->syncWithoutDetaching($request->topic_ids);

        return TopicResource::collection($user->topics()->get());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, Topic $topic)
    {


        $exists = $user->topics()->where('topic_id', $topic->id)->exists();
        /**
         * Relationship not Found
         */
        if (!$exists) {
            return response()->json([
                'message' => 'Topic not found for this user.'
            ], 404);
        }
        // Detached recordcd
        $user->topics()->detach($topic->id);

        return response()->noContent(); // 204
    }
}
