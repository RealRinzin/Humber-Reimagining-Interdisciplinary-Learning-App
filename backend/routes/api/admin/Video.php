<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\VideoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('videos', VideoController::class)->scoped(['video' => 'id']);
