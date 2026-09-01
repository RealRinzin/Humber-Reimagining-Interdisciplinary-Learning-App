<?php

namespace App\Actions\Admin\Interactives;

use App\DTOs\Admin\Interactives\StoreInteractiveDTO;
use App\Models\Interactive;
use Illuminate\Support\Str;

class StoreInteractiveAction
{
    public function execute(StoreInteractiveDTO $dto): Interactive
    {
        $fileName = Str::slug(pathinfo($dto->path->getClientOriginalName(), PATHINFO_FILENAME))
            . '-' . time() . '.' . $dto->path->getClientOriginalExtension();

        $storedPath = $dto->path->storeAs('upload/interactives', $fileName, 'public');
        // $path = $dto->path->store('uploads/interactives', 'public');
        // 
        return Interactive::create([
            'topic_id' => $dto->topic_id,
            'video_id' => $dto->video_id,
            'path' => asset('storage/' . $storedPath),
            'description' => $dto->description,
        ])->fresh();
    }
}
