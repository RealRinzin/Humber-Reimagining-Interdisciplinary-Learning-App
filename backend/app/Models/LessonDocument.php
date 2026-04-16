<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonDocument extends Model
{
    /** @use HasFactory<\Database\Factories\LessonDocumentFactory> */
    use HasFactory;
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
