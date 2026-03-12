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
        //
        // Code::factory()->count(config('app.seeder_count'))->create();
        Code::factory(3)->create();

    }
}
