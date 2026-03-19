<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideo extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoFactory> */
    use HasFactory;

    // fillable fields
    protected $fillable = [
        'user_id',
        'video_id',
        'watch_minute',
    ];



    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
    public function userVideoAnalytic()
    {
        return $this->hasMany(UserVideoAnalytic::class);
    }
}
