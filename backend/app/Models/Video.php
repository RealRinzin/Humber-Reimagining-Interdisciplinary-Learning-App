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
    // Topic Relationship
    // A video belongs to one topic
    // Video Table relationship with topics table
    // Topic has many videos
    /**
     * Video belongs to one Topic
     * Video Table relationship with topics table
     * Topic has many videos
     * */
    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }
    // Code Relationship
    // A video can have many codes
    // Video Table relationship with codes table
    // Code belongs to one Video
    /**
     * Video has many Code
     * Video Table relationship with codes table
     * Code belongs to one Video
     * */
    public function codes()
    {
        return $this->hasMany(Code::class);
    }

    // Quizzes
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
    // LessonDocument Relationship
    // A video can have many lesson documents
    // Video Table relationship with lesson_documents table
    // LessonDocument belongs to one Video
    /**
     * Video has many LessonDocument
     * Video Table relationship with lesson_documents table
     * LessonDocument belongs to one Video
     * */
    public function documents()
    {
        return $this->hasMany(LessonDocument::class);
    }
    // UserVideo Relationship
    /**
     * Video has many UserVideo
     * Video Table relationship with user_video table
     * UserVideo belongs to one Video
     * */
    public function userVideos()
    {
        return $this->hasMany(UserVideo::class);
    }

    // User Video Analytics
    /**
     * Model Relationship
     */

    // Video.php — replace with hasManyThrough
    public function userVideoAnalytics()
    {
        return $this->hasManyThrough(UserVideoAnalytic::class, UserVideo::class);
    }


    // Video Setting
    public function userVideoSetting()
    {
        return $this->hasOne(UserVideoSetting::class, 'video_id')
            ->where('user_id', auth()->id());
    }
}
