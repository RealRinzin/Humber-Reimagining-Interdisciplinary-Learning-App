<?php

use App\Http\Controllers\API\V1\Admin\TopicConnectionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('topic_connections',TopicConnectionController::class)->scoped(['topic' => 'id']);
// routes/api.php