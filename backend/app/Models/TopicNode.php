<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicNode extends Model
{
    /** @use HasFactory<\Database\Factories\TopicNodeFactory> */
    use HasFactory;
    public function video()
    {
        return $this->hasMany(Video::class);
    }
}
