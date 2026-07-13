<?php

namespace App\Http\Requests\Admin\Codes;

use Illuminate\Foundation\Http\FormRequest;

class IndexCodesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}