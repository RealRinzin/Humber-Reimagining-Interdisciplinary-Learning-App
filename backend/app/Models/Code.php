<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    /** @use HasFactory<\Database\Factories\CodeFactory> */
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'topic_id',
        'video_id',
        'code',
        'description'
    ];
    /** 
     * Audio belongs to one Video
     * Document Table relationship with video table
     * Video has many documents
     * */
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
    // Video belongs to one Topic
    // Video Table relationship with topics table
    // Topic has many videos
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
