<?php

use App\Http\Controllers\API\V1\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\CodeController;
use App\Http\Controllers\API\v1\ProjectController;
use App\Http\Controllers\API\v1\TopicConnectionController;
use App\Http\Controllers\API\v1\TopicController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\UserTopicController;
use App\Http\Controllers\API\v1\UserVideoAnalyticController;
use App\Http\Controllers\API\v1\UserVideoController;
use App\Http\Controllers\API\v1\VideoController;
use App\Http\Controllers\API\v1\UserContentSettingController;
use App\Http\Controllers\API\v1\UserVideoSettingController;
use App\Http\Controllers\API\v1\VideoSectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// 
// 
// To Get the authentication when first access by the user
//
// Route::middleware(['auth:sanctum',  'can:is-admin'])->prefix('v1/admin')
// Route::middleware(['can:is-admin'])->prefix('v1/admin')
Route::post('/v1/admin/login', [AdminAuthController::class, 'login']);


Route::middleware(['auth:sanctum','can:is-admin'])->prefix('v1/admin')
    // ->middleware(['auth:sanctum', 'admin'])
    ->group(function () {
        foreach (glob(__DIR__ . '/api/admin/*.php') as $file) {
            require $file;
        }
        // Route::get('/test', function (Request $request) {
        //     return "This is api";
        // });
    });

// Topic Connection 
// This API will be used for user login and it will return the user data and token for the user to access the protected API
// The API will be accessed by the frontend when the user tries to login and it will return the user data and token for the user to access the protected API
/**
 * IMPORTANT API
 * /api/v1/login // This API will be used for user login and it will return the user data and token for the user to access the protected API
 * /api/v1/register // This API will be used for user registration and it will return the user data and token for the user to access the protected API
 * /api/v1/logout // This API will be used for user logout and it will revoke the token of the user and it will return a success message   
 * 
 */
Route::prefix('v1')
    ->name('v1.')
    ->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
    });


Route::get('/test', function (Request $request) {
    return "This is api";
});
// Registeration API
// This API is open to public but it will be rate limited by the throttle middleware
Route::post('/register', [AuthController::class, 'register']);


Route::post('/postmanRegister', [AuthController::class, 'postmanRegister']);
// Get Logged User session or Token for proxy and middleware
Route::middleware(['web', 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// =============== Authorized Protected API | Session Token ===============================| 

// Route::prefix('v1')->name('v1.')->middleware('auth:sanctum')->group(function () {
Route::prefix('v1')
    ->name('v1.')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        // Proxy user return
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        // Current User detail
        Route::get('/me', [AuthController::class, 'me']);
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
        Route::controller(UserController::class)->prefix('users/me')->group(function () {
            Route::get('/profile', 'profile')->name('users.profile');
        });
        Route::get('/search', [UserController::class, 'search'])->name('users.search');
        // Route::apiResource('users', UserController::class)->except(['create', 'edit']);
        // === Topic Controller ==
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
        // Topic
        // Route::controller(TopicController::class)->prefix('topics')->group(function () {
        //     Route::get('/', 'index')->name('topic.index');
        // });
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

        // === Topic Controller ==
        // This API will be used to get the videos and also to add or remove videos from the user
        // GET /api/v1/videos // This API will return all the videos
        // GET /api/v1/videos/{video:id} // This API will return the video data
        // POST /api/v1/videos // This API will add a video to the user
        // GET /api/v1/videos/{video}/users // This API will return the users who have added the video to their list
        // The API will return the video data and the user data
        // // Topic
        Route::controller(TopicController::class)->prefix('topics')->group(function () {
            Route::get('/', 'index')->name('topic.index');
        });
        /**
         * IMPORTANT API - Topic Connection
         * /api/v1/videos // This API will return all the videos
         * /api/v1/videos/{video:id} // This API will return the video data
         * /api/v1/videos // This API will add a video to the user
         * /api/v1/videos/{video}/users // This API will return the users who have added the video to their list 
         */
        Route::controller(TopicConnectionController::class)->prefix('topic-connections')->group(function () {
            Route::get('/', 'index')->name('topic-connection.index');
        });
        /**
         * IMPORTANT API - Video Controller
         * /api/v1/videos // This API will return all the videos
         * /api/v1/videos/{video:id} // This API will return the video data
         * /api/v1/videos // This API will add a video to the user
         * /api/v1/videos/{video}/users // This API will return the users who have added the video to their list 
         */
        Route::controller(VideoController::class)->prefix('videos')->group(function () {
            Route::get('/', 'index')->name('videos.index');
            Route::get('/{video:slug}', 'show')->name('videos.show');
            Route::post('/', 'store')->name('video.store');
            Route::get('/{video}/users', 'users')->name('videos.users');
        });
        /**
         * IMPORTANT API - Video Parts Controller
         * /api/v1/videos // This API will return all the videos
         * /api/v1/videos/{video:id} // This API will return the video data
         * /api/v1/videos // This API will add a video to the user
         * /api/v1/videos/{video}/users // This API will return the users who have added the video to their list 
         */
        Route::controller(VideoSectionController::class)->prefix('video-parts')->group(function () {
            Route::get('/{videoSection:slug}', 'show')->name('videos-parts.show');
        });
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
        Route::controller(UserTopicController::class)->prefix('user-topics/users/me/topics')->group(function () {
            Route::get('/', 'index')->name('user-topics.index');
            // Route::get('/topics/{topic:id}', 'show')->name('user-topics.show');
            Route::post('/', 'store')->name('user-topics.store');
            Route::delete('/{topic:id}', 'destroy')->name('user-topics.destroy');
        });
        // User Videos API
        // This API will be used to get the videos of the user and also to add or remove videos from the user
        // GET /api/v1/user-videos/users/{user}/videos // This API will return the videos of the user
        // POST /api/v1/user-videos/users/{user}/videos // This API will add a video to the user
        // DELETE /api/v1/user-videos/users/{user}/videos/{video:id} // This API will remove a video from the user
        // The API will return the user data and the video data

        Route::controller(UserVideoController::class)->prefix('user-videos/users/{user}/videos')
            ->group(function () {
                Route::get('/', 'index')->name('user-videos.index'); // This API will be used to get the videos of the user and also to add or remove videos from the user
                Route::get('/{videoId}', 'show')->name('user-videos.show'); // This API will be used to get the videos of the user and also to add or remove videos from the user
                Route::post('/', 'store')->name('user-videos.store'); // This API will be used to create or update the user video record when the user watches a video
                Route::patch('/{userVideo:id}', 'update')->name('user-videos.update'); // This API will be used to update the watched_at timestamp of the user video record when the user watches a video again
                // Route::delete('/{userVideo:id}', 'destroy')->name('user-videos.destroy');
            });

        // User Content Setting
        // This API will be used to get the videos of the user and also to add or remove videos from the user
        // GET /api/v1/user-videos/users/{user}/videos // This API will return the videos of the user
        // POST /api/v1/user-videos/users/{user}/videos // This API will add a video to the user
        // DELETE /api/v1/user-videos/users/{user}/videos/{video:id} // This API will remove a video from the user
        // The API will return the user data and the video data
        Route::controller(UserVideoSettingController::class)->prefix('user-video-setting/users/me/videos/{videoID}')
            ->group(function () {
                Route::get('/', 'index')->name('user-video-setting.index'); // This API will be used to create or update the user video record when the user watches a video
                // Route::post('/', 'store')->name('user-video-settings.store'); // This API will be used to create or update the user video record when the user watches a video
                Route::patch('/', 'update')->name('user-video-settings.update'); // This API will be used to create or update the user video record when the user watches a video
            });
        // User Video Analytics API 
        // This API will be used to get the videos of the user and also to add or remove videos from the user
        // GET /api/v1/user-videos/users/{user}/videos // This API will return the videos of the user
        // POST /api/v1/user-videos/users/{user}/videos // This API will add a video to the user
        // DELETE /api/v1/user-videos/users/{user}/videos/{video:id} // This API will remove a video from the user
        // The API will return the user data and the video data
        Route::controller(UserVideoAnalyticController::class)->prefix('user-video-analytics/users/{user}/userVideoAnalytics')
            ->group(function () {
                Route::get('/', 'index')->name('user-video-analytics.index');
                Route::get('/{userVideoAnalytic:id}', 'show')->name('user-video-analytics.show');
                Route::post('/', 'store')->name('user-video-analytics.store'); // This API will be used to create or update the user video record when the user watches a video
            });

        // User Content Setting
        // This API will be used to get the videos of the user and also to add or remove videos from the user
        // GET /api/v1/user-videos/users/{user}/videos // This API will return the videos of the user
        // POST /api/v1/user-videos/users/{user}/videos // This API will add a video to the user
        // DELETE /api/v1/user-videos/users/{user}/videos/{video:id} // This API will remove a video from the user
        // The API will return the user data and the video data
        // Route::controller(UserContentSettingController::class)->prefix('user-content-settings')
        //     ->group(function () {
        //         Route::get('/users/{user}', 'index')->name('user-content-settings.index'); // This API will be used to create or update the user video record when the user watches a video
        //         Route::patch('/', 'store')->name('user-content-settings.store'); // This API will be used to create or update the user video record when the user watches a video
        //     });


        Route::controller(UserContentSettingController::class)->prefix('user-content-settings')
            ->group(function () {
                Route::get('/users/me/', 'index')->name('user-setting.index'); // This API will be used to create or update the user video record when the user watches a video
                Route::post('/', 'store')->name('user-content-settings.store'); // This API will be used to create or update the user video record when the user watches a video
                Route::patch('/users/me/{id}', 'update')->name('user-content-settings.update'); // This API will be used to create or update the user video record when the user watches a video
            });
    });


// ***************************************************************************************************************************************
// =================================================== TEST API =======================================================
Route::prefix('v1')
    ->name('v1.')
    ->group(function () {

        Route::controller(ProjectController::class)->prefix('projects')
            ->group(function () {
                Route::get('/', 'index')->name('project.index');
            });
    });
