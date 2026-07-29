<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Actions\Admin\Topics\StoreTopicAction;
use App\Actions\Admin\Topics\UpdateTopicAction;
use App\DTOs\Admin\Topics\StoreTopicDTO;
use App\DTOs\Admin\Topics\UpdateTopicDTO;
use App\Http\Requests\Admin\Topics\StoreTopicRequest;
use App\Http\Requests\Admin\Topics\UpdateTopicRequest;
use App\Http\Resources\Topic\TopicResource;
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
        return response()->json(
            TopicResource::collection(Topic::all())
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateTopicRequest $request,Topic $topic,UpdateTopicAction $action )
    public function update(UpdateTopicRequest $request, UpdateTopicAction $action,Topic $topic)
    {
        $dto = UpdateTopicDTO::fromRequest($request);
        $update = $action->execute($topic, $dto);
        return $update;
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
