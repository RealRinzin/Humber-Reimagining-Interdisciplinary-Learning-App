<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    /** @use HasFactory<\Database\Factories\TopicFactory> */
    use HasFactory;

    // Video Relationship
    public function video()
    {
        return $this->hasMany(Video::class);
    }
    // Topic Relationship
    public function topic()
    {
        return $this->hasMany(Topic::class);
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
