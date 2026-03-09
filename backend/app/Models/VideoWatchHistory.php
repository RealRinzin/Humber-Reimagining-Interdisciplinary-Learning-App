<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoWatchHistory extends Model
{
    /** @use HasFactory<\Database\Factories\VideoWatchHistoryFactory> */
    use HasFactory;

    // Bridging table relations

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // Video

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
