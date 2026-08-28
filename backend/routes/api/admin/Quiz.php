<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\QuizController;
use Illuminate\Support\Facades\Route;

Route::apiResource('quizzes', QuizController::class);
