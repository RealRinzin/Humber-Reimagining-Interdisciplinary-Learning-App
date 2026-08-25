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
         *  Logout the session =by deleting the keyword and session token
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
        // Invalid the logged session 
        $request->session()->invalidate();
        // Regenerate the  session token for the logout
        $request->session()->regenerateToken();
        // return the response object with the message
        return response()->json(['message' => 'Logged out']);
    }


    // FileUpload Test
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:50240000', // 10MB max
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        return response()->json([
            'path' => $path,
            'url' => asset('storage/' . $path),
        ]);
    }
}
