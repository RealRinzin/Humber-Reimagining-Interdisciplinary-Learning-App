<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
use App\Http\Resources\UserVideoProgress\UserVideoProgressResourceCollection;
use App\Models\UserVideoProgress;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserVideoProgressController
{

    private function authorizeUser($userId)
    {
        abort_if(auth()->id() != $userId, 403, 'Forbidden.');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return UserVideoProgress::with(['video', 'user'])->get();

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
    public function show(Request $request,$userId)
    {


        // $this->authorizeUser($userId);
        return 'Approved';
        //
        // return "check";
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


    // User 
    public function user(Request $request,$userId)
    {
        // return $request->user();
        $this->authorizeUser($userId);
        $progress = UserVideoProgress::with(['video'])
            ->where('user_id', $userId)
            ->get();

        return UserVideoProgressResource::collection($progress);
    }
}
