<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoMetric extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoMetricFactory> */
    use HasFactory;

    // Bridging table relations

    public function user(){
        return $this->belongsToMany(Video::class);
    }
    // Video

    public function video(){
        return $this->belongsToMany(User::class);
    }
}
