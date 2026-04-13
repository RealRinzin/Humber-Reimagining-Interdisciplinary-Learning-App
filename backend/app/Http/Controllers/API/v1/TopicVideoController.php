<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Http\Resources\Video\VideoResource;
use App\Models\TopicNode;
use App\Models\Video;
use Illuminate\Http\Request;

class TopicVideoController
{
    /**
     * Display a listing of the resource.
     */
    public function index(TopicNode $topic)
    {
        return $topic;
        return TopicNodeResource::collection($topic->videos);

//         // return $topicNodes;
//         $topicNodes = TopicNode::first();
// dd($topicNodes->videos);
//         return response()->json($topic->videos); // correct
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
    public function show()
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
