<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\Controller;
use App\Http\Controllers\API\v1\TopicController;
use App\Http\Controllers\API\v1\TopicNodeController;
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

Route::middleware(['web', 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::get('/nodes', [TopicNodeController::class, 'index'])->name('nodes.index');
// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware(['auth:sanctum', 'throttle:1000,1'])
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
        Route::controller(UserController::class)->prefix('users')->group(function () {
            // User
            Route::get('/', 'index');
            Route::get('/{user}', 'show');
            Route::get('/{user}/videos', 'videos');
            Route::get('/{user}/videos/user_video', 'userVideo');
        });
        /**
         * 
         * Video Route API Group
         * 
         */
        Route::controller(TopicNodeController::class)->prefix('nodes')->group(function () {
            // Index Call
            Route::get('/', 'index')->name('nodes.index');
        });
        /**
         * 
         * Video Route API Group
         * 
         */
        Route::controller(VideoController::class)->prefix('videos')->group(function () {
            Route::get('/', 'index')->name('videos.index');
            Route::get('/{video:slug}', 'show')->name('videos.show');
            Route::get('/{video}/users', 'users')->name('videos.users');
        });

        /**
         * USER VIDEO API
         */
        Route::controller(UserVideoController::class)->prefix('user_videos')->group(function () {
            // Video
            Route::get('/{user_video}', 'show')->name('user_videos.show');
            Route::post('/', 'store')->name('user_videos.store');
        });

        /**
         *
         *  USER VIDEO ANALYTIC
         * API ENDPOINTS
         * 
         */
        Route::controller(UserVideoAnalytic::class)->group(function () {
            // Route::post('/user_video_analytic', [UserVideoAnalyticController::class, 'store']);
        });

        // TESTING API
        // Route::get('/test', [AuthController::class, 'index']);

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
        // Route::post('/logout', [AuthController::class, 'logout']);
    });
