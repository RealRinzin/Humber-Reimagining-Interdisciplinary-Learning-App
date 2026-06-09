<?php

namespace Database\Seeders;

use App\Models\Interactive;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InteractiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
      $json = file_get_contents(database_path('data/interactive.json'));
        $codes = json_decode($json, true); // pass true for associative array
        Interactive::insert($codes);
    }
}
