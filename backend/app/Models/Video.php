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
    public function topic()
    {
        return $this->belongsTo(TopicNode::class, 'topic_node_id');
    }
    // Video Relationship
    /**
     * Video has many Users
     * Video Table relationship with user table
     * Video has many users
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_videos')
            ->withTimestamps();
    }
}
