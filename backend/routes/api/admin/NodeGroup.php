<?php

// Code Table API
use App\Http\Controllers\API\V1\Admin\NodeGroupController;
use Illuminate\Support\Facades\Route;

Route::apiResource('node_groups', NodeGroupController::class);
