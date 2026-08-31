<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rambling extends Model
{
    /** @use HasFactory<\Database\Factories\RamblingFactory> */
    use HasFactory;
    // protected $table = 'ramblings';

        protected $fillable = [
        'topic_id',
        'video_id',
        'content',
    ];
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
    // A rambling belongs to one video 
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
