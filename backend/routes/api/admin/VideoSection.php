<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\VideoSectionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('video_sections', VideoSectionController::class);
