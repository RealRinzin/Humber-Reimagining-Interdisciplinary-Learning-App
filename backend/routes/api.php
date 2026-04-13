<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\TopicNodeController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserTopicController;
use App\Http\Controllers\API\v1\UserVideoController;
use App\Http\Controllers\API\v1\UserVideoProgressController;
use App\Http\Controllers\API\v1\VideoController;
use App\Http\Controllers\API\v1\TopicVideoController;
use App\Models\UserVideoAnalytic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
// To Get the authentication when first access by the user
// Route::get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware(['web', 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware(['auth:sanctum', 'throttle:1000,1'])
    ->group(function () {
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

        // User Topics
        /**
         * USER TOPICS 
         */
        // Route::apiResource('user-topics', UserTopicController::class)->except(['create', 'edit']);
        Route::controller(UserTopicController::class)->prefix('user-topics/users/{user}')->group(function () {
            Route::get('/topics', 'index')->name('user-topics.index');
            Route::post('/topics', 'store')->name('user-topics.store');
            Route::delete('/topics/{topic:id}', 'destroy')->name('user-topics.destroy');
        });

        // Topic Video Relationship
        /**
         *
         */
        Route::controller(TopicVideoController::class)->prefix('topic-videos/topics/{topicNode}')->group(function () {
            Route::get('/videos', 'index')->name('topic-videos.index');
            Route::post('/videos', 'store')->name('topic-videos.store');
            Route::delete('/videos/{video}', 'destroy')->name('topic-videos.destroy');
        });
        /**
         * USER API
         */
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
        // TopicNode
        Route::controller(TopicNodeController::class)->prefix('nodes')->group(function () {
            // Index Call
            Route::get('/', 'index')->name('nodes.index');
            Route::get('/{id}', 'show')->name('nodes.show');
        });
        /**
         * 
         * Video Route API Group
         */
        // 
        Route::controller(VideoController::class)->prefix('videos')->group(function () {
            Route::get('/', 'index')->name('videos.index');
            Route::get('/{video:slug}', 'show')->name('videos.show');
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



        /**
         * NOTES
         *  - When user clicked or landed on any video topic, we only need to user the video api (api/v1/videos/{video:id} - with its code,document stuff)
         *  - For the progress bar at the left, we need to use the video's and logged's id to fetch the details
         *  - For the Tabs, we need to use same video's id and authenticated user's detail to check the status of each tab
         *  - For the lesson or overview progress at the right, we need to use more calculation and resource api
         */


        // User Video API Controller
        // Route::get('users/{me}/videos/{video}', [UserController::class, 'videos']);
        // User Progress 
        Route::get('/progress', [UserVideoProgressController::class, 'index']);
        Route::get('/users/{user}/progress/{progress}', [UserVideoProgressController::class, 'user']);
        // Route::get('/videos/{video}/progress', [UserVideoProgressController::class, 'show']);
        // Route::get('users/{user:id}/videos/{video}/progress', [UserVideoProgressController::class, 'show']);

        /**
         *
         *  USER VIDEO ANALYTIC
         * API ENDPOINTS
         * 
         */
        Route::controller(UserVideoAnalytic::class)->group(function () {
            // Route::post('/user_video_analytic', [UserVideoAnalyticController::class, 'store']);
        });
        /**
         * 
         * ----------- TEST API BELOW----------------
         * User With Video API with its code, document 
         * 
         */
        // // API for the all videos resources of the User
        // Route::get('/users/{user}/videos', [UserController::class, 'index']); // This is for all the video of the user
        // API for the specific video resources of the User
        // Route::get('/users/{user}/videos/{video}', [UserController::class, 'index']);

        // Logout
        // Route::post('/logout', [AuthController::class, 'logout']);
    });
