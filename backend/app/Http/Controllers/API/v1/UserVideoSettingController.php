<?php

namespace App\Http\Controllers\API\v1;

use App\Models\UserVideoSetting;
use Illuminate\Http\Request;

class UserVideoSettingController
{
    /**
     * Display a listing of the resource.
     */
    public function index( $videoId)
    {
        // Returns the User setting for this specific video by
        // using the auth guard(me) and video id from the endpoint
        $setting = UserVideoSetting::where('user_id', auth()->id())
            ->where('video_id', $videoId)
            ->first();
        return response()->json(['data' => $setting]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$videoID)
    {
        return $request->all();
    $setting = UserVideoSetting::updateOrCreate(
        // find by these fields
        [
            'user_id'  => auth()->id(),
            'video_id' => $videoID,
        ],
        // create or update with these values
        [
            'code'        => true,
            'interactive' => true,
            'rambling'    => true,
            'quiz'        => true,
        ]
    );

    return response()->json(['data' => $setting]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserVideoSetting $userVideoSetting)
    {
        //
    }
}
