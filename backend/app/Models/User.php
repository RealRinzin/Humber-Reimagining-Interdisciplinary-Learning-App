<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    // Role table relationship
    /**
     * User belongs to one Role
     * User Table relationship with role table
     * User has many roles
     */

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    // Video table relationship
    /**
     * User has many Videos
     * User Table relationship with video table
     * User has many videos
     */


    public function userVideos()
    {
        return $this->hasMany(UserVideo::class);
    }

    // User Topic Relations
    /**
     * User has many UserTopic
     * User Table relationship with user_topic table
     * UserTopic belongs to one User
     * UserTopic belongs to one TopicNode
     */
    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'user_topics', 'user_id', 'topic_id')
            ->withTimestamps();
        // ->withPivot('created_at'); // Include timestamps from the pivot table
    }
}
