<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoAnalytic extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoAnalyticFactory> */
    use HasFactory;
        // fillable fields
    protected $fillable = [
        'user_video_id',
        'interaction_type',
        'interact_at',
        'device_type',
        'os_type',
        'browser_type',
        'played_on',
    ];

    public function userVideo(){
        return $this->belongsTo(UserVideo::class);
    }

}
