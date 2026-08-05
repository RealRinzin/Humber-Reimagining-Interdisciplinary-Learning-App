<?php

// Code Table API
use App\Http\Controllers\API\V1\Admin\NodeGroupController;
use Illuminate\Support\Facades\Route;

// Route::apiResource('node_groups', NodeGroupController::class);

Route::prefix('node_groups')->group(function () {
    Route::get('list', [NodeGroupController::class, 'list']);
    Route::apiResource('/', NodeGroupController::class);
});
