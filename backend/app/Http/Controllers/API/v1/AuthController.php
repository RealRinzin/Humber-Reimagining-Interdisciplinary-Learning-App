<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\User\CreateUserAction;
use App\Actions\User\LoginUserAction;
use App\DTOs\User\LoginUserDTO;
use App\DTOs\User\CreateUserDTO;
use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    // Current User

    public function me(Request $request)
    {
        // returns the current user details
        return response()->json(Auth::user());
    }
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
        /**
         * Login User
         * Login the user with the login user action
         * and execute the DTOs of the User
         */
        $user = $action->execute(LoginUserDTO::fromRequest($request));
        // CRITICAL for Sanctum SPA
        $request->session()->regenerate();

        /**
         * Return Object
         * Return the user details
         * return response()->json(['message' => 'Authenticated', 'user' => $user]);
         */
        return response()->json([
            'message' => 'Authenticated',
            'user' => $user,
        ]);
    }
    // Register
    /**
     * Register
     * Register User
     * 
     * @param StoreUserRequest $request
     * @param CreateUserAction $action
     * @return void
     */
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

        // Geerate the
        $request->session()->regenerate();

        /**
         * Return Object
         * Return the user details
         * return response()->json(['message' => 'Authenticated', 'user' => $user]);
         */
        return response()->json([
            'message' => 'Authenticated',
            'user' => $newUser,
        ]);
    }

    // Logout
    /**
     * Logout
     * Logout User
     * 
     * @param Request $request
     * @return void
     */
    public function logout(Request $request)
    {

        // For SPA (cookie/session) auth — this is what you're using
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
        /**
         * Delete the current access token
         * Delete the access token of the current user
         */
        // $request->user();
        $request->user()->currentAccessToken()->delete();
        // Return JSON response
        // return response()->json(['message' => 'Logged out']);
        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}
