<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserResourceCollection;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\Video\VideoResource;
use App\Http\Resources\Video\VideoResourceCollection;
use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
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


        // $user = User::with('videoWatchHistory.video')->find(3);
        // $videos = $user->videoWatchHistory
        //     ->groupBy('video_id') // group multiple interactions per video
        //     ->map(function ($histories) {
        //         $video = $histories->first()->video; // take video metadata once

        //         return [
        //             'id' => $video->id,
        //             'title' => $video->title,
        //             'videoWatchHistory' => $histories->map(function ($h) {
        //                 return [
        //                     'paused_at' => $h->paused_at,
        //                     'device_type' => $h->device_type,
        //                     'created_at' => $h->created_at
        //                 ];
        //             })
        //         ];
        //     })->values();
        // return response()->json([
        //     'user_id' => $user->id,
        //     'videos' => $videos
        // ]);
        // 2. Return via the Resource Collection
        return new UserResourceCollection(User::with('videoWatchHistory.video')->get());
        // return new UserResourceCollection(User::with('video')->get());
        // User::with('videoWatchHistory')->get()
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
        // $user->load('videoWatchHistory');

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
        // return Video::with(['document', 'code', 'userVideoProgress'])->get();
        // return VideoResource::collection(
        //     Video::with('videoWatchHistory')->get()
        // );
        return VideoWatchHistoryResource::collection(
            $request->user()
                ->videoWatchHistory()
                ->with('video')  // eager load parent video
                ->get()
        );
    }
}
