
> # 1. Installation
> ### Git Clone
```php
# clone from git repo
git clone https://github.com/RealRinzin/Humber-Reimagining-Interdisciplinary-Learning-App.git
```
```php
# BACKEND
# app/backend
 # mysql -u humber_db_user -p humber_space_db < humber_space_db.sql
composer update

sudo chown -R www-data:www-data /app/backend
sudo chmod -R 775 /app/backendstorage
sudo chmod -R 775 app/backend/bootstrap/cache

# 
touch .env
# 3
php artisan key:generate
```

> # 1.SERVER - Nginx | Sites Available Config

```nginx
# /etc/nginx/sites-available/default
# We should use this config setting to setup the backend and frontend with the same server
# the API endpoint will be ip/api/...

server {
    listen 80; # Open the web to port 80 http
    server_name 200.301.402.503; # IP address of the sererver

    root /var/www/backend/public; #backend API root folder path
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
BASE_END_POINT=http://200.301.402.503
// Base api for - Server component -- should be the server IP-Address
NEXT_PUBLIC_BASE_END_POINT=http://200.301.402.503
// BASE API VERSION 1 ENDPOIN - - should be the server IP-Address
API_BASE_URL=http://200.301.402.503/api/v1
// for the server component side page api call - - should be the server IP-Address
NEXT_PUBLIC_API_BASE_URL=http://200.301.402.503/api/v1
// for the client component side api call
API_TOKEN=1|btWt4uywiRfEts6EuARl6QBK642z9ymoVXQNcdeY48f0dd29
// frontend URL - should be the server IP-Address
FRONTEND_URL=http://200.301.402.503:3000
```

>## PM2 CONFIGURATION
```sql
pm2 start npm --name frontend -- start
pm2 start artisan --interpreter php --name backend
pm2 save
pm2 startup
```
>## 2.
```tsx
// This file is responsible for handling the authentication and authorization of the user. 
// It will check if the user is authenticated before allowing them to access certain pages. 
// If the user is not authenticated, they will be redirected to the login page. 
// If the user is already authenticated and tries to access the login page, they will be redirected to the dashboard page. 
// This file uses Next.js middleware to intercept requests and perform these checks before rendering the pages.

/**
 * The `proxy` function is a Next.js middleware that checks if the user is authenticated before allowing them to access certain pages. 
 * It uses the `isAuthenticated` function to check if the user is authenticated by making a request to the backend API. 
 * If the user is not authenticated and tries to access a protected page, they will be redirected to the login page. 
 * If the user is already authenticated and tries to access the login page, they will be redirected to the dashboard page. 
 * The `matcher` configuration specifies which routes should be protected by this middleware.
 */

import { cookies } from 'next/headers' // to access cookies in the middleware
import { NextResponse } from 'next/server' // to create responses and redirects in the middleware
import type { NextRequest } from 'next/server' // to type the request object in the middleware

/**
 * 
 * @param request 
 * @returns 
 */

// This function checks if the user is authenticated by making a request to the backend API with the cookies from the request.
// If the request is successful, it returns true, indicating that the user is authenticated. 
// If the request fails (e.g., due to a 401 Unauthorized response), it returns false, indicating that the user is not authenticated.
/**
 * In this function, we are making a GET request to the `/api/user` endpoint of our backend API to check if the user is authenticated. 
 * We include the cookies from the request in the headers of the fetch request, which allows the backend to identify the user based on their session cookie. 
 * If the response is successful (i.e., the user is authenticated), we return true. If the response is not successful (e.g., if it returns a 401 Unauthorized status), we return false, indicating that the user is not authenticated.
 */
async function isAuthenticated(request: NextRequest): Promise<boolean> {
    const cookieHeader = request.headers.get('cookie') ?? '';
    console.log(cookieHeader)
    // const cookieStore = await cookies(); // get the cookies from the request using Next.js's cookies function, which returns a cookie store object that we can use to access the cookies in the request
    // We convert the cookie store to a string and include it in the headers of the fetch request to the backend API.
    //  This allows the backend to identify the user based on their session cookie and determine if they are authenticated.
    try { 
        const res = await fetch(`${process.env.BASE_END_POINT}/api/user`, { // Default
            method: "GET",
            // credentials: "include",
            headers: {
                // Cookie: cookieStore.toString(),
                Cookie: cookieHeader,

                Accept: "application/json"
            }
        })
        if (!res.ok) return false; // if the response is not successful (e.g., if it returns a 401 Unauthorized status), we return false, indicating that the user is not authenticated.
        return true; // if the response is successful (i.e., the user is authenticated), we return true.

    } catch {
        // If there is an error (e.g., network error), we also return false, indicating that the user is not authenticated.
        return false;
    }

}
/**
 * 
 * @param request 
 * @returns 
 */
export async function proxy(request: NextRequest) {
    // const session = request.cookies.get('humber-idl-app-session')
    const loggedIn = await isAuthenticated(request)

    const isAuthPage = request.nextUrl.pathname === '/'
    const isOnBoardingPage = request.nextUrl.pathname === '/onboarding';
    // If not logged in and trying to access protected page → redirect to login
    if (!loggedIn && !isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If already logged in and trying to access login page → redirect to dashboard
    if (loggedIn && isAuthPage) {
        return NextResponse.redirect(new URL('/profile/knowledge_map', request.url))
    }
    // log
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/topics/:path*', '/profile/:path*','/video/:path*','/team/:path*'],
}


```
> # 3. BACKEND .env file - config

```tsx

APP_NAME=humber_idl_app
APP_ENV=production
APP_KEY=base64:JvWC4JHr/kT4vS3/LW/Ogw5LF1EBDr7EvFFVOBdySqI=
APP_DEBUG=false
// APP_URL shoudl be the IP address of server / localhost withouth http prefix

APP_URL=http://200.301.402.503

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
DB_DATABASE=db_name
DB_USERNAME=db_user
DB_PASSWORD=db_password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
// session_domain shoudl be the IP address of server / localhost withouth http prefix
SESSION_DOMAIN=200.301.402.503

// SANCTUM_STATEFUL_DOMAINS Shoudl be the IP address server / localhost withouth http prefix
SANCTUM_STATEFUL_DOMAINS=200.301.402.503:3000,200.301.402.503

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
CACHE_STORE=file

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"
```
>## 3.1  BACKEND - config/sanctum.php

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
    */
    // 
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:3000')),

    'prefix' => 'api/v1/sanctum',

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

];
```