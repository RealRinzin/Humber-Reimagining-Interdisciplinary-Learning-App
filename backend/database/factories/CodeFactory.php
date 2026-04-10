<?php

namespace Database\Factories;

use App\Models\TopicNode;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Code>
 */
class CodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => Str::random(100),
            'language' => 'Python',
            'video_id' => Video::inRandomOrder()->value('id'),
            'topic_node_id' => TopicNode::inRandomOrder()->value('id'),
            'code' => "// Grab a 3D vertex from Paul Neale's model and turn it into 4D

Vec4 vertexPos = Vec4(vertex.x, vertex.y, vertex.z, 1);

// Pretend we already have the 4x4 matrices in the following steps built

// modelMatrix takes you from model to world space

Vec4 vertexPosWorldSpace = modelMatrix * vertexPos;

// viewMatrix takes you from world to camera space

Vec4 vertexPosCameraSpace = viewMatrix * vertexPosWorldSpace;

// projectionMatrix takes you from camera to NDC space (after dividing out the w)

Vec4 vertexPosNdcSpace = projectionMatrix * vertexPosCameraSpace;

vertexPosNdcSpace.x /= vertexPosNdcSpace.w;

vertexPosNdcSpace.y /= vertexPosNdcSpace.w;

vertexPosNdcSpace.z /= vertexPosNdcSpace.w;

vertexPosNdcSpace.w = 1;

// Lastly the viewportMatrix takes you from NDC to screen space

Vec4 vertexPosScreenSpace = viewportMatrix * vertexPosNdcSpace;"

        ];
    }
}
