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
    // TopicNode Relationship
    /**
     * Video belongs to one TopicNode
     * Video Table relationship with topic_node table
     * Video has many topic nodes
     */
    public function topics()
    {
        return $this->belongsToMany(TopicNode::class, 'topic_videos','video_id','topic_node_id')
            ->withTimestamps();
    }
    // Video Relationship
    /**
     * Video has many Users
     * Video Table relationship with user table
     * Video has many users
     */
    public function user()
    {
        return $this->hasMany(User::class);
    }
    // 

    // UserVideo Relationship
    /**
     * Video has many UserVideo
     * Video Table relationship with user_video table
     * Video has many user videos
     */


    public function userVideo()
    {
        return $this->hasMany(UserVideo::class);
    }
}
