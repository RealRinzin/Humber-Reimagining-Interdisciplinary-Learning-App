<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Topic extends Model
{
    /** @use HasFactory<\Database\Factories\TopicFactory> */
    use HasFactory;
    protected $table = 'topics';

    protected $fillable = [
        'title',
        'description',
        'node_color',
        'x_axis',
        'y_axis',
        'video',
        'code',
        'interactive',
        'rambling',
        'quiz',
        'interactive_path',
        'slug',
        'node_group_id'
    ];



    protected $casts = [
        'video'       => 'boolean',
        'code'        => 'boolean',
        'interactive' => 'boolean',
        'rambling'    => 'boolean',
        'quiz'        => 'boolean',
    ];
    /**
     * Relationship Models
     */
    // Document Model
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
    public function nodeGroup()
    {
        return $this->belongsTo(NodeGroup::class);
    }
    /*
     * Get the route key for the model.
     *
     * @return string
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_topics', 'topic_id', 'user_id')
            ->withPivot('started')
            ->withTimestamps();
        // ->withPivot('created_at'); // Include timestamps from the pivot table   
    }
    // Videos
    public function videos()
    {
        return $this->hasMany(Video::class, 'topic_id');
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
