<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Actions\Admin\Quizzes\StoreQuizAction;
use App\DTOs\Admin\Quizzes\StoreQuizDTO;
use App\Http\Requests\Admin\Quizzes\StoreQuizRequest;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request, StoreQuizAction $action)
    {
                // Create a DTO from the request
        /**
         * A Data Transfer Object (DTO) is a design pattern used to transfer data between different layers of an application. In the context of the store method in the VideoController, we are creating a CreateVideoDTO from the incoming request data. This DTO serves as a structured way to encapsulate the data needed to create a new video resource. By using a DTO, we can ensure that the data is validated and organized before it is passed to the CreateVideoAction, which will handle the business logic of creating the video in the database. This approach promotes separation of concerns and makes our code more maintainable and testable.
         * In this case, the CreateVideoDTO likely contains properties such as title, description, video URL, duration, and any other relevant information needed to create a new video. By using the fromRequest method, we can easily convert the validated request data into a DTO instance that can be used by the action class to perform the creation logic.
         */
        $dto = StoreQuizDTO::fromRequest($request); // Create a DTO from the request data
        // Pass the DTO to the action class to create a new video
        /**
         * In the store method of the VideoController, after creating a CreateVideoDTO from the incoming request data, we pass this DTO to the execute method of the CreateVideoAction. The CreateVideoAction is responsible for handling the business logic of creating a new video resource in the database. By passing the DTO to the action class, we can keep our controller thin and focused on handling HTTP requests and responses, while delegating the actual creation logic to a separate class. This promotes separation of concerns and makes our code more modular and easier to maintain. The action class will likely validate the data contained in the DTO, create a new video record in the database, and return the newly created video model, which we can then return as a response to the client.
         * By using this approach, we can also easily test the business logic of creating a video by writing unit tests for the CreateVideoAction, without having to worry about the HTTP layer or request validation, which is handled separately in the StoreVideoRequest. This leads to cleaner and more maintainable code overall.
         */
        $newQuiz = $action->execute($dto); // Create a new video using the action class
        // Return the newly created video resource as a response
        return $newQuiz;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(Quiz $quiz)
    {
        //
        if (!$quiz) {
            return back()->with('error', 'Topic not found.');
        }
        $quiz->delete();
    }
}
