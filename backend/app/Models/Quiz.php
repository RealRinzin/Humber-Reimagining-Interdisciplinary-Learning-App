<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    public function topicNodes()
    {
        return $this->belongsTo(TopicNode::class);
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
