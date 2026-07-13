<?php

namespace App\DTOs\Admin\Codes;

use App\Http\Requests\Admin\Codes\IndexCodesRequest;


class IndexCodeDTO
{

    public static function fromRequest(IndexCodesRequest $request): self
    {
        return new self();
    }
}
