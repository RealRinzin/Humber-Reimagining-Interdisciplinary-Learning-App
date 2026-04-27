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
        'video_id',
        'user_id',
        'last_paused',
        'completed'
    ];


// Table Relationships
    /**
     * UserVideo belongs to one User
     * UserVideo Table relationship with user table
     * User has many UserVideo
     */
    public function user() // UserVideo belongs to one User
    {
        return $this->belongsTo(User::class);
    }
    // UserVideo belongs to one Video
    /**
     * UserVideo belongs to one Video
     * UserVideo Table relationship with video table
     * Video has many UserVideo
     * */
    public function video()
    {
        return $this->belongsTo(Video::class); // UserVideo belongs to one Video
    }
    // UserVideo has many UserVideoAnalytic
    /**
     * UserVideo has many UserVideoAnalytic
     * UserVideo Table relationship with user_video_analytics table
     * UserVideoAnalytic belongs to one UserVideo
     */
    public function userVideoAnalytics()
    {
        return $this->hasMany(UserVideoAnalytic::class);
    }
}
