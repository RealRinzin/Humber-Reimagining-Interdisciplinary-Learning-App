<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicConnection extends Model
{
    /** @use HasFactory<\Database\Factories\TopicConnectionFactory> */
    use HasFactory;
    protected $fillable = ['topic_id', 'connected_topic_id', 'line_style'];

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function connectedTopic()
    {
        return $this->belongsTo(Topic::class, 'connected_topic_id');
    }
}
