<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\User\CreateUserAction;
use App\Actions\User\LoginUserAction;
use App\DTOs\User\LoginUserDTO;
use App\DTOs\User\CreateUserDTO;
use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController
{

    public function login(LoginUserRequest $request, LoginUserAction $action)
    {
        // $dto = LoginUserDTO::fromRequest($request);

        $user = $action->execute(LoginUserDTO::fromRequest($request));
        return $user;
        // return $user;
        $token = $user->createToken('access_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'accessToken' => $token
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
        $newUser = $action->execute($dto);
        // $newUser = $action->execute(
        //     CreateUserDTO::fromRequest($request)
        // );
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

        // die();
        // // return $request;
        // $request->validate([
        //     'name' => 'required',
        //     // 'email' => 'required|email|unique:users',
        //     'username' => 'required|unique:users',
        //     'password' => 'required|min:6',
        //     'role_id' => 'required'
        // ]);

        // // return $request->username;
        // $user = User::create([
        //     'name' => $request->name,
        //     // 'email' => $request->email,
        //     'username' => $request->username,
        //     'password' => Hash::make($request->password),
        //     'role_id' => $request->role_id
        // ]);
        // // return $user;
        // $token = $user->createToken('api-token')->plainTextToken;

        // return response()->json([
        //     'user' => $user,
        //     'token' => $token
        // ]);
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
