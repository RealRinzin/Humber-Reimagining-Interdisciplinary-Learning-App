<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\User\CreateUserAction;
use App\Actions\User\LoginUserAction;
use App\DTOs\User\LoginUserDTO;
use App\DTOs\User\CreateUserDTO;
use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserVideo\UserVideoResource;
use App\Http\Resources\UserVideoAnalytic\UserVideoAnalyticResource;
use App\Http\Resources\Video\VideoResource;
use App\Models\User;
use App\Models\UserVideo;
use App\Models\UserVideoAnalytic;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    // Login
    /**
     * Login
     * Login User
     * 
     * @param LoginUserRequest $request
     * @param LoginUserAction $action
     * 
     * @return void
     */

    public function login(LoginUserRequest $request, LoginUserAction $action)
    {
        // $dto = LoginUserDTO::fromRequest($request);
        // $user = $action->execute(LoginUserDTO::fromRequest($request));
        $user = $action->execute(LoginUserDTO::fromRequest($request));
        // Regenerate session for SPA

        // CRITICAL for Sanctum SPA
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Authenticated',
            'user' => $user,
        ]);
    }
    //
    public function register(StoreUserRequest $request, CreateUserAction $action)
    {

        // return $request;
        //  $dto = CreateUserDTO::fromArray($request->validated());
        /**
         * New User Registration
         * Create a new user with the user Action (CreateUserAction) 
         * and execute the DTOs of the User and validate it with the StoreUserRequest from 
         * the Request folder
         */
        $dto = CreateUserDTO::fromRequest($request);
        // Assign the return to new Variable
        $newUser = $action->execute($dto);
        /**
         * Access Token
         * Generate the user access token after creating new user
         */
        $token = $newUser->createToken('access_Token')->plainTextToken; // Convert the access token to plain text for API Authorization
        /**
         * Return Object
         * Return the user details along with the access token for the API authorization with Bearer Token
         * Bearer "access token"
         */
        return response()->json([
            'user' => $newUser, // Keep the user details like name, username, here
            'token' => $token  // assign the generate token of the new user
        ]);
    }

    // Logout

    public function logout(Request $request)
    {
        // $request->user();
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    // test
    public function index(Request $request, User $user)
    {

        return UserVideoAnalytic::with('userVideo')->get();
    }
}
