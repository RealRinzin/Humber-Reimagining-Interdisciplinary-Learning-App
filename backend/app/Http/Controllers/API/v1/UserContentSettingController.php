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

        // if (auth()->id() !== $user->id) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }
        // // return $user;
        // return $user->userContentSetting;
        $user = auth()->user();
        return $user->userContentSetting;
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserContentSettingRequest $request, CreateUserContentSettingAction $action, User $user)
    {

        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userContentSetting = $action->execute(CreateUserContentSettingDTO::fromRequest($request));
        return response()->json($userContentSetting, $userContentSetting->wasRecentlyCreated ? 201 : 200);
    }
}
