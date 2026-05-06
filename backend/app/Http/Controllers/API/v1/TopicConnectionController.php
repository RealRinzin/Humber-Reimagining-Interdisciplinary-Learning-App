<?php

namespace App\Http\Controllers\API\v1;

use App\Models\TopicConnection;
use Illuminate\Http\Request;

class TopicConnectionController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return TopicConnection::get();
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
    public function show(TopicConnection $topicConnection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TopicConnection $topicConnection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TopicConnection $topicConnection)
    {
        //
    }
}
