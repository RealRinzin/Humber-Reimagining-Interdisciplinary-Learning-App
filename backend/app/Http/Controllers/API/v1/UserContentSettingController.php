<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\UserContentSetting\CreateUserContentSettingAction;
use App\Actions\UserContentSetting\UpdateUserContentSettingAction;
use App\DTOs\UserContentSetting\CreateUserContentSettingDTO;
use App\Http\Requests\UserContentSetting\StoreUserContentSettingRequest;
use App\Models\User;
use App\Models\UserContentSetting;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class UserContentSettingController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return the logged user content setting
        // Return null if it does not have the 
        $user = auth()->user();
        // 1. Fetch the setting and convert it to an array
        $contentSetting = $user->userContentSetting->toArray();

        // 2. Calculate the total and inject it directly into that array
        $contentSetting['total_checked'] = $user->userContentSetting->video
            + $user->userContentSetting->quiz
            + $user->userContentSetting->rambling
            + $user->userContentSetting->code
            + $user->userContentSetting->interactive;
        // return $user;
        return response()->json([
            'data' => $contentSetting,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserContentSettingRequest $request, CreateUserContentSettingAction $action, User $user)
    {

        try {
            $userContentSetting = $action->execute(CreateUserContentSettingDTO::fromRequest($request));
            return response()->json($userContentSetting, $userContentSetting->wasRecentlyCreated ? 201 : 200);
        } catch (AuthorizationException $e) {
            return response()->json(
                ['message' => 'Something is wrong. Please try again'],
                409
            );
        }
    }

    /** Update */

    public function update(StoreUserContentSettingRequest $request, UpdateUserContentSettingAction $action)
    {
        try {
            $userContentSetting = $action->execute(CreateUserContentSettingDTO::fromRequest($request));
            return response()->json($userContentSetting, $userContentSetting->wasRecentlyCreated ? 201 : 200);
            // $dto = CreateUserContentSettingDTO::fromRequest($request);
            // $setting = $action->execute($dto);
        } catch (AuthorizationException $e) {
            return response()->json(
                ['message' => 'Something is wrong. Please try again'],
                409
            );
        }
    }
}
