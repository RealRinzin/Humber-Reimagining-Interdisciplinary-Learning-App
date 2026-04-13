<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Http\Resources\UserTopic\UserTopicResource;
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
        return TopicNodeResource::collection($user->topics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        // return "testting";
        $request->validate([
            'topic_node_ids'   => 'required|array',
            'topic_node_ids.*' => 'exists:topic_nodes,id',
        ]);

        // syncWithoutDetaching = attach only NEW ones, skip duplicates
        $user->topics()->syncWithoutDetaching($request->topic_node_ids);

        return TopicNodeResource::collection($user->topics()->get());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, TopicNode $topic)
    {


        $exists = $user->topics()->where('topic_node_id', $topic->id)->exists();
        /**
         * Relationship not Found
         */
        if (!$exists) {
            return response()->json([
                'message' => 'Topic not found for this user.'
            ], 404);
        }
        // Detached record
        $user->topics()->detach($topic->id);

        return response()->noContent(); // 204
    }
}
