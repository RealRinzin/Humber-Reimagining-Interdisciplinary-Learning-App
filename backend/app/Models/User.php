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
    // use HasFactory; use HasFactory, Notifiable;
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
    // Role Relationship
    /**
     * User belongs to one Role
     * User Table relationship with roles table
     * Role has many User
     * */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    // UserVideo Relationship
    /**
     * User has many UserVideo
     * User Table relationship with user_video table
     * UserVideo belongs to one User
     * UserVideo belongs to one Video
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
        return $this->belongsToMany(Topic::class, 'user_topics', 'user_id', 'topic_id') // User belongs to many Topic through user_topics pivot table
            ->withPivot('started')
            ->withTimestamps(); // Include timestamps from the pivot table
        // ->withPivot('created_at'); // Include timestamps from the pivot table
    }

    // User Video Analytics
    /**
     * Model Relationship
     */

    // correct approach — hasManyThrough
    public function userVideoAnalytics()
    {
        return $this->hasManyThrough(UserVideoAnalytic::class, UserVideo::class);
    }


    // User Content Setting
    public function userContentSetting()
    {
        return $this->hasOne(UserContentSetting::class);
    }

    // User Video Setting
    public function userVideoSetting()
    {
        return $this->belongsToMany(Video::class, 'user_video_settings')
            ->using(UserVideoSetting::class)
            ->withPivot('video', 'code', 'interactive', 'rambling', 'quiz', 'code_checked_with_all', 'interactive_checked_with_all', 'quiz_checked_with_all', 'all_checked')
            ->withTimestamps();
    }
    // User Model
    public function isAdmin(): bool
    {
        return $this->role?->name === 'admin';
    }
}
