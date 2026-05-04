<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoSetting extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoSettingFactory> */
    use HasFactory;

    // tell Laravel there's no single id column
    // public $incrementing = false;
    // protected $primaryKey = null; // composite key, no single primary key


    protected $fillable = [
        'user_id',
        'video_id',
        'code',
        'interactive',
        'rambling',
        'quiz',
        'all_checked',
        'code_checked_with_all',
        'interactive_checked_with_all',
        'quiz_checked_with_all',
        'rambling_checked_with_all',
    ];

    protected $casts = [
        'video_id' => 'integer',
        'user_id'  => 'integer',
        'code'                         => 'boolean',
        'interactive'                  => 'boolean',
        'rambling'                     => 'boolean',
        'quiz'                         => 'boolean',
        'all_checked'                  => 'boolean',
        'code_checked_with_all'        => 'boolean',
        'interactive_checked_with_all' => 'boolean',
        'quiz_checked_with_all'        => 'boolean',
        'rambling_checked_with_all'    => 'boolean',
    ];

    // Model Relationship
    public function users()
    {
        return $this->belongsToMany(Video::class, 'user_video_settings')
            ->using(UserVideoSetting::class)
            ->withPivot('code', 'interactive', 'rambling', 'quiz')
            ->withTimestamps();
    }
}
