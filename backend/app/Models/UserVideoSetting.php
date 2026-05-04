<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoSetting extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoSettingFactory> */
    use HasFactory;

    // tell Laravel there's no single id column
    public $incrementing = false;
    protected $primaryKey = null; // composite key, no single primary key

    
    protected $fillable = [
        'user_id',
        'video_id',
        'code',
        'interactive',
        'rambling',
        'quiz'
    ];
    public function users()
    {
        return $this->belongsToMany(Video::class, 'user_video_settings')
            ->using(UserVideoSetting::class)
            ->withPivot('code', 'interactive', 'rambling', 'quiz')
            ->withTimestamps();
    }
}
