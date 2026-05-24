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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     * 
     */
    public function show(Code $code)
    {
        //
        return $code;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Code $code)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Code $code)
    {
        //
    }
}
