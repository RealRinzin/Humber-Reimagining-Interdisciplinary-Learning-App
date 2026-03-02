# Deploying Laravel Backend and Next.js Frontend on a Single DigitalOcean Droplet

## Overview

You can deploy both a Laravel backend and a Next.js frontend on a single
VPS (Virtual Private Server). This is a great learning setup for
understanding full-stack deployment and server architecture.

------------------------------------------------------------------------

## Architecture Overview

Internet\
↓\
Nginx (Reverse Proxy)\
↓\
-------------------------\
\| / → Next.js \|\
\| /api → Laravel \|\
-------------------------

Example routing: - yourdomain.com → Next.js - yourdomain.com/api →
Laravel

Alternative: - frontend.yourdomain.com → Next.js - api.yourdomain.com →
Laravel

------------------------------------------------------------------------

## Recommended Droplet Specs (For Learning)

-   Basic Droplet
-   Ubuntu 22.04
-   1 vCPU
-   1GB RAM (\$6--\$7/month)

Note: If using Next.js with SSR, 2GB RAM is recommended for smoother
performance.

------------------------------------------------------------------------

## Required Software

Install on the server:

-   nginx (Web server)
-   php + php-fpm (Laravel runtime)
-   composer (PHP dependency manager)
-   node + npm or pnpm (Next.js runtime)
-   mysql-server or postgresql (Database)

------------------------------------------------------------------------

## Deploy Laravel

``` bash
git clone your-laravel-repo
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

Set Nginx root to:

    /var/www/laravel/public

------------------------------------------------------------------------

## Deploy Next.js

Build and run production version:

``` bash
npm install
npm run build
npm run start
```

Recommended: Use PM2 for process management:

``` bash
npm install -g pm2
pm2 start ecosystem.config.js
```

------------------------------------------------------------------------

## Example Nginx Reverse Proxy Configuration

``` nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        root /var/www/laravel/public;
        try_files $uri $uri/ /index.php?$query_string;
    }
}
```

------------------------------------------------------------------------

## When This Setup Is Good

Good for: - Learning DevOps - Small apps - MVP projects - Portfolio
projects

Not ideal for: - High traffic production apps - Large-scale systems -
Microservices architecture

------------------------------------------------------------------------

## Alternative Architecture

-   One droplet → Laravel
-   One droplet → Next.js
-   Laravel on VPS + Next.js on Vercel

------------------------------------------------------------------------

## Recommended Learning Path

For a student learning deployment:

-   Use a single droplet
-   Configure Nginx manually
-   Use PM2 for Next.js
-   Use Supervisor for Laravel queues
-   Configure SSL with Certbot
-   Learn environment variable management

This setup will help you understand: - Reverse proxy - Linux server
management - Production builds - Process managers - Deployment workflows

------------------------------------------------------------------------

End of Guide