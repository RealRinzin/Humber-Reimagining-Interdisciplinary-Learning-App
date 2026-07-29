<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Actions\Admin\Videos\StoreVideoAction;
use App\Actions\Admin\Videos\UpdateVideoAction;
use App\DTOs\Admin\Videos\StoreVideoDTO;
use App\DTOs\Admin\Videos\UpdateVideoDTO;
use App\Http\Requests\Admin\Videos\StoreVideoRequest;
use App\Http\Requests\Admin\Videos\UpdateVideoRequest;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoRequest $request, StoreVideoAction $action)
    {
        $dto = StoreVideoDTO::fromRequest($request); // Create a DTO from the request data
        $video = $action->execute($dto); // Create a new video using the action class
        return $video->fresh();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVideoRequest $request, UpdateVideoAction $action, Video $video)
    {
        $dto = UpdateVideoDTO::fromRequest($request);
        $update = $action->execute($video, $dto);
        return $update;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        if (!$video) {
            return back()->with('error', 'Topic not found.');
        }
        $video->delete();
    }
}
