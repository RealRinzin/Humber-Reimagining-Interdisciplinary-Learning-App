> # 1.SERVER - Nginx | Sites Available Config

```nginx
# /etc/nginx/sites-available/default
# We should use this config setting to setup the backend and frontend with the same server
# the API endpoint will be ip/api/...

server {
    listen 80; # Open the web to port 80 http
    server_name 100.114.200.103; # IP address of the sererver

    root /var/www/Humber-Reimagining-Interdisciplinary-Learning-App/backend/public; #backend API root folder path
    index index.php index.html;

    # Laravel API - start the api after after IP-Address/api
    location /api {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/api/.*\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }

    # Next.js static
    location /_next/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }

    # Next.js app
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }

    # PHP handling (global)
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }
}
```

> # 2. FRONTEND .env file -config

```tsx
// BASE API ENDPOINT -should be the server IP-Address
BASE_END_POINT=http://100.114.200.103
// Base api for - Server component -- should be the server IP-Address
NEXT_PUBLIC_BASE_END_POINT=http://100.114.200.103
// BASE API VERSION 1 ENDPOIN - - should be the server IP-Address
API_BASE_URL=http://100.114.200.103/api/v1
// for the server component side page api call - - should be the server IP-Address
NEXT_PUBLIC_API_BASE_URL=http://100.114.200.103/api/v1
// for the client component side api call
API_TOKEN=1|btWt4uywiRfEts6EuARl6QBK642z9ymoVXQNcdeY48f0dd29
// frontend URL - should be the server IP-Address
FRONTEND_URL=http://100.114.200.103:3000
```

> # 3. BACKEND .env file - config

```tsx

APP_NAME=humber_idl_app
APP_ENV=production
APP_KEY=base64:JvWC4JHr/kT4vS3/LW/Ogw5LF1EBDr7EvFFVOBdySqI=
APP_DEBUG=false
// APP_URL shoudl be the IP address of server / localhost withouth http prefix

APP_URL=http://100.114.200.103

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=humber_space_project_db
DB_USERNAME=humber_db_user
DB_PASSWORD=28t3zDcN)Zw81BD!

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
// session_domain shoudl be the IP address of server / localhost withouth http prefix
SESSION_DOMAIN=100.114.200.103

// SANCTUM_STATEFUL_DOMAINS Shoudl be the IP address server / localhost withouth http prefix
SANCTUM_STATEFUL_DOMAINS=100.114.200.103:3000,100.114.200.103

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
CACHE_STORE=file

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"
```
># BACKEND - config/sanctum.php

# Include or update these setting for sanctum session authentication
```php
# > /backend/config/santcum.php

# INCLUDE OR ADD THESE TWO LINES IN SETTING
#1.'prefix' => 'api/v1/sanctum',
#2.'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:3000')),  
<?php

use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. Typically, these should include your local
    | and production domains which access your API via a frontend SPA.
    |
    */
    // 
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:3000')),


    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | This array contains the authentication guards that will be checked when
    | Sanctum is trying to authenticate a request. If none of these guards
    | are able to authenticate the request, Sanctum will use the bearer
    | token that's present on an incoming request for authentication.
    |
    */

    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued token will be
    | considered expired. This will override any values set in the token's
    | "expires_at" attribute, but first-party sessions are not affected.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Sanctum can prefix new tokens in order to take advantage of numerous
    | security scanning initiatives maintained by open source platforms
    | that notify developers if they commit tokens into repositories.
    |
    | See: https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning
    |
    */
    'prefix' => 'api/v1/sanctum',

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | When authenticating your first-party SPA with Sanctum you may need to
    | customize some of the middleware Sanctum uses while processing the
    | request. You may change the middleware listed below as required.
    |
    */

    'middleware' => [
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'encrypt_cookies' => Illuminate\Cookie\Middleware\EncryptCookies::class,
        'validate_csrf_token' => Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ],

];
```