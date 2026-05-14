<?php

namespace App\DTOs\UserContentSetting;

use App\Http\Requests\UserContentSetting\StoreUserContentSettingRequest;

class CreateUserContentSettingDTO
{

    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $user_id,
        public readonly ?bool $video = null,
        public readonly ?bool $code = null,
        public readonly ?bool $rambling = null,
        public readonly ?bool $quiz = null,
        public readonly ?bool $interactive = null,
        public readonly ?bool $explore_mode = null,
        public readonly ?bool $guide_path = null,
        public readonly ?bool $progress = null,
    ) {}

    // Request
    public static function fromRequest(StoreUserContentSettingRequest $request): self

    {
        return new self(
            user_id: auth()->id(),
            video: $request->validated('video'),
            code: $request->validated('code'),
            quiz: $request->validated('quiz'),
            rambling: $request->validated('rambling'),
            interactive: $request->validated('interactive'),
            explore_mode: $request->validated('explore_mode'),
            guide_path: $request->validated('guide_path'),
            progress: $request->validated('progress'),
        );
    }
}
