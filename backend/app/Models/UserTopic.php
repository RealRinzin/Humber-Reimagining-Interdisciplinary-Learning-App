<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTopic extends Model
{
    /** @use HasFactory<\Database\Factories\UserTopicFactory> */
    use HasFactory;

    // Relationship table

    public function users()
    {
        return $this->belongsTo(User::class);
    }
    // 
    public function topicNodes()
    {
        return $this->belongsTo(TopicNode::class);
    }
}
