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
       return  $this->belongsToMany(User::class);
    }
    // Video

}
