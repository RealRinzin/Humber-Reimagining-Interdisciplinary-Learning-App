<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\UserVideoAnalytic\CreateUserVideoAnalyticAction;
use App\DTOs\UserVideoAnalytic\CreateUserVideoAnalyticDTO;
use App\Http\Requests\UserVideoAnalytic\StoreUserVideoAnalyticRequest;
use App\Models\UserVideoAnalytic;
use Illuminate\Http\Request;

class UserVideoAnalyticController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StoreUserVideoAnalyticRequest $request,CreateUserVideoAnalyticAction $action)
    {
        //
        $dto = CreateUserVideoAnalyticDTO::fromRequest($request);
        $newData = $action->execute($dto);

        return response()->json([
            'data'=>$newData
        ]);

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
     */
    public function show(UserVideoAnalytic $userVideoAnalytic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserVideoAnalytic $userVideoAnalytic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserVideoAnalytic $userVideoAnalytic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserVideoAnalytic $userVideoAnalytic)
    {
        //
    }
}
