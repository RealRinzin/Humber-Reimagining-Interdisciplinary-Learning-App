<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTopicMetric extends Model
{
    /** @use HasFactory<\Database\Factories\UserTopicMetricFactory> */
    use HasFactory;

        // Bridging table relations

    public function user(){
        $this->belongsToMany(Topic::class);
    }
    // Video

    public function topic(){
        $this->belongsToMany(User::class);
    }
}
