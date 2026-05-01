<?php

namespace Database\Seeders;

use App\Models\UserVideoSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserVideoSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        UserVideoSetting::factory(2)->create();
    }
}
