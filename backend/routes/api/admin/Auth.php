<?php

use App\Http\Controllers\API\V1\Admin\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/upload', [AuthController::class, 'upload']);
