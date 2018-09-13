FROM nginx-php-fpm
COPY site /var/www/html
EXPOSE 80