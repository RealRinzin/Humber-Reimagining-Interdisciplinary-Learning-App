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

        $json = file_get_contents(database_path('data/code-fixed.json'));
        $interactives = json_decode($json, true); // pass true for associative array
        Code::insert($interactives);
    }
}
