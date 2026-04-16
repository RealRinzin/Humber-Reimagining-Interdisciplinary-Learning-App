<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashCard extends Model
{
    /** @use HasFactory<\Database\Factories\FlashCardFactory> */
    use HasFactory;

    // Bridging table relationship
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
    public function userFlashCardMetric()
    {
        return $this->hasMany(UserFlashCardMetric::class);
    }
}
