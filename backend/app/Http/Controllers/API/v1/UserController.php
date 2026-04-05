<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\UserVideo\UserVideoResource;;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        //
        // return $request->user();
        return User::get();
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
    public function show(User $user)
    {
        $user->load('videoWatchHistory.video');

        return new UserResource($user);
        //
        // return $user;

        // return User::withAvg('userVideoMetric', 'watch_duration')
        //     ->withSum('userVideoMetric', 'watch_duration')
        //     ->withCount('userVideoMetric')->get();
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

    // More Controllers
    public function videos(Request $request)
    {


        // return UserVideo::
        // return $request->user();

        // return "working";
        // $video->load('videoWatchHistory','userVideoProgress'); // eager load relationship on the model instance
        // return new VideoResource(Video::get()); // return as a resource
        // $user->load('userVideoProgress'); // eager load relationship on the model instance
        // return new User($user); // return as a resource

        // return Video::with(['document', 'code', 'userVideoProgress'])->get();
        // return VideoResource::collection(
        //     Video::with('videoWatchHistory')->get()
        // );
        // $video->load('videoWatchHistory', 'userVideoProgress'); // eager load relationship on the model instance
        // return new VideoResource($video); // return as a resource
        return UserVideoResource::collection(
            $request->user()
                ->videoWatchHistory()
                ->with('video')  // eager load parent video
                ->get()
        );
    }



    // User Video Controller

    public function userVideo()
    {
        return User::get();
    }
}
