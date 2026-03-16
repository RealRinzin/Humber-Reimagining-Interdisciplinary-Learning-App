<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory;

    // public function getRouteKeyName()
    // {
    //     return 'slug';
    // }
    // Relationship Tables
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
    // Video Relationship
    public function user()
    {
        return $this->hasMany(User::class);
    }
    public function userVideo(){
        return $this->hasMany(UserVideo::class);
    }
    // Document Relationship
    public function document()
    {
        return $this->hasOne(Document::class);
    }
    // Code Section Relationship
    public function code()
    {
        return $this->hasOne(Code::class);
    }
    public function quiz()
    {
        return $this->hasMany(Quiz::class);
    }
    // Bridging table relations
    public function videoWatchHistory()
    {
        return $this->hasMany(VideoWatchHistory::class);
    }
    // 
    public function userVideoProgress()
    {
        return $this->hasMany(UserVideoProgress::class);
    }
}
