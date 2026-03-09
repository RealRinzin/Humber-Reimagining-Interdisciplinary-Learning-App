<?php

use App\Http\Controllers\API\v1\TopicController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserVideoProgressController;
use App\Http\Controllers\API\v1\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')->name('v1.')->group(function () {
    Route::get('/topics', [TopicController::class, 'index']);
    Route::get('/topics/{topic:slug}', [TopicController::class, 'show']);


    // Video
    Route::get('/videos', [VideoController::class, 'index']);
    Route::get('/videos/{video:id}', [VideoController::class, 'show']);
    Route::get('videos/{video}/users', [VideoController::class, 'users']);


    // User
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user:id}', [UserController::class, 'show']);
    Route::get('users/{user}/videos', [UserController::class, 'videos']);
    // User Progress 
    // Route::get('/videos/{video}/progress', [UserVideoProgressController::class, 'show']);
    Route::get('users/{user}/videos/{video}/progress', [UserVideoProgressController::class, 'show']);


    /**
     * User With Video API with its code, document 
     * 
     */
    // API for the all videos resources of the User
    Route::get('/users/{user}/videos', [UserController::class, 'index']); // This is for all the video of the user
    // API for the specific video resources of the User
    Route::get('/users/{user}/videos/{video}', [UserController::class, 'index']);

});
