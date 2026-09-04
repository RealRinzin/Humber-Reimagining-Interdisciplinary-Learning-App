<?php

namespace App\Http\Controllers\API\v1\Admin;

use Illuminate\Http\Request;

class FileUploadController
{
    public function images(Request $request)
    {
        $request->validate([
            'upload' => 'required|image|max:5120', // 5MB
        ]);

        $path = $request->file('upload')->store('uploads', 'public');

        return response()->json([
            'url' => asset('storage/' . $path),
        ]);
    }
}