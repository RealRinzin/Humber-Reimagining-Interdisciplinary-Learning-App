<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\Video\CreateVideoAction;
use App\DTOs\Video\CreateVideoDTO;
use App\Http\Requests\Video\StoreVideoRequest;
use App\Http\Resources\Video\VideoResource;
use App\Http\Resources\Video\VideoResourceCollection;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Load
        $videos = Video::with(['codes', 'documents'])
            ->paginate();

        return new VideoResourceCollection($videos);
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
    // public function register(StoreUserRequest $request, CreateUserAction $action)

    public function store(StoreVideoRequest $request, CreateVideoAction $action)
    {

        $dto = CreateVideoDTO::fromRequest($request);
        // Assign the return to new Variable
        $newVideo = $action->execute($dto);
        return $newVideo;
    }

    /**
     * Display the specified resource.
     */
    // public function show(Video $video)
    public function show(Video $video)
    {

        $video->load(['codes', 'documents'])
            ->loadCount(['codes', 'documents']);
        return new VideoResource($video);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        //
    }
}
