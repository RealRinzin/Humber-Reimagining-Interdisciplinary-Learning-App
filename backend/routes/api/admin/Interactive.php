<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\InteractiveController;
use Illuminate\Support\Facades\Route;

Route::apiResource('interactives', InteractiveController::class);
