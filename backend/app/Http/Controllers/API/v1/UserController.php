<?php

    namespace App\Http\Controllers\API\v1;

    use App\Http\Resources\User\UserResource;
    use App\Http\Resources\User\UserResourceCollection;
    use App\Http\Resources\UserVideoProgress\UserVideoProgressResource;
    use App\Http\Resources\VideoWatchHistory\VideoWatchHistoryResource;
    use App\Models\User;
    use App\Models\Video;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;

    class UserController
    {
        /**
         * Display a listing of the resource.
         */
        public function index()
        {

            //
            // 2. Return via the Resource Collection
            return new UserResourceCollection(User::all());
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            //
            $token = $request->user()->createToken($request->token_name);
            return ['token' => $token->plainTextToken];
        }

        /**
         * Display the specified resource.
         */
        public function show(User $user)
        {
            // $user->load('videoWatchHistory');

            return new UserResource($user);
            //
            // return $user;

            // return User::withAvg('userVideoMetric', 'watch_duration')
            //     ->withSum('userVideoMetric', 'watch_duration')
            //     ->withCount('userVideoMetric')->get();
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, string $id)
        {
            //
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            //
        }

        // More Controllers
        public function videos(Request $request)
        {
            return VideoWatchHistoryResource::collection(
                $request->user()
                    ->videoWatchHistory()
                    ->with('video')  // eager load parent video
                    ->get()
            );
        }
    }
