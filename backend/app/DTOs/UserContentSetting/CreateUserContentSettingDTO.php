<?php

namespace App\DTOs\UserContentSetting;

use App\Http\Requests\UserContentSetting\StoreUserContentSettingRequest;

class CreateUserContentSettingDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(

        public readonly int $user_id,
        public readonly bool $video,
        public readonly bool $code,
        public readonly bool $quiz,
        public readonly bool $interactive,
        public readonly bool $explore_mode,
        public readonly bool $guide_path,
        public readonly bool $progress,

    ) {}
    public static function fromRequest(StoreUserContentSettingRequest $request): self

    {
        return new self(
            user_id: auth()->id(),                    
            video: $request->validated('video'),
            code: $request->validated('code'),
            quiz: $request->validated('quiz'),
            interactive: $request->validated('interactive'),
            explore_mode: $request->validated('explore_mode'),
            guide_path: $request->validated('guide_path'),
            progress: $request->validated('progress'),
        );
    }
}
