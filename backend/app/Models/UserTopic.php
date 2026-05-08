<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTopic extends Model
{
    //
    protected $table = 'user_topics';
    // fillable columns
    protected $fillable = ['user_id', 'topic_id', 'started'];
}
