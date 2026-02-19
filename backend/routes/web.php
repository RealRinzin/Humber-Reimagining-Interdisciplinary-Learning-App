<?php

use App\Http\Controllers\API\v1\TopicController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::prefix('v1')->name('v1.')->group(function () {
    Route::get('/topics', [TopicController::class, 'index']);
    Route::get('/topics/{topic}', [TopicController::class, 'show']);
});