<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\CodeController;
use Illuminate\Support\Facades\Route;

Route::apiResource('codes', CodeController::class);
