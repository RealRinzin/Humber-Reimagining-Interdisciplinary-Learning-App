<?php

namespace App\Actions\Admin\VideoSections;

use App\DTOs\Admin\VideoSections\StoreVideoSectionDTO;
use App\Models\VideoSection;
use Illuminate\Support\Str;

class StoreVideoSectionAction
{
    public function execute(StoreVideoSectionDTO $dto): VideoSection
    {
        $path = $dto->video_url->store('uploads/video/parts', 'public');

        return VideoSection::create([
            'video_id' => $dto->video_id,            
            'title' => $dto->title,
            'slug' => Str::slug($dto->title), // Generate slug from the title
            'video_url' => $path,
        ])->fresh();
    }
}