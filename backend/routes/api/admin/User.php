<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class);
