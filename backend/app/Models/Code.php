<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    /** @use HasFactory<\Database\Factories\CodeFactory> */
    use HasFactory;

    /** 
     * Audio belongs to one Video
     * Document Table relationship with video table
     * Video has many documents
     * */
    public function topicNode(){
        return $this->belongsTo(TopicNode::class);
    }
}
