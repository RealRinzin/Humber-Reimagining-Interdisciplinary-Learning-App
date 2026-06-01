<?php

namespace App\Http\Controllers\API\v1;

use App\Models\VideoSection;
use Illuminate\Http\Request;

class VideoSectionController
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(VideoSection $videoSection)
    {

    return $videoSection;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VideoSection $videoSection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VideoSection $videoSection)
    {
        //
    }
}
