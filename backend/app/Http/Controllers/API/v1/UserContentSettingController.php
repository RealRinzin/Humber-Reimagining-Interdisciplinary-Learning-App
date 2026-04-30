<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\UserContentSetting\CreateUserContentSettingAction;
use App\DTOs\UserContentSetting\CreateUserContentSettingDTO;
use App\Http\Requests\UserContentSetting\StoreUserContentSettingRequest;
use App\Models\User;
use App\Models\UserContentSetting;
use Illuminate\Http\Request;

class UserContentSettingController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserContentSettingRequest $request, CreateUserContentSettingAction $action,User $user)
    {
        $userContentSetting = $action->execute(CreateUserContentSettingDTO::fromRequest($request));
        return response()->json($userContentSetting, $userContentSetting->wasRecentlyCreated ? 201 : 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(UserContentSetting $userContentSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserContentSetting $userContentSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserContentSetting $userContentSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserContentSetting $userContentSetting)
    {
        //
    }
}
