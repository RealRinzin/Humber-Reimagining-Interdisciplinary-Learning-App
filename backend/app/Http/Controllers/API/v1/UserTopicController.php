<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Topic\TopicResource;
use App\Models\Topic;
use App\Models\User;
use App\Models\UserTopic;
use Illuminate\Http\Request;

class UserTopicController
{
    /**
     * Display a listing of the resource.
     */
    // This API will return the list of topics for a specific user
    // GET /api/v1/user-topics/users/{user}/topics
    // The API will return the user data and the topic data
    public function index(User $user)
    {

        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        // return $user->topics; // return the topics of the user
        /** Eager Loading
         * Eager loading is a powerful technique in Laravel that allows you to load related models along with the main model in a single query. This can significantly improve performance by reducing the number of database queries needed to retrieve related data.
         * In this case, we are eager loading the 'topics' relationship on the User model. This means that when we retrieve the user, we also retrieve all of their associated topics in one query, rather than making separate queries for each topic.
         * By using eager loading, we can avoid the N+1 query problem, where N is the number of related records. Instead of executing one query to get the user and then N additional queries to get each topic, we execute just two queries: one for the user and one for all related topics.
         */
        $user = User::with(['topics'])->findOrFail($user->id);
        return TopicResource::collection($user->topics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // UserTopic::updateOrCreate(
        //     ['user_id' => $user->id, 'topic_id' => $topic->id],  // match condition
        //     ['started' => false]                                   // values to set
        // );

        // Original Code
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
