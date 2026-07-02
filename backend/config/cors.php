<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login'], // Added 'login' inside the array - Rinzin
    // 'paths' => ['api/*', 'sanctum/csrf-cookie'], // Added 'login' inside the array - Rinzin
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // Allow origins from the frontend
    'allowed_origins' => ['http://localhost:3000', 'http://localhost:3001'],
    'allowed_origins_patterns' => [],
    // Header
    'allowed_headers' => [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-XSRF-TOKEN',  // required for Sanctum CSRF
        'Accept'
    ],
    // Expose the date
    'exposed_headers' => [],
    // Maximum age for the token expiration date
    'max_age' => 86400,
    // 'supports_credentials' => false,
    'supports_credentials' => true,  // change to true by Rinzin
];
