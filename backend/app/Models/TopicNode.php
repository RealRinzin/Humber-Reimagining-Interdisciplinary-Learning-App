<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicNode extends Model
{
    /** @use HasFactory<\Database\Factories\TopicNodeFactory> */
    use HasFactory;

    protected $table = 'topic_nodes';
    /**
     * Relationship Models
     */
    // Videos Model
    public function videos()
    {
        return $this->hasMany(Video::class);
    }
    // Document Model
    public function documents()
    {
        return $this->hasMany(LessonDocument::class);
    }
    // Code Model

    public function codes()
    {
        return $this->hasMany(Code::class);
    }

    // Quiz
    public function quizees()
    {
        return $this->hasMany(Quiz::class);
    }
    public function flash_cards()
    {
        return $this->hasMany(FlashCard::class);
    }
    /*
     * Get the route key for the model.
     *
     * @return string
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_topics')
            ->withTimestamps();
        // ->withPivot('created_at'); // Include timestamps from the pivot table   
    }

    // Override the default route key name to use 'slug' instead of 'id'
    // This allows us to use the topic's slug in URLs instead of its numeric ID.
    // For example, instead of /topics/1, we can have /topics/my-topic-slug.
    // This is particularly useful for SEO and user-friendly URLs.
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
