<?php

namespace Database\Seeders;

use App\Models\Code;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $json = file_get_contents(database_path('data/fixed.json'));
        // $codes = json_decode($json, true); // pass true for associative array
        // foreach ($codes as $code) {
        //     Code::create([
        //         'topic_id'    => $code['topic_id'],
        //         'video_id'    => $code['video_id'],
        //         'description' => $code['description'],
        //         'code'        => $code['code'],
        //     ]);

        $json = file_get_contents(database_path('data/code-fixed.json'));
        $codes = json_decode($json, true); // pass true for associative array
        Code::insert($codes);
        // }
        // // Code::factory()->count(config('app.seeder_count'))->create();
        // // Code::factory(5)->create();
    }
}
