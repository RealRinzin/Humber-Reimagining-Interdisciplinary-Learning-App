<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtitle extends Model
{
    /** @use HasFactory<\Database\Factories\SubtitleFactory> */
    use HasFactory;
    protected $fillable = [
        'video_id',
        'subtitle_url',
        'language',
    ];
    // Table Relationship
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
