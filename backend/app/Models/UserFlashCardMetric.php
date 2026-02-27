<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFlashCardMetric extends Model
{
    /** @use HasFactory<\Database\Factories\UserFlashCardMetricFactory> */
    use HasFactory;

    // Bridging table relations
    
    public function user()
    {
       return $this->belongsToMany(User::class);
    }
    // Flash Card
    public function flashCard()
    {
       return $this->belongsTo(FlashCard::class);
    }
}
