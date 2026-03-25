<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\TopicController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

Route::get('/', function () {
    return view('welcome');
});
// Route::prefix('v1')->name('v1.')->group(function () {
//     Route::get('/topics', [TopicController::class, 'index']);
//     Route::get('/topics/{topic}', [TopicController::class, 'show']);
// });