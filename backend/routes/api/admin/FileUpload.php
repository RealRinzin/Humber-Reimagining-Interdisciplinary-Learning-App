<?php

// Code Table API

use App\Http\Controllers\API\V1\Admin\FileUploadController;
use Illuminate\Support\Facades\Route;

// Route::apiResource('uploads', FileUploadController::class);
Route::controller(FileUploadController::class)->prefix('uploads')->group(function(){
    Route::post('/images','images')->name('uploads.images');
});
