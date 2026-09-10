<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Resources\Project\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $project = Project::with('teams')->first();
        return new ProjectResource($project);
    }
}
