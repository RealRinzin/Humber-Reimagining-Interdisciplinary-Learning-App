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
        return $this->belongsToMany(User::class);
    }
    // Video

    public function video()
    {
        return $this->belongsToMany(Video::class);
    }
}
