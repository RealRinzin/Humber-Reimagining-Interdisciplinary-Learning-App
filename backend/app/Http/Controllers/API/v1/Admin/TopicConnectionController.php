<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicConnectionController
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
        return $request;
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function attachConnections(Request $request, Topic $topic)
{
    $validated = $request->validate([
        'connection_ids' => ['required', 'array'],
        'connection_ids.*' => ['integer', 'exists:connections,id'],
    ]);

    $topic->connections()->sync($validated['connection_ids']);

    return response()->json($topic->load('connections'));
}
}
