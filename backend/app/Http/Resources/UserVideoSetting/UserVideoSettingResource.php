<?php

namespace App\Http\Resources\UserVideoSetting;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVideoSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'video_id' => $this->video_id,
            'code' => $this->code,
            'interactive' => $this->interactive,
            'rambling' => $this->rambling,
            'quiz' => $this->quiz,
            'all_checked' => $this->all_checked,
            'true_count' => collect([
                $this->code,
                $this->interactive,
                $this->rambling,
                $this->quiz,
                $this->all_checked,
            ])->filter()->count(),
        ];
    }
}
