<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\TopicNode\TopicNodeResource;
use App\Http\Resources\UserTopic\UserTopicResource;
use App\Models\TopicNode;
use App\Models\UserTopic;
use Illuminate\Http\Request;

class UserTopicController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $userTopics = UserTopic::with(['user', 'topicNode'])->paginate(10);
        return UserTopicResource::collection($userTopics);
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
    public function show(UserTopic $userTopic)
    {
        //
        return $userTopic::get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserTopic $userTopic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserTopic $userTopic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserTopic $userTopic)
    {
        //
    }
}
