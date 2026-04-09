<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTopic extends Model
{
    /** @use HasFactory<\Database\Factories\UserTopicFactory> */
    use HasFactory;

    // Relationship table

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
    public function topicNode(){
        return $this->belongsToMany(topicNode::class);
    }
}

