<?php

use App\Http\Controllers\API\V1\Admin\TopicController;
use Illuminate\Support\Facades\Route;


Route::apiResource('topics',TopicController::class);