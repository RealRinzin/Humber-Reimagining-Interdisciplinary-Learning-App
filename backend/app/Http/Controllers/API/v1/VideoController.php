<?php

namespace App\Http\Controllers\API\v1;

use App\Actions\Video\CreateVideoAction;
use App\DTOs\Video\CreateVideoDTO;
use App\Http\Requests\Video\StoreVideoRequest;
use App\Http\Resources\Video\VideoResource;
use App\Http\Resources\Video\VideoResourceCollection;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Eager load the relationships and count the related models
        /**
         * Eager loading is a powerful technique in Laravel that allows you to load related models along with the main model in a single query. 
         * This can significantly reduce the number of database queries and improve performance, especially when dealing with relationships that have a large number of related records.
         * In the context of the VideoController, we are eager loading the 'codes' and 'documents' relationships for each video. This means that when we retrieve the videos from the database, Laravel will also retrieve all related codes and documents in the same query, rather than executing separate queries for each video to fetch its related codes and documents.
         * Additionally, we are using the withCount method to count the number of related codes and documents for each video. This will add a 'codes_count' and 'documents_count' attribute to each video, which we can then use in our VideoResource to include the count of related resources in the API response.
         * By using eager loading and counting related models, we can optimize our API responses and provide more comprehensive data to the client without incurring the overhead of multiple database queries.
         */
        $videos = Video::with(['codes', 'documents'])
            ->withCount(['codes', 'documents']) // Count each resources
            ->paginate();
        // return $videos;
        /**
         * In the index method of the VideoController, we are retrieving a paginated list of videos from the database. We are using eager loading to load the related 'codes' and 'documents' for each video, which helps to optimize the number of database queries. Additionally, we are using the withCount method to count the number of related codes and documents for each video, which adds 'codes_count' and 'documents_count' attributes to each video model.
         * After retrieving the videos, we are returning a new instance of VideoResourceCollection, passing the paginated videos as an argument. The VideoResourceCollection is responsible for transforming the collection of video models into a structured format that can be returned as a JSON response to the client. This allows us to include not only the video data but also the related codes and documents, along with their counts, in a single API response.
         */
        return new VideoResourceCollection($videos);
    }

    // public function store(Request $request)
    /**
     * In the store method of the VideoController, we are handling the creation of a new video resource. We are accepting a StoreVideoRequest, which is a custom request class that likely contains validation rules for the incoming data. We are also injecting a CreateVideoAction, which is an action class responsible
     * for the business logic of creating a new video. Inside the method, we are creating a CreateVideoDTO (Data Transfer Object) from the incoming request data. This DTO is a simple object that encapsulates the data needed to create a new video. We then pass this DTO to the execute method of the CreateVideoAction, which will handle the actual creation of the video in the database. Finally, we return the newly created video resource as a response.
     */
    public function store(StoreVideoRequest $request, CreateVideoAction $action)
    {
        // Create a DTO from the request
        /**
         * A Data Transfer Object (DTO) is a design pattern used to transfer data between different layers of an application. In the context of the store method in the VideoController, we are creating a CreateVideoDTO from the incoming request data. This DTO serves as a structured way to encapsulate the data needed to create a new video resource. By using a DTO, we can ensure that the data is validated and organized before it is passed to the CreateVideoAction, which will handle the business logic of creating the video in the database. This approach promotes separation of concerns and makes our code more maintainable and testable.
         * In this case, the CreateVideoDTO likely contains properties such as title, description, video URL, duration, and any other relevant information needed to create a new video. By using the fromRequest method, we can easily convert the validated request data into a DTO instance that can be used by the action class to perform the creation logic.
         */
        $dto = CreateVideoDTO::fromRequest($request); // Create a DTO from the request data
        // Pass the DTO to the action class to create a new video
        /**
         * In the store method of the VideoController, after creating a CreateVideoDTO from the incoming request data, we pass this DTO to the execute method of the CreateVideoAction. The CreateVideoAction is responsible for handling the business logic of creating a new video resource in the database. By passing the DTO to the action class, we can keep our controller thin and focused on handling HTTP requests and responses, while delegating the actual creation logic to a separate class. This promotes separation of concerns and makes our code more modular and easier to maintain. The action class will likely validate the data contained in the DTO, create a new video record in the database, and return the newly created video model, which we can then return as a response to the client.
         * By using this approach, we can also easily test the business logic of creating a video by writing unit tests for the CreateVideoAction, without having to worry about the HTTP layer or request validation, which is handled separately in the StoreVideoRequest. This leads to cleaner and more maintainable code overall.
         */
        $newVideo = $action->execute($dto); // Create a new video using the action class
        // Return the newly created video resource as a response
        return $newVideo;
    }

    /**
     * Display the specified resource.
     */
    // public function show(Video $video)
    public function show(Video $video)
    {
        // Eager load the relationships and count the related models
        /**
         * In the show method of the VideoController, we are displaying a specific video resource. We are accepting a Video model instance as a parameter, which is automatically injected by Laravel's route model binding. To optimize the performance of our API response, we are eager loading the related 'codes' and 'documents' for the video using the load method. This allows us to retrieve all related codes and documents in a single query, rather than executing separate queries for each relationship.
         * Additionally, we are using the loadCount method to count the number of related codes and documents for the video. This will add 'codes_count' and 'documents_count' attributes to the video model, which we can then use in our VideoResource to include the count of related resources in the API response.
         */
        $video->load(['topic','codes', 'documents']) // Eager load the relationships
            ->loadCount(['codes', 'documents']); // Count each resources
        // return $video;
        return new VideoResource($video);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        //
    }
}
