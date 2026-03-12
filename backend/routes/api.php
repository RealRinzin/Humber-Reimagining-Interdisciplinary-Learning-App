<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\TopicController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserVideoProgressController;
use App\Http\Controllers\API\v1\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('users/{user}/videos/{video}/progress', [UserVideoProgressController::class, 'show']);

// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware('auth:sanctum')
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
         * NOTES
         *  - When user clicked or landed on any video topic, we only need to user the video api (api/v1/videos/{video:id} - with its code,document stuff)
         *  - For the progress bar at the left, we need to use the video's and logged's id to fetch the details
         *  - For the Tabs, we need to use same video's id and authenticated user's detail to check the status of each tab
         *  - For the lesson or overview progress at the right, we need to use more calculation and resource api
         */



        Route::get('/topics', [TopicController::class, 'index']);
        Route::get('/topics/{topic:slug}', [TopicController::class, 'show']);
        // Video
        Route::get('/videos', [VideoController::class, 'index']);
        Route::get('/videos/{video:id}', [VideoController::class, 'show']);
        Route::get('videos/{video}/users', [VideoController::class, 'users']);


        // User
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{user:id}', [UserController::class, 'show']);
        Route::get('users/{me}/videos', [UserController::class, 'videos']);
        Route::get('users/{me}/videos/{video}', [UserController::class, 'videos']);
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
