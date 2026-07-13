<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Actions\Admin\Users\LoginUserAction;
use App\DTOs\Admin\Users\LoginUserDTO;
use App\Http\Requests\Admin\Users\LoginUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// This is the right file action 
class AuthController
{
    public function login(LoginUserRequest $request, LoginUserAction $action)
    {
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

    // Logout Controller
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
