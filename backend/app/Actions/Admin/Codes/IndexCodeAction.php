<?php

namespace App\ACtions\Admin\Codes;

use App\DTOs\Admin\Codes\IndexCodeDTO;
use App\Http\Resources\Admin\Codes\CodeResource;
use App\Models\Code;

class IndexCodeAction
{
    // /**
    //  * Create a new class instance.
    //  */
    // public function __construct()
    // {
    //     //
    // }

    public function execute(IndexCodeDTO $dto)
    {
        // Get all the Codes
         return CodeResource::collection(Code::all());
        return Code::get();
    }
}
