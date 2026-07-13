<?php

namespace App\ACtions\Admin\Codes;

use App\DTOs\Admin\Codes\IndexCodeDTO;
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
        return Code::get();
    }
}
