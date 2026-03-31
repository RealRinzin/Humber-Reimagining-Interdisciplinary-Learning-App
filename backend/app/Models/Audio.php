<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    /** @use HasFactory<\Database\Factories\AudioFactory> */
    use HasFactory;
    // Table Relationship
    public function topicNode()
    {
        return $this->belongsTo(TopicNode::class);
    }
}
