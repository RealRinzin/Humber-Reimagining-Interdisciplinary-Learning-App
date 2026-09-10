<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\SubtitleController;
use Illuminate\Support\Facades\Route;

Route::apiResource('subtitles', SubtitleController::class);
