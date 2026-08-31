<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\RamblingController;
use Illuminate\Support\Facades\Route;

Route::apiResource('ramblings', RamblingController::class);
