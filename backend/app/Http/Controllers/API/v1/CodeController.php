<?php

namespace App\Http\Controllers\API\v1;


use App\Models\Code;
use Illuminate\Http\Request;

class CodeController
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return Code::get();
    }

    
}
