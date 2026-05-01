<?php

namespace Database\Seeders;

use App\Models\UserContentSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserContentSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserContentSetting::factory(2)->create();
    }
}
