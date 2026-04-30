`>

```sql
php artisan make:model Role -mcrfs --api

-m → migration
-c → controller
-r → resource controller
-f → factory
-s → seeder
--api → API controller (no create/edit)
```

> ## Resources and Resource Collection API

```sql
Using --collection flag

You can generate a **resource and its collection in one command:

php artisan make:resource UserResource --collection
```
> ### DTOs - create
```php
php artisan make:class DTOs/UserContentSetting/CreateUserContentSettingDTO
```

> ### Action - create
```php
php artisan make:class Actions/UserContentSetting/CreateUserContentSettingAction
```