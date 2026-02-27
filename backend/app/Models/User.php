<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
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

    // Define relationship with Role model
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    // Video table relationship
    public function video(){
        return $this->hasMany(Video::class);
    }

    // Topic Table
   public function topic(){
        return $this->hasMany(Topic::class);
    }

    // Define relationship with UserSavedTopics model
    public function user_saved_topics()
    {
        return $this->belongsToMany(Topic::class, 'user_saved_topics', 'user_id', 'topic_id')->withTimestamps();
    }
        // Bridging table relations
        
    public function userVideoMetric()
    {
        return $this->hasMany(UserVideoMetric::class);
    }
    // User Topic Metric Relationship Table
    public function userTopicMetric()
    {
        return $this->hasMany(UserTopicMetric::class);
    }
    // User Flash Card metrics table
    public function userFlashCardMetric(){
        return $this->hasMany(UserFlashCardMetric::class);
    }
}
