<?php

namespace App\Http\Resources\UserVideo;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserVideoResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        // return [
        //     'data'  => $this->collection,
        //     'total' => $this->collection->count(),
        //     'links' => ['self' => 'link-value'],
        // ];
        return [
            'data'  => $this->collection,
            'total' => $this->resource->count(),
        ];
    }
}
