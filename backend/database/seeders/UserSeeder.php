<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Create 10 Users Accounts
    // User::factory()->count(config('app.seed_count'))->create();
    // User::factory(3)->create();
    User::insert([
      [
        'name'  => 'Rinzin',
        'username'  => 'rinzin',
        'password'   => bcrypt('password'),
        'role_id' => 1
      ],
      [
        'name'  => 'Dina',
        'username'  => 'dinasabie',
        'password'   => bcrypt('password'),
        'role_id' => 1
      ],
    ]);
  }
}
