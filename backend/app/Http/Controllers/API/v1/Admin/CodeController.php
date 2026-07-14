<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Actions\Admin\Codes\IndexCodeAction;
use App\DTOs\Admin\Codes\IndexCodeDTO;
use App\Http\Requests\Admin\Codes\IndexCodesRequest;
use App\Models\Code;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CodeController
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        IndexCodesRequest $request,
        IndexCodeAction $action
    ): JsonResponse {
        $dto = IndexCodeDTO::fromRequest($request);
        return response()->json(
            $action->execute($dto)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
