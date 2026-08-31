<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;
    protected $fillable = [
        'topic_id',
        'video_id',
        'difficulty',
        'question',
        'answer'
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
