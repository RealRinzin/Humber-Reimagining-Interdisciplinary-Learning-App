<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'topic_id',
        'parent_id',
        'thumbnail',
        'video_url',
        'duration',
        'description'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
    // Relationship Tables
    // TopicNode Relationship
    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topics');
    }

    // Codes
    public function codes()
    {
        return $this->hasMany(Code::class);
    }

    // Documents
    public function documents()
    {
        return $this->hasMany(LessonDocument::class);
    }
    // Video Relationship
    /**
     * Video has many Users
     * Video Table relationship with user table
     * Video has many users
     */
    public function userVideos()
    {
        return $this->hasMany(UserVideo::class);
    }
}
