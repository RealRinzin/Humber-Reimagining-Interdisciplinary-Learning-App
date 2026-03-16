<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Video\VideoResource;
use App\Models\User;
use App\Models\UserVideo;
use Illuminate\Http\Request;

class UserVideoController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // return $request->user();
        UserVideo::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'video_id' =>$request->video_id,
            ],
            [
                'watch_minute' => $request->watch_minute?? '0:0'

            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(UserVideo $userVideo)
    {
        return $userVideo::with('user','video')->find($userVideo);
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserVideo $userVideo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserVideo $userVideo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserVideo $userVideo)
    {
        //
    }

    public function userVideo(Request $request)
    {
        $user = User::with('video')->findOrFail($request->user()->id);
        return VideoResource::collection($user->video);
    }
}
