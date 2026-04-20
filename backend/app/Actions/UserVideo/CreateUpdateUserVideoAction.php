<?php

namespace App\Actions\UserVideo;

use App\DTOs\UserVideo\CreateUpdateUserVideoDTO;
use App\Models\UserVideo;

class CreateUpdateUserVideoAction
{
    public function execute(CreateUpdateUserVideoDTO $dto): UserVideo
    {
        // If the user has already completed the video, we will not update the record, because we don't want to change the completed status of the video, and we will return the record as-is, otherwise we will update or create the record with the new data, and we will return the updated or created record
        /*
         * We will check if the user has already completed the video, if yes, we will return the record as-is, otherwise we will update or create the record with the new data, and we will return the updated or created record
         * The user can only have one record for each video, so we will check if the record already exists, if yes, we will update the record with the new data, otherwise we will create a new record with the new data
         * The request will contain the video_id and the watched_at timestamp, and the user_id will be taken from the authenticated user
         * The response will return the user video record, and the status code will be 201 if the record was created, or 200 if the record was updated
         */
        $lastVideo = UserVideo::with('video:id,duration')
            ->where('user_id', auth()->id())
            ->latest() // orders by created_at DESC
            ->first();
        // If the user has already completed the video, we will not update the record, because we don't want to change the completed status of the video, and we will return the record as-is, otherwise we will update or create the record with the new data, and we will return the updated or created record
        if ($lastVideo->last_paused !== $dto->last_paused) {
            // $lastVideo->update([
            //     'completed' => true,
            // ]);
            // return $lastVideo;
            return UserVideo::updateOrCreate(
                [
                    'video_id' => $dto->video_id,
                    'user_id' => auth()->id(),
                ],
                [
                    'last_paused' => $dto->last_paused ?? '0:0',
                    'completed' => true
                ]
            );
        }
        /**
         * IMPORTANT: If the user has already completed the video, we will not update the record, because we don't want to change the completed status of the video, and we will return the record as-is, otherwise we will update or create the record with the new data, and we will return the updated or created record
         * If the user has already completed the video, we will not update the record, because we don't want to change the completed status of the video, and we will return the record as-is, otherwise we will update or create the record with the new data, and we will return the updated or created record
         */
        if ($lastVideo && $lastVideo->completed) {
            return UserVideo::create([
                'video_id' => $dto->video_id,
                'user_id' =>  auth()->id(),
                'last_paused' => $dto->last_paused ?? '0:0',
            ]);
        }
        // Otherwise, update or create the record with the new data
        // If the record already exists, it will update the watched_at timestamp, otherwise it will create a new record
        // The request will contain the video_id and the watched_at timestamp, and the user_id will be taken from the authenticated user
        /**
         * IMPORTANT: If the user has already completed the video, we will not update the record, because we don't want to change the completed status of the video, and we will return the record as-is, otherwise we will update or create the record with the new data, and we will return the updated or created record
         */
        return UserVideo::updateOrCreate(
            [
                'video_id' => $dto->video_id,
                'user_id' => auth()->id(),
            ],
            [
                'last_paused' => $dto->last_paused ?? '0:0',
                'completed' => $dto->completed ?? false,
            ]
        );
    }
}
