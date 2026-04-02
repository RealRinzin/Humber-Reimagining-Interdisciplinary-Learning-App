<?php

namespace App\Http\Controllers\API\v1;

use App\Models\User;
use Illuminate\Http\Request;

abstract class Controller
{
    //
    public function index()
    {
        //
        return User::get();
    }
}
