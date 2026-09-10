<?php

namespace App\Http\Controllers\API\v1;

use App\Models\VideoSection;
use Illuminate\Http\Request;

class VideoSectionController
{

    /**
     * Display the specified resource.
     */
    public function show(VideoSection $videoSection)
    {

    return $videoSection;
    }

}
