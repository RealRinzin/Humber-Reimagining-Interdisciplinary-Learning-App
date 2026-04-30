<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserContentSetting extends Model
{
    /** @use HasFactory<\Database\Factories\UserContentSettingFactory> */
    use HasFactory;
        protected $fillable = [
        'user_id',
        'video',
        'code',
        'quiz',
        'interactive',
        'explore_mode',
        'guide_path',
        'progress'
    ];
}
