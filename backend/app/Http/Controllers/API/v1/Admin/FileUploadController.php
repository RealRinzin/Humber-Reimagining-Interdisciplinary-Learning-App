<?php

namespace App\Http\Controllers\API\v1\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FileUploadController
{

    // Upload Image
    public function images(Request $request)
    {
        $request->validate([
            'upload' => 'required|image|max:5120', // 5MB
        ]);
        $file = $request->file('upload');
        $originalName = pathinfo(
            $file->getClientOriginalName(),
            PATHINFO_FILENAME
        );

        $originalName = Str::slug($originalName);

        $extension = $file->getClientOriginalExtension();
        $filename = $originalName . '-' . round(microtime(true) * 1000) . '.' . $extension;

        $path = $request->file('upload')->storeAs('uploads/images/ramblings', $filename, 'public');
        return response()->json([
            'url' => asset('storage/' . $path),
            'file' => $request->file('upload')->getClientOriginalName()
        ]);
    }

    // Upload Subtitle

}
