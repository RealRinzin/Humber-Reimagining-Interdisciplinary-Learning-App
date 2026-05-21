<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Topic\TopicResource;
use App\Http\Resources\User\UserResource;
use App\Models\Quiz;
use App\Models\Topic;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return User::with(['user_topics'])->get();

        $users = User::with(['topics', 'videos.topic'])->get();
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $token = $request->user()->createToken($request->token_name);
        return ['token' => $token->plainTextToken];
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, Request $request)
    {
        // return $request->user()->id;
        $user = User::with(['userVideoSetting', 'userVideos', 'topics'])->findOrFail($request->user()->id);
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // Profile
    public function profile(Request $request)
    {
        return new UserResource(
            $request->user()->load(['userVideoSetting', 'userVideos', 'topics'])
        );
    }

    // User Video Controller

    public function userVideo()
    {
        return User::get();
    }

    /**
     * Search for topics
     */


    public function search(Request $request)
    {
        // return $request;
        // $topics = Topic::where('title', 'like', '%' . $request->q . '%')->get();
        // return TopicResource::collection($topics);

        $q = $request->q;

        $perPage = $request->per_page ?? 40;

        $topics = Topic::where('title', 'like', '%' . $q . '%')->get()
            ->map(fn($item) => ['type' => 'topic', 'id' => $item->id, 'title' => $item->title, 'slug' => $item->slug, 'description' => $item->description, 'node_color' => $item->node_color, 'x_axis' => $item->x_axis, 'y_axis' => $item->y_axis]);

        $videos = Video::where('title', 'like', '%' . $q . '%')->get()
            ->map(fn($item) => ['type' => 'video', 'id' => $item->id, 'title' => $item->title, 'slug' => $item->slug, 'description' => $item->description, 'node_color' => $item->node_color,]);

        $quizzes = Quiz::where('question', 'like', '%' . $q . '%')->get()
            ->map(fn($item) => ['type' => 'quiz', 'id' => $item->id, 'title' => $item->description, 'question' => $item->question, 'node_color' => $item->node_color]);

        $merged = $topics->concat($videos)->concat($quizzes);

        $page    = $request->page ?? 1;
        $total   = $merged->count();
        $items   = $merged->forPage($page, $perPage)->values();

        return response()->json([
            'data'          => $items,
            'total'         => $total,
            'per_page'      => $perPage,
            'current_page'  => (int) $page,
            'last_page'     => (int) ceil($total / $perPage),
        ]);
    }
}
