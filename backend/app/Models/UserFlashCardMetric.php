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
        $this->belongsToMany(FlashCard::class);
    }
    // Video

    public function flash_card()
    {
        $this->belongsToMany(User::class);
    }
}
