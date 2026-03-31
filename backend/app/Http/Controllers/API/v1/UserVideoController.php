<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\UserVideo\CreateUpdateUserVideoAction;
use App\DTOs\UserVideo\CreateUpdateUserVideoDTO;
use App\Http\Requests\UserVideo\CreateUpdateRequest;
use App\Http\Resources\Video\VideoResource;
use App\Models\User;
use App\Models\UserVideo;
use App\Models\Video;
use Illuminate\Http\Request;

use function Pest\Laravel\get;

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
    public function store(CreateUpdateRequest $request, CreateUpdateUserVideoAction $action)
    {

        $userVideo = $action->execute(CreateUpdateUserVideoDTO::fromRequest($request), $request->user()->id);
        return response()->json($userVideo, $userVideo->wasRecentlyCreated ? 201 : 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $userVideo = UserVideo::where('user_id', $request->user()->id)
            ->where('video_id', $id)
            ->first();
        // Return JSON response
        return response()->json([
            'data' => $userVideo ?? null,
        ]);
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
