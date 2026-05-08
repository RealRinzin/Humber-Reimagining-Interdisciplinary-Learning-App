# Humber Gaming Department - Space Project
# Deployment Documentation

> ## 1. SERVER - Nginx | Sites Available Config

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

> ## 2. FRONTEND - .env file

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
> ## 3. BACKEND .env file - config

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

## Include or update these setting for sanctum session authentication
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