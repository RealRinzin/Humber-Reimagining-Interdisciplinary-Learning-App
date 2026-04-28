<?php

namespace App\DTOs\UserVideoAnalytic;

use App\Http\Requests\UserVideoAnalytic\StoreUserVideoAnalyticRequest;

class CreateUserVideoAnalyticDTO
{
    public function __construct(
        // public readonly ?int $id,
        public readonly ?int $user_video_id,
        // public readonly ?string $email,
        public readonly ?string $interaction_type,
        public readonly ?int $interact_at,
        public readonly ?string $device_type,
        public readonly ?string $os_type,
        public readonly ?string $browser_type,
        public readonly ?string $user_agent,
        public readonly ?string $ip_address, 
        public readonly ?string $played_on,
    ) {}
    // Validates
    public static function fromRequest(StoreUserVideoAnalyticRequest $request): self
    {
        return new self(...$request->validated());
    }

}
