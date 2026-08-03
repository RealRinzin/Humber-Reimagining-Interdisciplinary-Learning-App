<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Resources\Admin\NodeGroups\NodeGroupResource;
use App\Models\NodeGroup;
use Illuminate\Http\Request;

class NodeGroupController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    $nodeGroups = NodeGroup::with('topics')->get();
    return NodeGroupResource::collection($nodeGroups);
        // return response()->json(
        //     NodeGroupResource::collection(NodeGroup::all())
        // );
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
    public function show(NodeGroup $nodeGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NodeGroup $nodeGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NodeGroup $nodeGroup)
    {
        //
    }
}
