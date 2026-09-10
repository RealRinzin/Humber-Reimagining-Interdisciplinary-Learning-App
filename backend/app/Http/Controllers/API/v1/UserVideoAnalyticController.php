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
    // public function index(User $user)
    // {
    //     abort_if(auth()->id() !== $user->id, 403, 'Unauthorized');

    //     return UserVideoAnalyticResource::collection(
    //         $user->userVideoAnalytics()->get()
    //     );
    // }
    public function index(User $user)
    {


        // Check the authorization if the user is logged 
        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        // Resources
        return UserVideoAnalyticResource::collection(
            $user->userVideoAnalytics()->with('userVideo')->get()
        );
    }
    /**
     * Display the specified resource.
     */
    public function show(User $user, UserVideoAnalytic $userVideoAnalytic)
    {
        abort_if(auth()->id() !== $user->id, 403, 'Unauthorized');

        return new UserVideoAnalyticResource($userVideoAnalytic);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserVideoAnalyticRequest $request, CreateUserVideoAnalyticAction $action)
    {
        // Create dto Object
        $dto = CreateUserVideoAnalyticDTO::fromRequest($request);
        // Execute the Action
        $newData = $action->execute($dto);

        // return response in json
        return response()->json([
            'data' => $newData
        ]);
    }
}
