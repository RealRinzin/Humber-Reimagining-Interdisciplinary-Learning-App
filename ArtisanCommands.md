>
```php
php artisan make:model Role -mcrf --api
        $table->foreignId('topic_id')->constrained('topics')->onUpdate('cascade')->onDelete('cascade');

```
