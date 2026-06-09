<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interactive extends Model
{
    /** @use HasFactory<\Database\Factories\InteractiveFactory> */
    use HasFactory;

    // Relationship
    public function video(){
        return $this->belongsTo(Video::class);
    }
}
