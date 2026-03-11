<?php

namespace App\Http\Controllers\API\v1;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    public function login(Request $request)
    {
        // return $request;
        // if (!Auth::attempt($request->only('email', 'password'))) {
        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('access_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'accessToken' => $token
        ]);
    }
    //
    public function register(Request $request)
    {
        // return $request;
        $request->validate([
            'name' => 'required',
            // 'email' => 'required|email|unique:users',
            'username' => 'required',
            'password' => 'required|min:6',
            'role_id' => 'required'
        ]);

        // return $request->username;
        $user = User::create([
            'name' => $request->name,
            // 'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id
        ]);
        // return $user;
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
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
}
