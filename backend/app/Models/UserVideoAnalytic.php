<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoAnalytic extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoAnalyticFactory> */
    use HasFactory;

    public function userVideo(){
        return $this->belongsTo(UserVideo::class);
    }
}
