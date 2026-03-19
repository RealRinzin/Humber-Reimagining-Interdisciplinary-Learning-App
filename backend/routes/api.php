<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\Controller;
use App\Http\Controllers\API\v1\TopicController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserVideoAnalyticController;
use App\Http\Controllers\API\v1\UserVideoController;
use App\Http\Controllers\API\v1\UserVideoProgressController;
use App\Http\Controllers\API\v1\VideoController;
use App\Models\UserVideo;
use App\Models\UserVideoAnalytic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

Route::get('users/{user}/videos/{video}/progress', [UserVideoProgressController::class, 'show']);

// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware(['auth:sanctum', 'throttle:60,1'])
    ->group(function () {
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
         * USER API
         */
        Route::controller(UserController::class)->group(function () {
            // User
            Route::get('/users', [UserController::class, 'index']);
            Route::get('/users/{user:id}', [UserController::class, 'show']);
            Route::get('users/{id}/videos', [UserController::class, 'videos']);
            Route::get('/users/{me}/videos/1/user_video', [UserController::class, 'userVideo']);
            Route::get('/userVideos', [UserController::class, 'userVideo']);
        });
        /**
         * 
         * Video Route API Group
         * 
         */
        Route::controller(VideoController::class)->group(function () {
            Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
            Route::get('/videos/{video:slug}', [VideoController::class, 'show'])->name('videos.show');
            Route::get('videos/{video}/users', [VideoController::class, 'users']);
        });


        /**
         * USER VIDEO API
         */
        Route::controller(UserVideoController::class)->group(function () {
            // Video
            Route::get('/user_videos/{user_video}', [UserVideoController::class, 'show'])->name('user_videos.show');
            Route::post('/user_videos', [UserVideoController::class, 'store']);
            // Route::get('/videos/{video:slug}', [VideoController::class, 'show']);
            // Route::get('videos/{video}/users', [VideoController::class, 'users']);
            // Route::get('/user-videos/{userVideo}',[UserVideoController::class,'show']);
            // Route::get('/user-videos/{userVideo}', [UserVideoController::class, 'show']);
        });

        /**
         *
         *  USER VIDEO ANALYTIC
         * API ENDPOINTS
         * 
         */
        Route::controller(UserVideoAnalytic::class)->group(function(){
            Route::post('/user_video_analytic',[UserVideoAnalyticController::class,'store']);
        });

        // TESTING API
        Route::get('/test', [AuthController::class, 'index']);

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
         * ----------- TEST API BELOW----------------
         * User With Video API with its code, document 
         * 
         */
        // // API for the all videos resources of the User
        // Route::get('/users/{user}/videos', [UserController::class, 'index']); // This is for all the video of the user
        // API for the specific video resources of the User
        // Route::get('/users/{user}/videos/{video}', [UserController::class, 'index']);

        // Logout
        Route::post('/logout', [AuthController::class, 'logout']);
    });
