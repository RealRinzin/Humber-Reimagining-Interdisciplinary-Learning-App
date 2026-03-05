<?php

namespace Database\Seeders;

use App\Models\FlashCard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FlashCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        FlashCard::factory(3)->create();

    }
}
