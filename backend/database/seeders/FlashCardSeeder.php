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
        // FlashCard::factory()->count(config('app.seeder_count'))->create();
        FlashCard::factory(1)->create();


    }
}
