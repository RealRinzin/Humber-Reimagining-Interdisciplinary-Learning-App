<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVideoProgress extends Model
{
    /** @use HasFactory<\Database\Factories\UserVideoProgressFactory> */
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function video(){
        return $this->belongsTo(Video::class);
    }
}
