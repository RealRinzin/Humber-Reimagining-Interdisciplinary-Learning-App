<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Topic\TopicResource;
use App\Http\Resources\User\UserResource;
use App\Models\Topic;
use App\Models\User;
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
        $topics = Topic::where('title', 'like', '%' . $request->q . '%')->get();
        return TopicResource::collection($topics);
    }
}
