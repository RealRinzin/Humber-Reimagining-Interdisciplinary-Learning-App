<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\UserVideo\CreateUpdateUserVideoAction;
use App\DTOs\UserVideo\CreateUpdateUserVideoDTO;
use App\Http\Requests\UserVideo\CreateUpdateRequest;
use App\Http\Resources\User\UserResourceCollection;
use App\Http\Resources\UserVideo\UserVideoResource;
use App\Models\User;
use App\Models\UserVideo;
use Illuminate\Http\Request;

use function Pest\Laravel\get;

class UserVideoController
{

    /**
     * Display a listing of the resource.
     */
    // This API will return the list of videos that the user has watched
    /**
     * @return \Illuminate\Http\Response
     */
    // The response will return the list of videos that the user has watched, along with the watched_at timestamp, and the video details (title, description, etc.)
    // The response will be paginated, and the status code will be 200
    // The API will be protected by authentication, and the user can only access their own watched videos
    // The API will be accessed by the frontend when the user goes to the video details page, and it will show the watched status of the video (watched or not watched), and the watched_at timestamp if the video was watched
    public function index(User $user)
    {
        // The user can only access their own watched videos, so we will check if the authenticated user is the same as the user in the route parameter
        // If the authenticated user is not the same as the user in the route parameter, we will return a 403 forbidden response
        /**
         * IMPORTANT: We need to check if the authenticated user is the same as the user in the route parameter, otherwise we will return a 403 forbidden response, because we don't want the user to access other user's watched videos
         */
        // abort_if(auth()->id() !== $user->id, 403);

        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        // We will return the list of videos that the user has watched, along with the watched_at timestamp, and the video details (title, description, etc.)
        // 
        return UserVideoResource::collection($user->userVideos()->with('video')->get())->additional([
            'total' => $user->userVideos()->count(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // This API will create or update the user video record when the user watches a video
    // If the record already exists, it will update the watched_at timestamp, otherwise it will create a new record
    // The request will contain the video_id and the watched_at timestamp, and the user_id will be taken from the authenticated user
    // The response will return the user video record, and the status code will be 201 if the record was created, or 200 if the record was updated
    /**
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUpdateRequest $request, CreateUpdateUserVideoAction $action)
    {
        $userVideo = $action->execute(CreateUpdateUserVideoDTO::fromRequest($request), $request->user()->id);
        return response()->json($userVideo, $userVideo->wasRecentlyCreated ? 201 : 200);
    }
}
