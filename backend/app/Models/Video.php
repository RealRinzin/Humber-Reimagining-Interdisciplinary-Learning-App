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
        'description',
        'tldw',
        'interactive_path',
        'rambling',
        'quiz',
        'code',
        'interactive',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
    /**
     * Model Relationship
     * Children   
     * */       
    public function subVideos() 
{
    return $this->hasMany(Video::class, 'parent_id');
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
    /**
     * Video sections
     * Video Table relationship with codes table
     * Code belongs to one Video
     * */
    public function videoSections(){
        return $this->hasMany(VideoSection::class);
    }
    // Code Relationship
    // A video can have many codes
    // Video Table relationship with codes table
    // Code belongs to one Video
    
    public function codes()
    {
        return $this->hasMany(Code::class);
    }
    /**
     * Model Relationship
     * Subtitle
     */
    public function subtitle(){
        return $this->hasOne(Subtitle::class);
    }
    // Quizzes
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
        // Ramblings
    // A video can have many ramblings
    // Video Table relationship with ramblings table
    // Rambling belongs to one Video
    /**
     * Video has many Rambling
     * Video Table relationship with ramblings table
     * Rambling belongs to one Video
     * */
    public function ramblings()
    {
        return $this->hasMany(Rambling::class);
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
    public function user_video_setting()
    {
        return $this->hasOne(UserVideoSetting::class, 'video_id')
            ->where('user_id', auth()->id());
    }
}
