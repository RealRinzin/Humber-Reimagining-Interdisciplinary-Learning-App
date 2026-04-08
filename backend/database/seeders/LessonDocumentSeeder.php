<?php

namespace Database\Seeders;

use App\Models\LessonDocument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        LessonDocument::factory(10)->create();

    }
}
