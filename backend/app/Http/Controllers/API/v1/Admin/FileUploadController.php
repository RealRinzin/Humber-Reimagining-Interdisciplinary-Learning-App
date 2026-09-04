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
        // return $request;
        $file = $request->file('upload');

        $filename = $file->getClientOriginalName();

        $path = $request->file('upload')->storeAs('uploads/images/ramblings',$filename,'public');
        print_r($request->file);
        return response()->json([
            'url' => asset('storage/' . $path),
            'file' => $request->file('upload')->getClientOriginalName()
        ]);
    }
}
