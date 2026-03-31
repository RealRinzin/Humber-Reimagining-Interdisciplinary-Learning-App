<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentFactory> */
    use HasFactory;
    /** 
     * Document belongs to one Video
     * Document Table relationship with video table
     * Document has many documents
     * */
    public function topicNode()
    {
        return $this->belongsTo(TopicNode::class);
    }
}
