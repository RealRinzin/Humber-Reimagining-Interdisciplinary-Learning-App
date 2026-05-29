<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoSection extends Model
{
    /** @use HasFactory<\Database\Factories\VideoSectionFactory> */
    use HasFactory;



    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    
    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
