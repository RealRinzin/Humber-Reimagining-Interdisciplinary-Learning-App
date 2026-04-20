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
// =============== User Login ===============================| 
// This API is open to public but it will be rate limited by the throttle middleware
/**
 * IMPORTANT API
 * /api/v1/login // This API will be used for user login and it will
 * return the user data and token for the user to access the protected API
 * {
 * id,name,username,role_id,token
 * }
 */
Route::prefix('v1')
    ->name('v1.')
    ->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
    });

// Registeration API
// This API is open to public but it will be rate limited by the throttle middleware
Route::post('/register', [AuthController::class, 'register']);
// Get Logged User session or Token for proxy and middleware
Route::middleware(['web', 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// =============== Authorized Protected API | Session Token ===============================| 

// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware(['auth:sanctum', 'throttle:1000,1'])
    ->group(function () {
        // =============== User Logout | Registeration ===============================| 
        // This API is protected by sanctum middleware and it will be used for user logout
        // This API will revoke the token of the user and it will return a success message

        Route::post('/logout', [AuthController::class, 'logout']);
     // User Controller
        // This API will be used to get the user data and also to update the user data
        // GET /api/v1/users/{user} // This API will return the user data
        // PUT /api/v1/users/{user} // This API will update the user data
        // The API will return the user data
        /**
         * IMPORTANT API
         * /api/v1/users/{user} // This API will return the user data
         * /api/v1/users/{user} // This API will update the user data 
         */
        Route::apiResource('users', UserController::class)->except(['create', 'edit']);
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

        // User Topics API
        // This API will be used to get the topics of the user and also to add or remove topics from the user
        // GET /api/v1/user-topics/users/{user}/topics // This API will return the topics of the user
        // POST /api/v1/user-topics/users/{user}/topics // This API will add a topic to the user
        // DELETE /api/v1/user-topics/users/{user}/topics/{topic:id} // This API will remove a topic from the user
        // The API will return the user data and the topic data
        /**
         * IMPORTANT API
         * /api/v1/user-topics/users/{user}/topics // This API will return the topics of the user
         * /api/v1/user-topics/users/{user}/topics // This API will add a topic to the user
         * /api/v1/user-topics/users/{user}/topics/{topic:id} // This API will remove a topic from the user 
         */
        Route::controller(UserTopicController::class)->prefix('user-topics/users/{user}')->group(function () {
            Route::get('/topics', 'index')->name('user-topics.index');
            // Route::get('/topics/{topic:id}', 'show')->name('user-topics.show');
            Route::post('/topics', 'store')->name('user-topics.store');
            Route::delete('/topics/{topic:id}', 'destroy')->name('user-topics.destroy');
        });
        // User Videos API
        // This API will be used to get the videos of the user and also to add or remove videos from the user
        // GET /api/v1/user-videos/users/{user}/videos // This API will return the videos of the user
        // POST /api/v1/user-videos/users/{user}/videos // This API will add a video to the user
        // DELETE /api/v1/user-videos/users/{user}/videos/{video:id} // This API will remove a video from the user
        // The API will return the user data and the video data
        /**
         * IMPORTANT API
         * /api/v1/user-videos/users/{user}/videos // This API will return the videos of the user
         * /api/v1/user-videos/users/{user}/videos // This API will add a video to the user
         * /api/v1/user-videos/users/{user}/videos/{video:id} // This API will remove a video from the user 
         */
        Route::controller(UserVideoController::class)->prefix('user-videos/users/{user}')->group(function () {
            Route::get('/videos', 'index')->name('user-videos.index');
            Route::post('/videos', 'store')->name('user-videos.store');
            Route::delete('/videos/{video:id}', 'destroy')->name('user-videos.destroy');
        });
        // === Code Controller ==
        // This API will be used to get the codes of the user and also to add or remove codes from the user
        // GET /api/v1/codes/users/{user}/codes // This API will return the codes of the user
        // POST /api/v1/codes/users/{user}/codes // This API will add
        // DELETE /api/v1/codes/users/{user}/codes/{code:id} // This API will remove a code from the user
        // The API will return the user data and the code data
        /**
         * IMPORTANT API
         * /api/v1/codes/users/{user}/codes // This API will return the codes of the user
         * /api/v1/codes/users/{user}/codes // This API will add a code to the user
         * /api/v1/codes/users/{user}/codes/{code:id} // This API will remove a code from the user 
         */
        Route::apiResource('codes', CodeController::class)->except(['create', 'edit']);


        // === Video Controller ==
        // This API will be used to get the videos and also to add or remove videos from the user
        // GET /api/v1/videos // This API will return all the videos
        // GET /api/v1/videos/{video:id} // This API will return the video data
        // POST /api/v1/videos // This API will add a video to the user
        // GET /api/v1/videos/{video}/users // This API will return the users who have added the video to their list
        // The API will return the video data and the user data
        /**
         * IMPORTANT API
         * /api/v1/videos // This API will return all the videos
         * /api/v1/videos/{video:id} // This API will return the video data
         * /api/v1/videos // This API will add a video to the user
         * /api/v1/videos/{video}/users // This API will return the users who have added the video to their list 
         */
        Route::controller(VideoController::class)->prefix('videos')->group(function () {
            Route::get('/', 'index')->name('videos.index');
            Route::get('/{video:id}', 'show')->name('videos.show');
            Route::post('/', 'store')->name('video.store');
            Route::get('/{video}/users', 'users')->name('videos.users');
        });

    });
