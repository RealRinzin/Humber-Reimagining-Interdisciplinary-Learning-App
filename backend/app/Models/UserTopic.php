<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTopic extends Model
{
     protected $table = 'user_topics'; 
    /** @use HasFactory<\Database\Factories\UserTopicFactory> */
    use HasFactory;

    // Relationship table

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function topicNode()
    {
        return $this->belongsTo(TopicNode::class);
    }
}
