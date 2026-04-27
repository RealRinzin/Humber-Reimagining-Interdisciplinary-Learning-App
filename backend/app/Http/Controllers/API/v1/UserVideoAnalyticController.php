<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\UserVideoAnalytic\CreateUserVideoAnalyticAction;
use App\DTOs\UserVideoAnalytic\CreateUserVideoAnalyticDTO;
use App\Http\Requests\UserVideoAnalytic\StoreUserVideoAnalyticRequest;
use App\Http\Resources\UserVideoAnalytic\UserVideoAnalyticResource;
use App\Models\User;
use App\Models\UserVideoAnalytic;
use Illuminate\Http\Request;

class UserVideoAnalyticController
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        // Check the authorization if the user is logged 
        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // return UserVideoAnalyticResource::collection(UserVideoAnalytic::with('userVideo')->get());
        return UserVideoAnalyticResource::collection(
            $user->userVideoAnalytics()->with('userVideo')->get()
        );
    }
    /**
     * Display the specified resource.
     */
    public function show(UserVideoAnalytic $userVideoAnalytic, User $user)
    {
        // Check the authorization if the user is logged 
        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return UserVideoAnalyticResource::collection(
            $user->userVideoAnalytics()->get()
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserVideoAnalyticRequest $request, CreateUserVideoAnalyticAction $action)
    {

        // return $request;
        //
        $dto = CreateUserVideoAnalyticDTO::fromRequest($request);
        $newData = $action->execute($dto);

        return response()->json([
            'data' => $newData
        ]);
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
