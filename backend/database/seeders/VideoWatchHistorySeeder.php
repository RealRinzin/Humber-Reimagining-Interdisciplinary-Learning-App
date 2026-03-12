<?php

namespace Database\Seeders;

use App\Models\VideoWatchHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoWatchHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        VideoWatchHistory::factory(5)->create();
    }
}
