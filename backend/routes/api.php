<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\CodeController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserTopicController;
use App\Http\Controllers\API\v1\UserVideoController;
use App\Http\Controllers\API\v1\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// 
// 
// To Get the authentication when first access by the user
Route::get('/test', function () {
    return "This working fine";
});

Route::get('/debug-session', function (Request $request) {
    return [
        'session_id'    => session()->getId(),
        'sanctum_user'  => auth('sanctum')->user(),
        'session_data'  => session()->all(),
    ];
});
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// =============== User Login ===============================| 
Route::prefix('v1')
    ->name('v1.')
    ->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
    });


// Get Logged User session or Token for proxy and middleware
Route::middleware(['web','auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// =============== Authorized Protected API | Session Token ===============================| 


// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware(['auth:sanctum', 'throttle:1000,1'])
    ->group(function () {
        // =============== User Logout | Registeration ===============================| 
        // Route::get('/user', fn(Request $request) => $request->user());
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/logout', [AuthController::class, 'logout']);
        // Route::get('/user', function (Request $request) {
        //     return $request->user();
        // });
        /**
         * IMPORTANT API
         *  /api/v1/users/{me}/videos // This api will get all the videos 
         *  /api/v1/users/{me}/videos/{video:id} // This is the default api when user load the particular video  ? progress is tied with it 
         *  {
         * id,title,slug,progress:[]
         * 
         * }
         */

        /**
         * USER TOPICS 
         */
        // Route::apiResource('user-topics', UserTopicController::class)->except(['create', 'edit']);
        Route::controller(UserTopicController::class)->prefix('user-topics/users/{user}')->group(function () {
            Route::get('/topics', 'index')->name('user-topics.index');
            Route::post('/topics', 'store')->name('user-topics.store');
            Route::delete('/topics/{topic:id}', 'destroy')->name('user-topics.destroy');
        });


        Route::apiResource('codes', CodeController::class)->except(['create', 'edit']);

        /**
         * User Videos
         */
        Route::controller(UserVideoController::class)->prefix('user-videos/users/{user}')->group(function () {
            Route::get('/videos', 'index')->name('user-videos.index');
            Route::post('/videos', 'store')->name('user-videos.store');
            Route::delete('/videos/{video:id}', 'destroy')->name('user-videos.destroy');
        });

        /*

        Route::controller(UserController::class)->prefix('users')->group(function () {
            // User
            Route::get('/', 'index');
            Route::get('/{user}', 'show');
            Route::get('/{user}/videos', 'videos');
            Route::get('/{user}/videos/user-video', 'userVideo');
        });
        
        /**
         * 
         * Video Route API Group
         * 
         */
        Route::apiResource('users', UserController::class)->except(['create', 'edit']);

        // Video Controller
        // Route::apiResource('codes', VideoController::class)->except(['create', 'edit']);

        Route::controller(VideoController::class)->prefix('videos')->group(function () {
            Route::get('/', 'index')->name('videos.index');
            Route::get('/{video:id}', 'show')->name('videos.show');
            Route::post('/', 'store')->name('video.store');
            Route::get('/{video}/users', 'users')->name('videos.users');
        });

        /**
         * USER VIDEO API
         */
        Route::controller(UserVideoController::class)->prefix('user_video')->group(function () {
            // Video
            Route::get('/{userVideo}', 'show')->name('user_video.show');
            Route::post('/', 'store')->name('user_videos.store');
        });
    });
