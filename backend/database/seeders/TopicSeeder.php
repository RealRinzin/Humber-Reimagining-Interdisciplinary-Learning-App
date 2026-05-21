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
            'description' => 'A foundational overview of coordinate spaces and why they matter in 3D graphics pipelines.',
            'node_color' => '#378ADD',
            'x_axis' => 690,
            'y_axis' => 90,
            'interactive_path' => 'space',
            'connections' => [2 => 'dashed']
        ],

        2  => [
            'title' => 'Model Space',
            'description' => 'The local coordinate system of a 3D object, defined relative to its own origin before any transformations are applied.',
            'node_color' => '#F72585',
            'x_axis' => 520,
            'y_axis' => 190,
            'interactive_path' => 'space',
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
            'title' => 'Vertex Position',
            'description' => 'The 3D coordinates of each point on a mesh, expressed in model space and used as the basis for all geometric transformations.',
            'node_color' => '#378ADD',
            'x_axis' => 95,
            'y_axis' => 285,
            'interactive_path' => 'space',
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
            'description' => 'Perpendicular vectors at each vertex surface that define orientation, used in lighting calculations to determine how light interacts with geometry.',
            'node_color' => '#378ADD',
            'x_axis' => 430,
            'y_axis' => 760,
            'interactive_path' => 'space',
            'connections' => [
                2 => 'dashed',
                3 => 'dashed',
                6 => 'dashed'
            ]
        ],

        5  => [
            'title' => 'Scale',
            'description' => 'A transformation that resizes an object along one or more axes, applied as a diagonal matrix in model space.',
            'node_color' => '#378ADD',
            'x_axis' => 385,
            'y_axis' => 400,
            'interactive_path' => 'space',
            'connections' => [
                2 => 'dashed',
                6 => 'dashed',
                8 => 'dashed',
                9 => 'dashed'
            ]
        ],

        6  => [
            'title' => 'Translation',
            'description' => 'A transformation that moves an object from one position to another by adding an offset vector to each vertex position.',
            'node_color' => '#378ADD',
            'x_axis' => 285,
            'y_axis' => 260,
            'interactive_path' => 'space',

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
            'description' => 'A transformation that orients an object around an axis by a given angle, typically represented with matrices or quaternions.',
            'node_color' => '#378ADD',
            'x_axis' => 190,
            'y_axis' => 450,
            'interactive_path' => 'space',

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
            'description' => 'A compact 4-component mathematical representation of rotations that avoids gimbal lock and enables smooth interpolation between orientations.',
            'node_color' => '#378ADD',
            'x_axis' => 365,
            'y_axis' => 530,
            'interactive_path' => 'space',

            'connections' => [
                5 => 'dashed',
                6 => 'dashed',
                7 => 'dashed',
                9 => 'dashed'
            ]
        ],

        9  => [
            'title' => 'Model Matrix',
            'description' => 'A 4x4 matrix combining scale, rotation, and translation that transforms vertices from model space into world space.',
            'node_color' => '#378ADD',
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
            'description' => 'A shared global coordinate system where all objects are positioned relative to a common origin after the model matrix is applied.',
            'node_color' => '#F72585',
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
            'description' => 'A matrix that transforms world space coordinates into camera space by simulating the position and orientation of the viewer.',
            'node_color' => '#378ADD',
            'x_axis' => 930,
            'y_axis' => 520,
            'interactive_path' => 'space',

            'connections' => [
                6 => 'dashed',
                7 => 'dashed',
                10 => 'dashed',
                12 => 'dashed'
            ]
        ],

        12 => [
            'title' => 'Camera Space',
            'description' => 'The coordinate system relative to the camera where the viewer is at the origin, used as an intermediate step before projection.',
            'node_color' => '#F72585',
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
            'description' => 'A matrix that maps camera space coordinates onto a 2D projection plane, applying either perspective or orthographic projection.',
            'node_color' => '#378ADD',
            'x_axis' => 1060,
            'y_axis' => 810,
            'interactive_path' => 'space',

            'connections' => [
                3 => 'dashed',
                12 => 'dashed',
                15 => 'dashed'
            ]
        ],

        14 => [
            'title' => 'Perspective Divide',
            'description' => 'The step that divides x, y, and z components by the w component after projection, converting clip space coordinates into NDC.',
            'node_color' => '#378ADD',
            'x_axis' => 345,
            'y_axis' => 915,
            'interactive_path' => 'space',

            'connections' => [
                3 => 'dashed',
                12 => 'dashed',
                15 => 'dashed'
            ]
        ],

        15 => [
            'title' => 'NDC Space',
            'description' => 'Normalized Device Coordinates — a device-independent coordinate system where all visible geometry falls within a -1 to 1 cube after the perspective divide.',
            'node_color' => '#F72585',
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
            'description' => 'A matrix that maps NDC coordinates to screen-space pixel coordinates based on the defined viewport dimensions.',
            'node_color' => '#378ADD',
            'x_axis' => 940,
            'y_axis' => 965,
            'interactive_path' => 'space',

            'connections' => [
                15 => 'dashed',
                17 => 'dashed'
            ]
        ],

        17 => [
            'title' => 'Pixel Space',
            'description' => 'The final 2D screen coordinate system where each unit corresponds to a pixel on the display, produced after the viewport transformation.',
            'node_color' => '#378ADD',
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
            'description' => 'Additional supplementary topics and extended concepts beyond the core graphics pipeline for further exploration.',
            'node_color' => '#8B9CB5',
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
