<?php

namespace App\Models;

use Dom\Document;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopicNode extends Model
{
    /** @use HasFactory<\Database\Factories\TopicNodeFactory> */
    use HasFactory;


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
        return $this->hasMany(Document::class);
    }

    // Code Model

    public function codes()
    {
        return $this->hasMany(Code::class);
    }

    /*
     * Get the route key for the model.
     *
     * @return string
     */

    // Override the default route key name to use 'slug' instead of 'id'
    // This allows us to use the topic's slug in URLs instead of its numeric ID.
    // For example, instead of /topics/1, we can have /topics/my-topic-slug.
    // This is particularly useful for SEO and user-friendly URLs.
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
