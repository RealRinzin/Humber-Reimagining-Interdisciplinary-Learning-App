<?php

use App\Http\Controllers\API\V1\Admin\TopicController;
use Illuminate\Support\Facades\Route;

Route::apiResource('topics',TopicController::class)->scoped(['topic' => 'id']);
Route::post('/topics/{topic:id}/connections', [TopicController::class, 'attachConnections']);
Route::patch('/topics/{topic:id}/visibility', [TopicController::class, 'visibility']);