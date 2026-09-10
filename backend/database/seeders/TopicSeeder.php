<?php

namespace Database\Seeders;

use App\Models\Topic;
use App\Models\TopicConnection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TopicSeeder extends Seeder
{
    /**
     * The raw topic data from the spreadsheet.
     * 'connections' => [ connected_topic_id => line_style ]
     */
    // private array $topics = [
    //     1  => ['title' => 'Intro to Space',      'description' => 'A foundational overview of coordinate spaces and why they matter in 3D graphics pipelines.', 'node_color' => '#378ADD', 'x_axis' => 690,  'y_axis' => 90, 'connections' => [2 => 'dashed']],
    //     2  => ['title' => 'Model Space',          'description' => 'The local coordinate system of a 3D object, defined relative to its own origin before any transformations are applied.', 'node_color' => '#F72585', 'x_axis' => 520,  'y_axis' => 190, 'connections' => [1 => 'dashed', 3 => 'dashed', 4 => 'dashed', 5 => 'dashed', 6 => 'dashed', 7 => 'dashed', 9 => 'dashed', 10 => 'solid']],
    //     3  => ['title' => 'Vertex Position',      'description' => 'The 3D coordinates of each point on a mesh, expressed in model space and used as the basis for all geometric transformations.', 'node_color' => '#378ADD', 'x_axis' => 95,   'y_axis' => 285, 'connections' => [2 => 'dashed', 4 => 'dashed', 6 => 'dashed', 13 => 'dashed', 14 => 'dashed']],
    //     4  => ['title' => 'Normals',              'description' => 'Perpendicular vectors at each vertex surface that define orientation, used in lighting calculations to determine how light interacts with geometry.', 'node_color' => '#378ADD', 'x_axis' => 100,  'y_axis' => 210, 'connections' => [2 => 'dashed', 3 => 'dashed', 6 => 'dashed']],
    //     5  => ['title' => 'Scale',                'description' => 'A transformation that resizes an object along one or more axes, applied as a diagonal matrix in model space.', 'node_color' => '#378ADD', 'x_axis' => 250,  'y_axis' => 200, 'connections' => [2 => 'dashed', 6 => 'dashed', 8 => 'dashed', 9 => 'dashed']],
    //     6  => ['title' => 'Translation',          'description' => 'A transformation that moves an object from one position to another by adding an offset vector to each vertex position.', 'node_color' => '#378ADD', 'x_axis' => 400,  'y_axis' => 250, 'connections' => [2 => 'dashed', 3 => 'dashed', 4 => 'dashed', 5 => 'dashed', 7 => 'dashed', 8 => 'dashed', 9 => 'dashed', 11 => 'dashed']],
    //     7  => ['title' => 'Rotation',             'description' => 'A transformation that orients an object around an axis by a given angle, typically represented with matrices or quaternions.', 'node_color' => '#378ADD', 'x_axis' => 550,  'y_axis' => 280, 'connections' => [2 => 'dashed', 6 => 'dashed', 8 => 'dashed', 9 => 'dashed', 11 => 'dashed']],
    //     8  => ['title' => 'Quaternions',          'description' => 'A compact 4-component mathematical representation of rotations that avoids gimbal lock and enables smooth interpolation between orientations.', 'node_color' => '#378ADD', 'x_axis' => 550,  'y_axis' => 460, 'connections' => [5 => 'dashed', 6 => 'dashed', 7 => 'dashed', 9 => 'dashed']],
    //     9  => ['title' => 'Model Matrix',         'description' => 'A 4x4 matrix combining scale, rotation, and translation that transforms vertices from model space into world space.', 'node_color' => '#378ADD', 'x_axis' => 480,  'y_axis' => 430, 'connections' => [2 => 'dashed', 5 => 'dashed', 6 => 'dashed', 7 => 'dashed', 8 => 'dashed', 10 => 'dashed']],
    //     10 => ['title' => 'World Space',          'description' => 'A shared global coordinate system where all objects are positioned relative to a common origin after the model matrix is applied.', 'node_color' => '#F72585', 'x_axis' => 450,  'y_axis' => 550, 'connections' => [2 => 'solid', 9 => 'dashed', 11 => 'dashed', 12 => 'solid']],
    //     11 => ['title' => 'View Matrix',          'description' => 'A matrix that transforms world space coordinates into camera space by simulating the position and orientation of the viewer.', 'node_color' => '#378ADD', 'x_axis' => 600,  'y_axis' => 550, 'connections' => [6 => 'dashed', 7 => 'dashed', 10 => 'dashed', 12 => 'dashed']],
    //     12 => ['title' => 'Camera Space',         'description' => 'The coordinate system relative to the camera where the viewer is at the origin, used as an intermediate step before projection.', 'node_color' => '#F72585', 'x_axis' => 460,  'y_axis' => 730, 'connections' => [10 => 'solid', 11 => 'dashed', 13 => 'dashed', 14 => 'dashed', 15 => 'solid']],
    //     13 => ['title' => 'Projection Matrix',    'description' => 'A matrix that maps camera space coordinates onto a 2D projection plane, applying either perspective or orthographic projection.', 'node_color' => '#378ADD', 'x_axis' => 200,  'y_axis' => 780, 'connections' => [3 => 'dashed', 12 => 'dashed', 15 => 'dashed']],
    //     14 => ['title' => 'Perspective Divide',   'description' => 'The step that divides x, y, and z components by the w component after projection, converting clip space coordinates into NDC.', 'node_color' => '#378ADD', 'x_axis' => 200,  'y_axis' => 820, 'connections' => [3 => 'dashed', 12 => 'dashed', 15 => 'dashed']],
    //     15 => ['title' => 'NDC Space',            'description' => 'Normalized Device Coordinates — a device-independent coordinate system where all visible geometry falls within a -1 to 1 cube after the perspective divide.', 'node_color' => '#F72585', 'x_axis' => 400,  'y_axis' => 850, 'connections' => [12 => 'solid', 13 => 'dashed', 14 => 'dashed', 16 => 'dashed', 17 => 'dashed']],
    //     16 => ['title' => 'Viewport Matrix',      'description' => 'A matrix that maps NDC coordinates to screen-space pixel coordinates based on the defined viewport dimensions.', 'node_color' => '#378ADD', 'x_axis' => 600,  'y_axis' => 850, 'connections' => [15 => 'dashed', 17 => 'dashed']],
    //     17 => ['title' => 'Pixel Space',          'description' => 'The final 2D screen coordinate system where each unit corresponds to a pixel on the display, produced after the viewport transformation.', 'node_color' => '#378ADD', 'x_axis' => 420,  'y_axis' => 1000, 'connections' => [15 => 'dashed', 16 => 'dashed']],
    //     18 => ['title' => 'Bonus',                'description' => 'Additional supplementary topics and extended concepts beyond the core graphics pipeline for further exploration.', 'node_color' => '#8B9CB5', 'x_axis' => 750,  'y_axis' => 150, 'connections' => []],
    // ];
    private array $topics = [
        1  => [
            'title' => 'Intro to Space',
            'description' => "An introduction to coordinate spaces in 3D graphics. We explore why different spaces exist and how objects move through them during rendering.",
            'node_color' => '#378ADD',
            "node_group_id"=>"1",
            'x_axis' => 690,
            'y_axis' => 90,
            'interactive_path' => '',
            'connections' => [2 => 'dashed'],
        ],

        2  => [
            'title' => 'Model Space',
            'description' => "Model space is the local coordinate system of a 3D object. Every vertex is defined relative to the object's own origin before any transformations are applied.",
            "node_group_id"=>"2",
            'node_color' => '#F72585',
            'x_axis' => 520,
            'y_axis' => 190,
            'interactive_path' => '02_model_space',
            'connections' => [
                1 => 'dashed',
                3 => 'dashed',
                4 => 'dashed',
                5 => 'dashed',
                6 => 'dashed',
                7 => 'dashed',
                9 => 'dashed',
                10 => 'solid'
            ]
        ],

        3  => [
            'title' => 'Vertex Positions',
            'description' => 'Vertex positions define the geometry of a 3D mesh. Each vertex holds an XYZ coordinate in model space that gets transformed through the graphics pipeline.',
            'node_color' => '#378ADD',
            "node_group_id"=>"1",

            'x_axis' => 95,
            'y_axis' => 285,
            'interactive_path' => '03_09_vertex_pos_model_matrix',
            'connections' => [
                2 => 'dashed',
                4 => 'dashed',
                6 => 'dashed',
                13 => 'dashed',
                14 => 'dashed'
            ]
        ],

        4  => [
            'title' => 'Normals',
            'description' => 'Normal vectors are perpendicular to a surface and are critical for lighting calculations. They must be transformed carefully to remain correct after non-uniform scaling.',
            'node_color' => '#378ADD',
            "node_group_id"=>"2",

            'x_axis' => 430,
            'y_axis' => 760,
            'interactive_path' => '4_normal',
            'connections' => [
                2 => 'dashed',
                3 => 'dashed',
                6 => 'dashed'
            ]
        ],

        5  => [
            'title' => 'Scale',
            'description' => 'Scaling transforms change the size of an object along one or more axes. Uniform scaling preserves shape while non-uniform scaling can distort normals.',
            'node_color' => '#378ADD',
            "node_group_id"=>"3",

            'x_axis' => 385,
            'y_axis' => 400,
            'interactive_path' => '05_scale',
            'connections' => [
                2 => 'dashed',
                6 => 'dashed',
                8 => 'dashed',
                9 => 'dashed'
            ]
        ],

        6  => [
            'title' => 'Translation',
            'description' => 'Translation moves an object from one position to another in 3D space. In matrix form, translation is encoded in the last column of a 4x4 matrix using homogeneous coordinates.',
            'node_color' => '#378ADD',
            "node_group_id"=>"2",

            'x_axis' => 285,
            'y_axis' => 260,
            'interactive_path' => '06_translation',

            'connections' => [
                2 => 'dashed',
                3 => 'dashed',
                4 => 'dashed',
                5 => 'dashed',
                7 => 'dashed',
                8 => 'dashed',
                9 => 'dashed',
                11 => 'dashed'
            ]
        ],

        7  => [
            'title' => 'Rotation',
            'description' => 'Rotation transforms orient an object in 3D space. Rotations can be represented as Euler angles, rotation matrices, or quaternions, each with trade-offs in interpolation and gimbal lock.',
            'node_color' => '#378ADD',
            "node_group_id"=>"1",

            'x_axis' => 190,
            'y_axis' => 450,
            'interactive_path' => '07_rotation',

            'connections' => [
                2 => 'dashed',
                6 => 'dashed',
                8 => 'dashed',
                9 => 'dashed',
                11 => 'dashed'
            ]
        ],

        8  => [
            'title' => 'Quaternions',
            'description' => 'Quaternions are a mathematical system used to represent 3D rotations. They avoid gimbal lock and allow smooth interpolation between orientations using SLERP.',
            'node_color' => '#378ADD',
            "node_group_id"=>"3",

            'x_axis' => 365,
            'y_axis' => 530,
            'interactive_path' => '08_quaternions',

            'connections' => [
                5 => 'dashed',
                6 => 'dashed',
                7 => 'dashed',
                9 => 'dashed'
            ]
        ],

        9  => [
            'title' => 'Model Matrix',
            'description' => 'The model matrix combines scale, rotation, and translation into a single 4x4 matrix. Multiplying a vertex by the model matrix transforms it from model space into world space.',
            'node_color' => '#378ADD',
            "node_group_id"=>"2",

            'x_axis' => 785,
            'y_axis' => 250,
            'interactive_path' => 'space',

            'connections' => [
                2 => 'dashed',
                5 => 'dashed',
                6 => 'dashed',
                7 => 'dashed',
                8 => 'dashed',
                10 => 'dashed'
            ]
        ],

        10 => [
            'title' => 'World Space',
            'description' => 'World space is the global coordinate system where all objects are placed relative to a shared origin. After applying the model matrix, vertices exist in world space.',
            'node_color' => '#F72585',
            "node_group_id"=>"1",

            'x_axis' => 700,
            'y_axis' => 455,
            'interactive_path' => 'space',

            'connections' => [
                2 => 'solid',
                9 => 'dashed',
                11 => 'dashed',
                12 => 'solid'
            ]
        ],

        11 => [
            'title' => 'View Matrix',
            'description' => "The view matrix transforms world space coordinates into camera space. It is essentially the inverse of the camera's own model matrix, repositioning the world relative to the camera.",
            'node_color' => '#378ADD',
            "node_group_id"=>"2",

            'x_axis' => 930,
            'y_axis' => 520,
            'interactive_path' => '11_view_matrix',

            'connections' => [
                6 => 'dashed',
                7 => 'dashed',
                10 => 'dashed',
                12 => 'dashed'
            ]
        ],

        12 => [
            'title' => 'Camera Space',
            'description' => 'Camera space, also called view space or eye space, positions vertices relative to the camera. The camera sits at the origin looking down the negative Z axis.',
            'node_color' => '#F72585',
            "node_group_id"=>"3",

            'x_axis' => 805,
            'y_axis' => 675,
            'interactive_path' => 'space',

            'connections' => [
                10 => 'solid',
                11 => 'dashed',
                13 => 'dashed',
                14 => 'dashed',
                15 => 'solid'
            ]
        ],

        13 => [
            'title' => 'Projection Matrix',
            'description' => 'The projection matrix transforms camera space into clip space. Perspective projection creates a realistic sense of depth while orthographic projection preserves parallel lines.',
            'node_color' => '#378ADD',
            "node_group_id"=>"2",

            'x_axis' => 1060,
            'y_axis' => 810,
            'interactive_path' => '13_projection_matrix',

            'connections' => [
                3 => 'dashed',
                12 => 'dashed',
                15 => 'dashed'
            ]
        ],

        14 => [
            'title' => 'Perspective Divide',
            'description' => 'he perspective divide divides the X, Y, and Z clip coordinates by the W component to produce normalized device coordinates. This step creates the foreshortening effect of perspective.',
            'node_color' => '#378ADD',
            "node_group_id"=>"1",

            'x_axis' => 345,
            'y_axis' => 915,
            'interactive_path' => '14_perspective_divide',

            'connections' => [
                3 => 'dashed',
                12 => 'dashed',
                15 => 'dashed'
            ]
        ],

        15 => [
            'title' => 'NDC Space',
            'description' => 'Normalized Device Coordinates (NDC) map the visible scene into a cube from -1 to 1 on each axis. Everything outside this range is clipped and not rendered.',
            'node_color' => '#F72585',
            "node_group_id"=>"2",

            'x_axis' => 640,
            'y_axis' => 930,
            'interactive_path' => 'space',

            'connections' => [
                12 => 'solid',
                13 => 'dashed',
                14 => 'dashed',
                16 => 'dashed',
                17 => 'dashed'
            ]
        ],

        16 => [
            'title' => 'Viewport Matrix',
            'description' => 'The viewport transform maps NDC coordinates to pixel coordinates on the screen. It scales and offsets the NDC cube to match the dimensions and position of the render target.',
            'node_color' => '#378ADD',
            "node_group_id"=>"2",

            'x_axis' => 940,
            'y_axis' => 965,
            'interactive_path' => '16_viewport_matrix',

            'connections' => [
                15 => 'dashed',
                17 => 'dashed'
            ]
        ],

        17 => [
            'title' => 'Pixel Space',
            'description' => 'Pixel space, or screen space, is the final destination of the graphics pipeline. Vertices are now 2D pixel coordinates ready for rasterization and fragment shading.',
            'node_color' => '#378ADD',
            "node_group_id"=>"3",

            'x_axis' => 920,
            'y_axis' => 1135,
            'interactive_path' => 'space',

            'connections' => [
                15 => 'dashed',
                16 => 'dashed'
            ]
        ],

        18 => [
            'title' => 'Bonus',
            'description' => 'onus content covering extra tips and tricks related to the graphics pipeline. Includes practical shader examples and common mistakes to avoid when working with coordinate spaces.',
            'node_color' => '#8B9CB5',
            "node_group_id"=>"2",
            'x_axis' => 500,
            'y_axis' => 1110,
            'interactive_path' => 'space',

            'connections' => []
        ],
    ];
    public function run(): void
    {
        // ── 1. Create all topics ──────────────────────────────────────────────
        $created = [];

        foreach ($this->topics as $spreadsheetId => $data) {
            $created[$spreadsheetId] = Topic::create([
                'title'      => $data['title'],
                'slug'       => Str::slug($data['title']),
                'description' => $data['description'],
                'node_color' => $data['node_color'],
                'node_group_id' => $data['node_group_id'],
                'x_axis' => $data['x_axis'],
                'y_axis' => $data['y_axis'],
                'interactive_path' => $data['interactive_path'],
            ]);
        }


        // ── 3. Create directed connections (no duplicates) ────────────────────
        $inserted = [];

        foreach ($this->topics as $spreadsheetId => $data) {
            $fromId = $created[$spreadsheetId]->id;

            foreach ($data['connections'] as $connectedSpreadsheetId => $lineStyle) {
                $toId = $created[$connectedSpreadsheetId]->id;

                // Deduplicate: skip if this directed pair already exists
                $key = "{$fromId}-{$toId}";
                if (isset($inserted[$key])) {
                    continue;
                }

                TopicConnection::create([
                    'topic_id'           => $fromId,
                    'connected_topic_id' => $toId,
                    'line_style'         => $lineStyle,
                ]);

                $inserted[$key] = true;
            }
        }
    }
}
