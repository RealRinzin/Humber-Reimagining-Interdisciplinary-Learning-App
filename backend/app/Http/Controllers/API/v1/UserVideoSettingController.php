<?php

namespace App\Http\Controllers\API\v1;

use App\Models\UserVideoSetting;
use Illuminate\Http\Request;

class UserVideoSettingController
{
    /**
     * Display a listing of the resource.
     */
    public function index($videoId)
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
    public function update(Request $request, $videoID)
    {
        $setting = UserVideoSetting::updateOrCreate(
            [
                'user_id'  => auth()->id(),
                'video_id' => (int) $videoID, // ← cast to int
            ],
            [
                'code'                        => $request->code,
                'interactive'                 => $request->interactive,
                'rambling'                    => $request->rambling,
                'quiz'                        => $request->quiz,
                'code_checked_with_all'       => $request->code_checked_with_all,
                'rambling_checked_with_all'       => $request->rambling_checked_with_all,
                'quiz_checked_with_all'       => $request->quiz_checked_with_all,
                'interactive_checked_with_all' => $request->interactive_checked_with_all,
                'all_checked'                 => $request->all_checked,
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
