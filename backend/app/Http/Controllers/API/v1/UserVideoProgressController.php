<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\UserVideoProgress\UserVideoProgressResourceCollection;
use App\Models\UserVideoProgress;
use App\Models\Video;
use Illuminate\Http\Request;

class UserVideoProgressController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // return new UserVideoProgressResourceCollection(UserVideoProgress::all());

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserVideoProgress $userVideoProgress, Video $video)
    {
        //
        return "check";
        // $user = 1;
        // if($user !== 1) return;
        // $progress = UserVideoProgress::firstOrNew([
        //     'user_id'  => 1,
        //     'video_id' => $video->id,
        // ]);

        // return new UserVideoProgressResource($progress);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserVideoProgress $userVideoProgress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserVideoProgress $userVideoProgress)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserVideoProgress $userVideoProgress)
    {
        //
    }
}
