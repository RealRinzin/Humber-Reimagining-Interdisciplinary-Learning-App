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
    private array $topics = [
        1  => ['title' => 'Intro to Space',      'node_color' => 'blue', 'connections' => [2 => 'dashed']],
        2  => ['title' => 'Model Space',          'node_color' => 'pink', 'connections' => [1 => 'dashed', 3 => 'dashed', 4 => 'dashed', 5 => 'dashed', 6 => 'dashed', 7 => 'dashed', 9 => 'dashed', 10 => 'solid']],
        3  => ['title' => 'Vertex Position',      'node_color' => 'blue', 'connections' => [2 => 'dashed', 4 => 'dashed', 6 => 'dashed', 13 => 'dashed', 14 => 'dashed']],
        4  => ['title' => 'Normals',              'node_color' => 'blue', 'connections' => [2 => 'dashed', 3 => 'dashed', 6 => 'dashed']],
        5  => ['title' => 'Scale',                'node_color' => 'blue', 'connections' => [2 => 'dashed', 6 => 'dashed', 8 => 'dashed', 9 => 'dashed']],
        6  => ['title' => 'Translation',          'node_color' => 'blue', 'connections' => [2 => 'dashed', 3 => 'dashed', 4 => 'dashed', 5 => 'dashed', 7 => 'dashed', 8 => 'dashed', 9 => 'dashed', 11 => 'dashed']],
        7  => ['title' => 'Rotation',             'node_color' => 'blue', 'connections' => [2 => 'dashed', 6 => 'dashed', 8 => 'dashed', 9 => 'dashed', 11 => 'dashed']],
        8  => ['title' => 'Quaternions',          'node_color' => 'blue', 'connections' => [5 => 'dashed', 6 => 'dashed', 7 => 'dashed', 9 => 'dashed']],
        9  => ['title' => 'Model Matrix',         'node_color' => 'blue', 'connections' => [2 => 'dashed', 5 => 'dashed', 6 => 'dashed', 7 => 'dashed', 8 => 'dashed', 10 => 'dashed']],
        10 => ['title' => 'World Space',          'node_color' => 'pink', 'connections' => [2 => 'solid', 9 => 'dashed', 11 => 'dashed', 12 => 'solid']],
        11 => ['title' => 'View Matrix',          'node_color' => 'blue', 'connections' => [6 => 'dashed', 7 => 'dashed', 10 => 'dashed', 12 => 'dashed']],
        12 => ['title' => 'Camera Space',         'node_color' => 'pink', 'connections' => [10 => 'solid', 11 => 'dashed', 13 => 'dashed', 14 => 'dashed', 15 => 'solid']],
        13 => ['title' => 'Projection Matrix',    'node_color' => 'blue', 'connections' => [3 => 'dashed', 12 => 'dashed', 15 => 'dashed']],
        14 => ['title' => 'Perspective Divide',   'node_color' => 'blue', 'connections' => [3 => 'dashed', 12 => 'dashed', 15 => 'dashed']],
        15 => ['title' => 'NDC Space',            'node_color' => 'pink', 'connections' => [12 => 'solid', 13 => 'dashed', 14 => 'dashed', 16 => 'dashed', 17 => 'dashed']],
        16 => ['title' => 'Viewport Matrix',      'node_color' => 'blue', 'connections' => [15 => 'dashed', 17 => 'dashed']],
        17 => ['title' => 'Pixel Space',          'node_color' => 'blue', 'connections' => [15 => 'dashed', 16 => 'dashed']],
        18 => ['title' => 'Bonus',                'node_color' => 'blue', 'connections' => []],
    ];

    public function run(): void
    {
        // ── 1. Create all topics ──────────────────────────────────────────────
        $created = [];

        foreach ($this->topics as $spreadsheetId => $data) {
            $created[$spreadsheetId] = Topic::create([
                'title'      => $data['title'],
                'slug'       => Str::slug($data['title']),
                'node_color' => $data['node_color'],
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