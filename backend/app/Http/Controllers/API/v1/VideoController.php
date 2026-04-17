<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Video\VideoResource;
use App\Http\Resources\Video\VideoResourceCollection;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // 
        return Video::get();

        // return new VideoResourceCollection(Video::get());
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
    // public function show(Video $video)
    public function show(Video $video)
    {
        // $video = Video::with('videoWatchHistory','userVideo')
        // ->where('slug', $video->slug)
        // ->firstOrFail();
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
