<?php

namespace App\Http\Controllers\API\v1;

use App\Models\TopicConnection;
use Illuminate\Http\Request;

class TopicConnectionController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return TopicConnection::get();
    }


}
