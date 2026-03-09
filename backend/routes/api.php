<?php

use App\Http\Controllers\API\v1\TopicController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserTopicMetricController;
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
    // User
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user:id}', [UserController::class, 'show']);
    // Route::get('/users', [UserTopicMetricController::class, 'index']);

    // Route::post('/tokens/create', function (Request $request) {
    //     $token = $request->user()->createToken($request->token_name);

    //     return ['token' => $token->plainTextToken];
    // });
});
