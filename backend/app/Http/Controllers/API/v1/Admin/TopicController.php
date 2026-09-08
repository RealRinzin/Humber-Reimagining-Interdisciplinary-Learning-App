<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Actions\Admin\Topics\StoreTopicAction;
use App\Actions\Admin\Topics\UpdateTopicAction;
use App\DTOs\Admin\Topics\StoreTopicDTO;
use App\DTOs\Admin\Topics\UpdateTopicDTO;
use App\Http\Requests\Admin\Topics\StoreTopicRequest;
use App\Http\Requests\Admin\Topics\UpdateTopicRequest;
use App\Http\Resources\Admin\Topics\TopicResource;
use App\Models\Topic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TopicController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $topics = Topic::with(['videos'])->get();

        return response()->json(
            TopicResource::collection($topics)
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTopicRequest $request, StoreTopicAction $action)
    {
        //
        $dto = StoreTopicDTO::fromRequest($request);
        $topic = $action->execute($dto);
        return $topic->fresh();
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        //
        $topic->load(['videos', 'connectedTopics']);
        return new TopicResource($topic);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateTopicRequest $request,Topic $topic,UpdateTopicAction $action )
    public function update(UpdateTopicRequest $request, UpdateTopicAction $action, Topic $topic)
    {
        $dto = UpdateTopicDTO::fromRequest($request);
        $update = $action->execute($topic, $dto);
        return $update;
        //
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        if (!$topic) {
            return back()->with('error', 'Topic not found.');
        }
        $topic->delete();
    }

    public function attachConnections(Request $request, Topic $topic)
    {
        $validated = $request->validate([
            'connected_topic_ids' => ['required', 'array'],
            'connected_topic_ids.*' => ['integer', 'exists:topics,id'], // ← validate against topics, not topicConnections
        ]);

        $topic->connectedTopics()->sync($validated['connected_topic_ids']);

        return response()->json($topic->load('connectedTopics'));
    }
    // Student visibility
    public function visibility(Topic $topic)
    {
        $topic->update(['student_visible' => !$topic->student_visible]);
        return response()->json($topic);
    }
}
