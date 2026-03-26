<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\TopicController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
