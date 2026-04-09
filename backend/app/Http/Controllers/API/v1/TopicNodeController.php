<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Models\TopicNode;
use Illuminate\Http\Request;

class TopicNodeController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topicNode = TopicNode::with(['videos', 'codes', 'documents', 'flash_cards', 'quizees'])->paginate(2); // ✅ always paginate
        return TopicNodeResource::collection($topicNode);
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
    public function show(TopicNode $topicNode)
    {

        return $topicNode::get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TopicNode $topicNode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TopicNode $topicNode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TopicNode $topicNode)
    {
        //
    }
}
