FROM php:8.4-fpm

# Install MySQL extension
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Optional: Install other useful extensions
RUN docker-php-ext-install opcache