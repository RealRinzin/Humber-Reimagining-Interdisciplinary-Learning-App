<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoAnalytic extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoAnalyticFactory> */
    use HasFactory;
    // fillable fields
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
      protected $fillable = [
        'user_video_id', 'interaction_type', 'interact_at',
        'device_type', 'os_type', 'browser_type', 'played_on'
    ];
    // Table Relationships

    // UserVideoAnalytic belongs to one UserVideo
    /**
     * UserVideoAnalytic belongs to one UserVideo
     * UserVideoAnalytic Table relationship with user_video table
     * UserVideo has many UserVideoAnalytic
     */
    public function userVideo()
    {
        return $this->belongsTo(UserVideo::class,"user_video_id");
    }
}
