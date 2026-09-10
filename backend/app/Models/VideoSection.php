<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoSection extends Model
{

    /** @use HasFactory<\Database\Factories\VideoSectionFactory> */
    use HasFactory;
    protected $fillable = [
        'video_id',
        'title',
        'slug',
        'thumbnail',
        'video_url',
        'duration',
        'description',
        'interactive_path',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
